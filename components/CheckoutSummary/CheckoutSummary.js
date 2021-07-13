import CartItems from "components/CartItems";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import {Divider} from "@material-ui/core";
import CheckoutCartItem from "components/CheckoutCartItem";
const styles = (theme) => ({
  summary: {
    borderTop: theme.palette.borders.default
  },
  cartItems:{
    paddingTop:theme.spacing(2),
  },
  divider:{
    color:theme.palette.secondary.main,
    borderTop:theme.palette.borders.secondary,
    width: '100%',
    opacity:'25%'
  }
});
const StyledTitle = styled.div`
  color:#7A6240;
  font-size: 36px;
  font-weight: 700;
  margin: auto;
`;
class CheckoutSummary extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      checkout: PropTypes.shape({
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        })
      })
    }),
    classes: PropTypes.object,
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  }

  static defaultProps = {
    hasMoreCartItems: false,
    loadMoreCartItems() {},
    onChangeCartItemsQuantity() {},
    onRemoveCartItems() {}
  }

  handleItemQuantityChange = (quantity, cartItemId) => {
    const { onChangeCartItemsQuantity } = this.props;

    onChangeCartItemsQuantity({ quantity, cartItemId });
  }

  handleRemoveItem = (_id) => {
    const { onRemoveCartItems } = this.props;

    onRemoveCartItems(_id);
  }

  renderCartItems() {
    const { cart, hasMoreCartItems, loadMoreCartItems,classes } = this.props;

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
              CustomCartItem:(cartItemProps)=>(
                <CheckoutCartItem {...cartItemProps}/>
              )
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
      const {
        fulfillmentTotal,
        itemTotal,
        surchargeTotal,
        taxTotal,
        total
      } = cart.checkout.summary;

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

  render() {
    const {classes} = this.props;
    return (
      <aside>
        <Grid container>
          <StyledTitle>{"Revisa tu orden"}</StyledTitle>
          <Divider className={classes.divider}/>
          {this.renderCartItems()}
          {this.renderCartSummary()}
        </Grid>
      </aside>
    );
  }
}

export default withStyles(styles)(CheckoutSummary);
