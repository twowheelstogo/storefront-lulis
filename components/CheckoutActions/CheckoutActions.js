/* eslint-disable react/no-multi-comp */
import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import styled from "styled-components";
import Actions from "components/Actions";
import ShippingAddressCheckoutAction from "components/ShippingAddressCheckoutAction";
import BillingCheckoutAction from "components/BillingCheckoutAction";
import FulfillmentOptionsCheckoutAction from "@reactioncommerce/components/FulfillmentOptionsCheckoutAction/v1";
import PaymentsCheckoutAction from "@reactioncommerce/components/PaymentsCheckoutAction/v1";
import FinalReviewCheckoutAction from "@reactioncommerce/components/FinalReviewCheckoutAction/v1";
import { addTypographyStyles } from "@reactioncommerce/components/utils";
import withAddressValidation from "containers/address/withAddressValidation";
import Dialog from "@material-ui/core/Dialog";
import PageLoading from "components/PageLoading";
import Router from "translations/i18nRouter";
import calculateRemainderDue from "lib/utils/calculateRemainderDue";
import { placeOrderMutation } from "../../hooks/orders/placeOrder.gql";

const MessageDiv = styled.div`
  ${addTypographyStyles("NoPaymentMethodsMessage", "bodyText")}
`;

const NoPaymentMethodsMessage = () => <MessageDiv>No payment methods available</MessageDiv>;

NoPaymentMethodsMessage.renderComplete = () => "";

class CheckoutActions extends Component {
  static propTypes = {
    addressValidation: PropTypes.func.isRequired,
    addressValidationResults: PropTypes.object,
    apolloClient: PropTypes.shape({
      mutate: PropTypes.func.isRequired
    }),
    cart: PropTypes.shape({
      account: PropTypes.object,
      checkout: PropTypes.object,
      email: PropTypes.string,
      items: PropTypes.array
    }).isRequired,
    cartStore: PropTypes.object,
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    }),
    checkoutMutations: PropTypes.shape({
      onSetFulfillmentOption: PropTypes.func.isRequired,
      onSetShippingAddress: PropTypes.func.isRequired
    }),
    clearAuthenticatedUsersCart: PropTypes.func.isRequired,
    orderEmailAddress: PropTypes.string.isRequired,
    paymentMethods: PropTypes.array
  };

  state = {
    actionAlerts: {
      1: null,
      2: null,
      3: null,
      4: null
    },
    hasPaymentError: false,
    isPlacingOrder: false
  };

  componentDidUpdate({ addressValidationResults: prevAddressValidationResults }) {
    const { addressValidationResults } = this.props;
    if (
      addressValidationResults &&
      prevAddressValidationResults &&
      !isEqual(addressValidationResults, prevAddressValidationResults)
    ) {
      this.handleValidationErrors();
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  buildData = ({ step, action }) => ({
    action,
    payment_method: this.paymentMethod, // eslint-disable-line camelcase
    shipping_method: this.shippingMethod, // eslint-disable-line camelcase
    step
  });

  get shippingMethod() {
    const { checkout: { fulfillmentGroups } } = this.props.cart;
    const { selectedFulfillmentOption } = fulfillmentGroups[0];
    return selectedFulfillmentOption ? selectedFulfillmentOption.fulfillmentMethod.displayName : null;
  }

  get paymentMethod() {
    const [firstPayment] = this.props.cartStore.checkoutPayments;
    return firstPayment ? firstPayment.payment.method : null;
  }

  setShippingAddress = async (address) => {
    const { checkoutMutations: { onSetShippingAddress } } = this.props;
    delete address.isValid;
    const { data, error } = await onSetShippingAddress(address);

    if (data && !error && this._isMounted) {
      this.setState({
        actionAlerts: {
          1: {}
        }
      });
    }
  };

  handleValidationErrors() {
    const { addressValidationResults } = this.props;
    const { validationErrors } = addressValidationResults || [];
    const shippingAlert =
      validationErrors && validationErrors.length ? {
        alertType: validationErrors[0].type,
        title: validationErrors[0].summary,
        message: validationErrors[0].details
      } : null;
    this.setState({ actionAlerts: { 1: shippingAlert } });
  }

  setShippingMethod = async (shippingMethod) => {
    const { checkoutMutations: { onSetFulfillmentOption } } = this.props;
    const { checkout: { fulfillmentGroups } } = this.props.cart;
    const fulfillmentOption = {
      fulfillmentGroupId: fulfillmentGroups[0]._id,
      fulfillmentMethodId: shippingMethod.selectedFulfillmentOption.fulfillmentMethod._id
    };

    await onSetFulfillmentOption(fulfillmentOption);
  };

  handlePaymentSubmit = (paymentInput) => {
    this.props.cartStore.addCheckoutPayment(paymentInput);

    this.setState({
      hasPaymentError: false,
      actionAlerts: {
        3: {}
      }
    });
  };

  handlePaymentsReset = () => {
    this.props.cartStore.resetCheckoutPayments();
  }

  buildOrder = async () => {
    const { cart, cartStore, orderEmailAddress } = this.props;
    const cartId = cartStore.hasAccountCart ? cartStore.accountCartId : cartStore.anonymousCartId;
    const { checkout } = cart;

    const fulfillmentGroups = checkout.fulfillmentGroups.map((group) => {
      const { data } = group;
      const { selectedFulfillmentOption } = group;

      const items = cart.items.map((item) => ({
        addedAt: item.addedAt,
        price: item.price.amount,
        productConfiguration: item.productConfiguration,
        quantity: item.quantity
      }));

      return {
        data,
        items,
        selectedFulfillmentMethodId: selectedFulfillmentOption.fulfillmentMethod._id,
        shopId: group.shop._id,
        totalPrice: checkout.summary.total.amount,
        type: group.type
      };
    });

    const order = {
      cartId,
      currencyCode: checkout.summary.total.currency.code,
      email: orderEmailAddress,
      fulfillmentGroups,
      shopId: cart.shop._id
    };

    return this.setState({ isPlacingOrder: true }, () => this.placeOrder(order));
  };

  placeOrder = async (order) => {
    const { cartStore, clearAuthenticatedUsersCart, apolloClient } = this.props;

    // Payments can have `null` amount to mean "remaining".
    let remainingAmountDue = order.fulfillmentGroups.reduce((sum, group) => sum + group.totalPrice, 0);
    const payments = cartStore.checkoutPayments.map(({ payment }) => {
      const amount = payment.amount ? Math.min(payment.amount, remainingAmountDue) : remainingAmountDue;
      remainingAmountDue -= amount;
      return { ...payment, amount };
    });

    try {
      const { data } = await apolloClient.mutate({
        mutation: placeOrderMutation,
        variables: {
          input: {
            order,
            payments
          }
        }
      });

      // Placing the order was successful, so we should clear the
      // anonymous cart credentials from cookie since it will be
      // deleted on the server.
      cartStore.clearAnonymousCartCredentials();
      clearAuthenticatedUsersCart();

      // Also destroy the collected and cached payment input
      cartStore.resetCheckoutPayments();

      const { placeOrder: { orders, token } } = data;

      // Send user to order confirmation page
      Router.push(`/checkout/order?orderId=${orders[0].referenceId}${token ? `&token=${token}` : ""}`);
    } catch (error) {
      if (this._isMounted) {
        this.setState({
          hasPaymentError: true,
          isPlacingOrder: false,
          actionAlerts: {
            3: {
              alertType: "error",
              title: "Payment method failed",
              message: error.toString().replace("Error: GraphQL error:", "")
            }
          }
        });
      }
    }
  };

  renderPlacingOrderOverlay = () => {
    const { isPlacingOrder } = this.state;

    return (
      <Dialog fullScreen disableBackdropClick={true} disableEscapeKeyDown={true} open={isPlacingOrder}>
        <PageLoading delay={0} message="Placing your order..." />
      </Dialog>
    );
  };

  render() {
    const {
      addressValidation,
      addressValidationResults,
      cart,
      cartStore,
      authStore,
      paymentMethods
    } = this.props;

    const { checkout: { fulfillmentGroups, summary }, items } = cart;
    const { actionAlerts, hasPaymentError } = this.state;
    const [fulfillmentGroup] = fulfillmentGroups;

    // Order summary
    const { fulfillmentTotal, itemTotal, surchargeTotal, taxTotal, total } = summary;
    const checkoutSummary = {
      displayShipping: fulfillmentTotal && fulfillmentTotal.displayAmount,
      displaySubtotal: itemTotal.displayAmount,
      displaySurcharge: surchargeTotal.displayAmount,
      displayTotal: total.displayAmount,
      displayTax: taxTotal && taxTotal.displayAmount,
      items
    };

    const addresses = fulfillmentGroups.reduce((list, group) => {
      if (group.shippingAddress) list.push(group.shippingAddress);
      return list;
    }, []);

    const payments = cartStore.checkoutPayments.slice();
    const remainingAmountDue = calculateRemainderDue(payments, total.amount);

    let PaymentComponent = PaymentsCheckoutAction;
    if (!Array.isArray(paymentMethods) || paymentMethods.length === 0) {
      PaymentComponent = NoPaymentMethodsMessage;
    }
    const actions = [
      {
        id: "1",
        activeLabel: "Datos de facturación",
        completeLabel: "Shipping address",
        incompleteLabel: "Shipping address",
        status: fulfillmentGroup.type !== "shipping" || fulfillmentGroup.shippingAddress ? "complete" : "incomplete",
        component: BillingCheckoutAction,
        onSubmit: this.setShippingAddress,
        props: {
          addressValidationResults,
          authStore,
          alert: actionAlerts["1"],
          fulfillmentGroup,
          onAddressValidation: addressValidation
        }
      },
      {
        id: "2",
        activeLabel: "Select a shipping address",
        completeLabel: "Shipping address",
        incompleteLabel: "Shipping address",
        status: fulfillmentGroup.type !== "shipping" || fulfillmentGroup.shippingAddress ? "complete" : "incomplete",
        component: ShippingAddressCheckoutAction,
        onSubmit: this.setShippingAddress,
        props: {
          addressValidationResults,
          authStore,
          alert: actionAlerts["2"],
          fulfillmentGroup,
          onAddressValidation: addressValidation
        }
      },
      {
        id: "3",
        activeLabel: "Choose a shipping method",
        completeLabel: "Shipping method",
        incompleteLabel: "Shipping method",
        status: fulfillmentGroup.selectedFulfillmentOption ? "complete" : "incomplete",
        component: FulfillmentOptionsCheckoutAction,
        onSubmit: this.setShippingMethod,
        props: {
          alert: actionAlerts["3"],
          fulfillmentGroup
        }
      },
      {
        id: "4",
        activeLabel: "Enter payment information",
        completeLabel: "Payment information",
        incompleteLabel: "Payment information",
        status: remainingAmountDue === 0 && !hasPaymentError ? "complete" : "incomplete",
        component: PaymentComponent,
        onSubmit: this.handlePaymentSubmit,
        props: {
          addresses,
          alert: actionAlerts["4"],
          onReset: this.handlePaymentsReset,
          payments,
          paymentMethods,
          remainingAmountDue
        }
      },
      {
        id: "5",
        activeLabel: "Review and place order",
        completeLabel: "Review and place order",
        incompleteLabel: "Review and place order",
        status: "incomplete",
        component: FinalReviewCheckoutAction,
        onSubmit: this.buildOrder,
        props: {
          alert: actionAlerts["5"],
          checkoutSummary,
          productURLPath: "/api/detectLanguage/product/"
        }
      }
    ];
    const customActions = [
      {
        id: "1",
        activeLabel: "Elige un método de entrega",
        completeLabel: "Método de entrega",
        incompleteLabel: "Método de entrega",
        status: fulfillmentGroup.type !== "shipping" || fulfillmentGroup.shippingAddress ? "complete" : "incomplete",
        component: BillingCheckoutAction,
        onSubmit: this.setShippingAddress,
        props: {
          alert: actionAlerts["1"],
        }
      },
      {
        id: "2",
        activeLabel: "A dónde llevaremos tu orden?",
        completeLabel: "Shipping address",
        incompleteLabel: "Shipping address",
        status: fulfillmentGroup.type !== "shipping" || fulfillmentGroup.shippingAddress ? "complete" : "incomplete",
        component: BillingCheckoutAction,
        onSubmit: this.setShippingAddress,
        props: {
          alert: actionAlerts["2"],
        }
      },
      {
        id: "3",
        activeLabel: "Elige un método de envío",
        completeLabel: "Shipping address",
        incompleteLabel: "Shipping address",
        status: fulfillmentGroup.type !== "shipping" || fulfillmentGroup.shippingAddress ? "complete" : "incomplete",
        component: BillingCheckoutAction,
        onSubmit: this.setShippingAddress,
        props: {
          alert: actionAlerts["3"],
        }
      },
      {
        id: "4",
        activeLabel: "Elige cómo pagarás tu orden",
        completeLabel: "payment method",
        incompleteLabel: "payment method",
        status: fulfillmentGroup.selectedFulfillmentOption ? "complete" : "incomplete",
        component: BillingCheckoutAction,
        onSubmit: this.setShippingMethod,
        props: {
          alert: actionAlerts["4"],
        }
      },
      {
        id: "5",
        activeLabel: "Datos de facturación",
        completeLabel: "Datos de facturación",
        incompleteLabel: "Datos de facturación",
        status: remainingAmountDue === 0 && !hasPaymentError ? "complete" : "incomplete",
        component: BillingCheckoutAction,
        onSubmit: this.handlePaymentSubmit,
        props: {
          alert: actionAlerts["5"],
        }
      },
      {
        id: "6",
        activeLabel: "Datos de regalo",
        completeLabel: "Datos de regalo",
        incompleteLabel: "Datos de regalo",
        status: "incomplete",
        component: BillingCheckoutAction,
        onSubmit: this.buildOrder,
        props: {
          alert: actionAlerts["6"],
        }
      }
    ];
    return (
      <Fragment>
        {this.renderPlacingOrderOverlay()}
        <Actions actions={customActions} />
      </Fragment>
    );
  }
}

export default withAddressValidation(CheckoutActions);
