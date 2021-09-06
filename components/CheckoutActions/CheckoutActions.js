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
import GiftCheckoutAction from "../GiftCheckoutAction";
import { addTypographyStyles, applyTheme } from "@reactioncommerce/components/utils";
import withAddressValidation from "containers/address/withAddressValidation";
import Dialog from "@material-ui/core/Dialog";
import PageLoading from "components/PageLoading";
import Router from "translations/i18nRouter";
import calculateRemainderDue from "lib/utils/calculateRemainderDue";
import { placeOrderMutation } from "../../hooks/orders/placeOrder.gql";
import DeliveryOptionsCheckoutAction from "components/DeliveryOptionsCheckoutAction";
import deliveryMethods from "custom/deliveryMethods";
import PaymentMethodCheckoutAction from "components/PaymentMethodCheckoutAction";
import RoundedButton from "components/RoundedButton";
import { formatName } from '../utils';

const MessageDiv = styled.div`
  ${addTypographyStyles("NoPaymentMethodsMessage", "bodyText")}
`;
const ButtonContent = styled.div`
  padding-left: 0;
  @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
    padding-left: 50%;
  }
`;
const NoPaymentMethodsMessage = () => <MessageDiv>No payment methods available</MessageDiv>;

NoPaymentMethodsMessage.renderComplete = () => "";
class CheckoutError {
	constructor(props) {
		this.actionCode = props.actionCode;
		this.message = props.message;
		this.title = props.title;
	}
}
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
			4: null,
			5: null,
			6: null,
		},
		hasPaymentError: false,
		hasBillingError: false,
		hasGiftError: false,
		isPlacingOrder: false,
		paymentInputs: {},
		invoiceInputs: {
			partnerId: -1,
			isCf: true,
			nit: "0",
			name: "CF",
			address: "guatemala",
			country: "Guatemala",
			depto: "Guatemala",
			city: "Guatemala"

		},
		giftInputs: {
			sender: "",
			receiver: "",
			message: ""
		}
	};
	setPaymentInputs = (inputs) => {
		this.setState(prev => ({
			paymentInputs: {
				...prev.paymentInputs,
				...inputs
			}
		}));
	}
	setInvoiceInputs = (inputs) => {
		this.setState(prev => ({
			invoiceInputs: {
				...prev.invoiceInputs,
				...inputs
			}
		}));
	}
	setGiftInputs = (inputs) => {
		this.setState(prev => ({
			giftInputs: {
				...prev.giftInputs,
				...inputs
			}
		}));
	}
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

	setPickupDetails = async (details) => {
		const { checkoutMutations: { onSetPickupDetails } } = this.props;

		const { data, error } = await onSetPickupDetails(details);

		if (data && !error && this._isMounted) {
			this.setState({
				actionAlerts: {
					1: {}
				}
			});
		}
	};

	handleInputBillingComponentSubmit = async () => {
		const { invoiceInputs } = this.state;
		const cloneInvoice = Object.assign({}, invoiceInputs);
		if (!invoiceInputs.isCf) {
			cloneInvoice.name = (cloneInvoice.name) ? cloneInvoice.name.trim() : "";
			cloneInvoice.name = formatName(cloneInvoice.name);
			cloneInvoice.nit = (cloneInvoice.nit) ? cloneInvoice.nit.trim() : "";
			cloneInvoice.address = (cloneInvoice.address) ? cloneInvoice.address.trim() : "";
			cloneInvoice.address = formatName(cloneInvoice.address);
			cloneInvoice.depto = (cloneInvoice.depto) ? cloneInvoice.depto.trim() : "";
			cloneInvoice.depto = formatName(cloneInvoice.depto);
			cloneInvoice.city = (cloneInvoice.city) ? cloneInvoice.city.trim() : "";
			cloneInvoice.city = formatName(cloneInvoice.city);

			if (cloneInvoice.nit == "") {
				throw new CheckoutError({
					actionCode: 5,
					title: "Error de facturación",
					message: "Asegúrate de haber llenado el nit a facturar"
				});
			}
			if (cloneInvoice.name == "") {
				throw new CheckoutError({
					actionCode: 5,
					title: "Error de facturación",
					message: "Asegúrate de haber llenado el nombre a facturar"
				});
			}
		}
		this.handleBillingSubmit(cloneInvoice);
	}

	handleInputGiftComponentSubmit = async () => {
		const { giftInputs } = this.state;
		const cloneGift = Object.assign({}, giftInputs);
		cloneGift.sender = (cloneGift.sender) ? cloneGift.sender.trim() : "";
		cloneGift.sender = formatName(cloneGift.sender);
		cloneGift.receiver = (cloneGift.receiver) ? cloneGift.receiver.trim() : "";
		cloneGift.receiver = formatName(cloneGift.receiver);
		cloneGift.message = (cloneGift.message) ? cloneGift.message.trim() : "";
		cloneGift.message = formatName(cloneGift.message);
		this.handleGiftSubmit(cloneGift);
	}

	handleInputComponentSubmit = async () => {
		const { paymentInputs: { data, displayName, billingAddress, selectedPaymentMethodName, amount = null } } = this.state;
		const { paymentMethods, remainingAmountDue } = this.props;
		let addresses = this.getAddresses;
		let bAddress = billingAddress || addresses && addresses[0] ? addresses[0] : null;
		const selectedPaymentMethod = paymentMethods.find((method) => method.name === selectedPaymentMethodName);
		let cappedPaymentAmount = amount;
		if (cappedPaymentAmount && typeof remainingAmountDue === "number") {
			cappedPaymentAmount = Math.min(cappedPaymentAmount, remainingAmountDue);
		}
		Object.keys(data).forEach((key) => {
			if (data[key] == null) throw new CheckoutError({
				actionCode: 4,
				title: "Error de pago",
				message: "Asegúrate de haber llenado todos los campos de pago"
			});
		});
		this.handlePaymentSubmit({
			displayName: displayName,
			payment: {
				amount: cappedPaymentAmount,
				billingAddress: bAddress,
				data,
				method: selectedPaymentMethodName
			},
		});
	}
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

	setFulfillmentType = async (type) => {
		const { checkoutMutations: { onSetFulfillmentType } } = this.props;
		const { checkout: { fulfillmentGroups } } = this.props.cart;
		const fulfillmentTypeInput = {
			fulfillmentGroupId: fulfillmentGroups[0]._id,
			fulfillmentType: type
		};
		await onSetFulfillmentType(fulfillmentTypeInput);
	};

	handlePaymentSubmit = (paymentInput) => {
		this.props.cartStore.addCheckoutPayment(paymentInput);
		this.setState({
			hasPaymentError: false,
			actionAlerts: {
				4: {}
			}
		});
	};

	handleBillingSubmit = (billingInput) => {
		this.props.cartStore.addCheckoutBilling(billingInput);
		this.setState({
			hayBillingError: false,
			actionAlerts: {
				5: {}
			}
		});
	};

	handleGiftSubmit = (giftInput) => {
		this.props.cartStore.addCheckoutGift(giftInput);
		this.setState({
			hasGiftError: false,
			actionAlerts: {
				6: {}
			}
		});
	};

	handlePaymentsReset = () => {
		this.props.cartStore.resetCheckoutPayments();
		this.props.cartStore.resetCheckoutGift();
		this.props.cartStore.resetCheckoutBilling();
	}

	buildOrder = async () => {
		const { cart, cartStore, orderEmailAddress } = this.props;
		const cartId = cartStore.hasAccountCart ? cartStore.accountCartId : cartStore.anonymousCartId;
		const { checkout } = cart;
		try {
			await this.handleInputComponentSubmit();
			await this.handleInputBillingComponentSubmit();
			await this.handleInputGiftComponentSubmit();
			const fulfillmentGroups = checkout.fulfillmentGroups.map((group) => {
				const { data } = group;
				let { selectedFulfillmentOption } = group;

				const items = cart.items.map((item) => ({
					addedAt: item.addedAt,
					price: item.price.amount,
					productConfiguration: item.productConfiguration,
					quantity: item.quantity,
					metafields: item.metafields || []
				}));
				if (!selectedFulfillmentOption || selectedFulfillmentOption == null) {
					throw new CheckoutError({
						message: "La dirección seleccionada está fuera del rango de envío",
						actionCode: 6,
						title: "Error de envío"
					});
				}
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
		} catch (error) {
			this.setState({
				hasPaymentError: true,
				hasBillingError: true,
				hasGiftError: true,
				isPlacingOrder: false,
				actionAlerts: {
					[error.actionCode]: {
						alertType: "error",
						title: error.title,
						message: error.message
					}
				}
			});
		}
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
		const billing = cartStore.checkoutBilling;
		console.log(billing);
		const giftNote = cartStore.checkoutGift;
		try {
			const { data } = await apolloClient.mutate({
				mutation: placeOrderMutation,
				variables: {
					input: {
						order,
						payments,
						billing,
						giftNote
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
				this.handlePaymentsReset();
				this.setState({
					hasPaymentError: true,
					isPlacingOrder: false,
					actionAlerts: {
						4: {
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
	get getAddresses() {
		const {
			cart
		} = this.props;
		const { checkout: { fulfillmentGroups, summary }, items } = cart;
		const addresses = fulfillmentGroups.reduce((list, group) => {
			if (group.shippingAddress) list.push(group.shippingAddress);
			return list;
		}, []);
		return addresses;
	}
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
		const customActions = [
			{
				id: "1",
				activeLabel: "Elige un método de entrega",
				completeLabel: "Método de entrega",
				incompleteLabel: "Método de entrega",
				status: fulfillmentGroup.type !== "shipping" || fulfillmentGroup.shippingAddress ? "complete" : "incomplete",
				component: DeliveryOptionsCheckoutAction,
				onSubmit: this.setShippingAddress,
				props: {
					alert: actionAlerts["1"],
					deliveryMethods,
					fulfillmentGroup,
					actionAlerts: {
						"2": actionAlerts["2"],
						"3": actionAlerts["3"],
					},
					submits: {
						onSubmitShippingAddress: this.setShippingAddress,
						onSetShippingMethod: this.setShippingMethod,
						onSelectFulfillmentType: this.setFulfillmentType,
						onSubmitPickupDetails: this.setPickupDetails
					}
				}
			},

			{
				id: "4",
				activeLabel: "Elige cómo pagarás tu orden",
				completeLabel: "payment method",
				incompleteLabel: "payment method",
				status: fulfillmentGroup.selectedFulfillmentOption ? "complete" : "incomplete",
				component: PaymentMethodCheckoutAction,
				onSubmit: this.handlePaymentSubmit,
				props: {
					addresses,
					alert: actionAlerts["4"],
					onReset: this.handlePaymentsReset,
					payments,
					paymentMethods,
					remainingAmountDue,
					onChange: this.setPaymentInputs,
				}
			},
			{
				id: "5",
				activeLabel: "Datos de facturación",
				completeLabel: "Datos de facturación",
				incompleteLabel: "Datos de facturación",
				status: remainingAmountDue === 0 && !hasPaymentError ? "complete" : "incomplete",
				component: BillingCheckoutAction,
				onSubmit: this.handleBillingSubmit,
				props: {
					alert: actionAlerts["5"],
					onChange: this.setInvoiceInputs,
					authStore,
					isCf: this.state.invoiceInputs.isCf,
					nitValue: this.state.invoiceInputs.nit,
					nameValue: this.state.invoiceInputs.name,
					addressValue: this.state.invoiceInputs.address
				}
			},
			{
				id: "6",
				activeLabel: "Datos de regalo",
				completeLabel: "Datos de regalo",
				incompleteLabel: "Datos de regalo",
				status: "incomplete",
				component: GiftCheckoutAction,
				onSubmit: this.handleGiftSubmit,
				props: {
					alert: actionAlerts["6"],
					onChange: this.setGiftInputs,
					senderValue: this.state.giftInputs.sender,
					receiverValue: this.state.giftInputs.receiver,
					messageValue: this.state.giftInputs.message
				}
			}
		];
		return (
			<Fragment>
				{this.renderPlacingOrderOverlay()}
				<Actions actions={customActions} />
				<ButtonContent>
					<RoundedButton
						buttonTitle="Finalizar Compra"
						buttonSubtitle={total && `total: ${total.displayAmount}`}
						onClick={this.buildOrder}
					/>
				</ButtonContent>
			</Fragment>
		);
	}
}

export default withAddressValidation(CheckoutActions);
