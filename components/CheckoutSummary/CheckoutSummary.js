import CartItems from "components/CartItems";
import CartSummary from "components/CartSummary";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Divider } from "@material-ui/core";
import CheckoutCartItem from "components/CheckoutCartItem";
const styles = (theme) => ({
  summary: {
    borderTop: theme.palette.borders.default,
  },
  cartItems: {
    paddingTop: theme.spacing(2),
  },
  divider: {
    color: theme.palette.secondary.main,
    borderTop: theme.palette.borders.secondary,
    width: "100%",
    opacity: "25%",
  },
  customSize: {
    [theme.breakpoints.down("md")]: {
      fontSize: "24px",
    },
  },
});
const StyledTitle = styled.div`
  color: #7a6240;
  font-size: 36px;
  font-weight: 700;
  margin: auto;
`;

const StyledHeadline = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
`;
const StyledText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #565656;
`;
class CheckoutSummary extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      checkout: PropTypes.shape({
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string,
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string,
        }),
      }),
    }),
    classes: PropTypes.object,
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  };

  static defaultProps = {
    hasMoreCartItems: false,
    loadMoreCartItems() {},
    onChangeCartItemsQuantity() {},
    onRemoveCartItems() {},
  };

  handleItemQuantityChange = (quantity, cartItemId) => {
    const { onChangeCartItemsQuantity } = this.props;

    onChangeCartItemsQuantity({ quantity, cartItemId });
  };

  handleRemoveItem = (_id) => {
    const { onRemoveCartItems } = this.props;

    onRemoveCartItems(_id);
  };

  renderCartItems() {
    const { cart, hasMoreCartItems, loadMoreCartItems, classes } = this.props;

    if (cart && Array.isArray(cart.items)) {
      return (
        <Grid item xs={12}>
          <div className={classes.cartItems}>
            <CartItems
              isMiniCart
              isReadOnly
              hasMoreCartItems={hasMoreCartItems}
              onLoadMoreCartItems={loadMoreCartItems}
              items={cart.items}
              onChangeCartItemQuantity={this.handleItemQuantityChange}
              onRemoveItemFromCart={this.handleRemoveItem}
              components={{
                CustomCartItem: (cartItemProps) => <CheckoutCartItem {...cartItemProps} />,
              }}
            />
          </div>
        </Grid>
      );
    }

    return null;
  }

  renderCartSummary() {
    const { cart, classes } = this.props;

    if (cart && cart.checkout && cart.checkout.summary) {
      const { fulfillmentTotal, itemTotal, surchargeTotal, taxTotal, total } = cart.checkout.summary;

      return (
        <Grid item xs={12} className={classes.summary}>
          <CartSummary
            isDense
            displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
            displaySubtotal={itemTotal && itemTotal.displayAmount}
            displaySurcharge={surchargeTotal && surchargeTotal.displayAmount}
            displayTax={taxTotal && taxTotal.displayAmount}
            displayTotal={total && total.displayAmount}
            itemsQuantity={cart.totalItemQuantity}
          />
        </Grid>
      );
    }

    return null;
  }

  renderDeliveryDetails() {
    const {
      cart: {
        checkout: { fulfillmentGroups },
      },
      classes,
    } = this.props;
    const [fulfillmentGroup] = fulfillmentGroups;
    //console.log("fulfillmentGroup", fulfillmentGroup);
    return (
      <Grid xs={12} className={classes.summary}>
        {fulfillmentGroup.type === "shipping" && fulfillmentGroup.data.shippingAddress && (
          <div>
            <br></br>
            <StyledHeadline>{"Lugar de entrega"}</StyledHeadline>
            <StyledText>{fulfillmentGroup.data?.shippingAddress.description}</StyledText>
            <StyledHeadline>{"Dirección"}</StyledHeadline>
            <StyledText>{`${fulfillmentGroup.data?.shippingAddress.address} ${fulfillmentGroup.data?.shippingAddress.reference}`}</StyledText>
          </div>
        )}
        {fulfillmentGroup.type === "pickup" && fulfillmentGroup.data.pickupDetails && (
          <div>
            <br></br>
            <StyledHeadline>{"Fecha de entrega"}</StyledHeadline>
            <StyledText>
              {fulfillmentGroup.data.pickupDetails && fulfillmentGroup.data?.pickupDetails.datetime}
            </StyledText>
          </div>
        )}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <aside>
        <Grid container>
          <StyledTitle className={classes.customSize}>{"Revisa tu orden"}</StyledTitle>
          <Divider className={classes.divider} />
          {this.renderCartItems()}
          {this.renderCartSummary()}
          {this.renderDeliveryDetails()}
        </Grid>
      </aside>
    );
  }
}

export default withStyles(styles)(CheckoutSummary);
