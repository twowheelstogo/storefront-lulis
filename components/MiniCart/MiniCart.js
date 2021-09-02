import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import { withStyles } from "@material-ui/core/styles";
import MiniCartComponent from "components/MiniCartComponent";
import CartItems from "components/CartItems";
import CartEmptyMessage from "components/CartEmptyMessage";
import IconButton from "@material-ui/core/IconButton";
import Router from "translations/i18nRouter";
import Badge from "@material-ui/core/Badge";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import withCart from "containers/cart/withCart";
import SvgIcon from "@material-ui/core/SvgIcon";
import { withComponents } from "@reactioncommerce/components-context";
const styles = ({ palette, zIndex }) => ({
	popper: {
		marginTop: "0.5rem",
		marginRight: "1rem",
		zIndex: zIndex.modal
	},
	cart: {
		backgroundColor: palette.common.white
	},
	emptyCart: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 360,
		height: 320,
		border: palette.borders.default
	},
	badge: {
		width: 20,
		height: 20,
		top: 10,
		left: 20,
		backgroundColor: palette.reaction.badges.cart,
		color: palette.primary.main
	}
});

class MiniCart extends Component {
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
  	classes: PropTypes.object.isRequired,
  	hasMoreCartItems: PropTypes.bool,
  	loadMoreCartItems: PropTypes.func,
  	onChangeCartItemsQuantity: PropTypes.func,
  	onRemoveCartItems: PropTypes.func,
  	uiStore: PropTypes.shape({
  		isCartOpen: PropTypes.bool.isRequired,
  		openCart: PropTypes.func.isRequired,
  		closeCart: PropTypes.func.isRequired
  	})
  }

  constructor(props) {
  	super(props);

  	this.setPopoverAnchorEl = (element) => {
  		this.anchorElement = element;
  	};
  }

  state = {
  	anchorElement: null
  };

  anchorElement = null

  handlePopperOpen = () => {
  	const { uiStore: { openCart } } = this.props;
  	openCart();
  }

  handleClick = () => Router.push("/");

  handleCheckoutButtonClick = () => {
  	this.handleLeavePopper();
  	Router.push("/cart/checkout");
  }

  handlePopperClose = () => {
  	const { closeCart } = this.props.uiStore;
  	closeCart(0);
  }

  handleEnterPopper = () => {
  	const { openCart } = this.props.uiStore;
  	openCart();
  }

  handleLeavePopper = () => {
  	const { closeCart } = this.props.uiStore;
  	closeCart();
  }

  handleOnClick = () => {
  	const { closeCart } = this.props.uiStore;
  	closeCart();
  	Router.push("/cart");
  }

  handleItemQuantityChange = (quantity, cartItemId) => {
  	const { onChangeCartItemsQuantity } = this.props;

  	onChangeCartItemsQuantity({ quantity, cartItemId });
  }

  handleRemoveItem = async (itemId) => {
  	const { onRemoveCartItems } = this.props;
  	await onRemoveCartItems(itemId);
  };

  renderMiniCart() {
  	const { cart, classes, hasMoreCartItems, loadMoreCartItems,components:{Button} } = this.props;

  	if (cart && Array.isArray(cart.items) && cart.items.length) {
  		return (
  			<MiniCartComponent
  				cart={cart}
  				onCheckoutButtonClick={this.handleCheckoutButtonClick}
  				footerMessageText ="El envìo es calculado en el proceso de compra"
  				components={{
  					QuantityInput: "div",
  					CartItems: (cartItemProps) => (
  						<CartItems
  							{...cartItemProps}
  							hasMoreCartItems={hasMoreCartItems}
  							onRemoveItemFromCart={this.handleRemoveItem}
  							onChangeCartItemQuantity={this.handleItemQuantityChange}
  							onLoadMoreCartItems={loadMoreCartItems}
  						/>
  					),
  					CartCheckoutButton: (cartCheckoutProps) => (
  						<Button {...cartCheckoutProps} isFullWidth color="primary">{"Proceder a la compra"}</Button>          
  					)
  				}}
  			/>
  		);
  	}

  	return (
  		<div className={classes.emptyCart}>
  			<div>
  				<CartEmptyMessage 
  					messageText = {"Tu Carrito está vacío"}
  					buttonText = {"Continuar comprando"}
  					onClick={this.handleClick} />
  			</div>
  		</div>
  	);
  }

  render() {
  	const { cart, classes, uiStore } = this.props;
  	const { isCartOpen } = uiStore;
  	const id = (isCartOpen) ? "simple-popper" : null;
  	return (
  		<Fragment>
  			<div ref={this.setPopoverAnchorEl}>
  				<IconButton color="inherit"
  					onMouseEnter={this.handlePopperOpen}
  					onMouseLeave={this.handlePopperClose}
  					onClick={this.handleOnClick}
  				>
  					{(cart && cart.totalItemQuantity > 0)
  						? (
  							<Badge
  								badgeContent={cart.totalItemQuantity}
  								// color="primary"
  								classes={{ badge: classes.badge }}
  							>
  								<CartIcon/>
  							</Badge>
  						)
  						: <CartIcon />
  					}
  				</IconButton>
  			</div>

  			<Popper
  				className={classes.popper}
  				id={id}
  				open={isCartOpen}
  				anchorEl={this.anchorElement}
  				transition
  				onMouseEnter={this.handleEnterPopper}
  				onMouseLeave={this.handleLeavePopper}
  			>
  				{({ TransitionProps }) => (
  					<Fade {...TransitionProps}>
  						<div className={classes.cart}>
  							{this.renderMiniCart()}
  						</div>
  					</Fade>
  				)}
  			</Popper>
  		</Fragment>
  	);
  }
}
const CartIcon =() =><SvgIcon>

	<svg width="24" height="24" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
		<path d="M9.3504 11.8203C9.9714 11.8203 10.4754 11.3163 10.4754 10.6953V6.30781C10.4754 4.34638 12.0712 2.75 14.0327 2.75C15.9941 2.75 17.5905 4.34638 17.5905 6.30781V10.6953C17.5905 11.3163 18.0939 11.8203 18.7155 11.8203C19.3365 11.8203 19.8405 11.3163 19.8405 10.6953V6.30781C19.841 3.1055 17.2355 0.5 14.0327 0.5C10.8309 0.5 8.2254 3.1055 8.2254 6.30781V10.6953C8.2254 11.3163 8.7294 11.8203 9.3504 11.8203Z"/>
		<path d="M26.9375 9.29245H20.966V10.6953C20.966 11.9362 19.9569 12.9453 18.716 12.9453C17.4751 12.9453 16.466 11.9362 16.466 10.6953V9.29245H11.6009V10.6953C11.6009 11.9362 10.5918 12.9453 9.35092 12.9453C8.11005 12.9453 7.10092 11.9362 7.10092 10.6953V9.29245H1.06248C0.751983 9.29245 0.560171 9.53714 0.633858 9.83864L4.57023 25.8682C4.80761 26.7693 5.75598 27.5 6.68748 27.5H21.3125C22.2451 27.5 23.1924 26.7693 23.4309 25.8682L27.3661 9.83864C27.4398 9.53657 27.2485 9.29245 26.9375 9.29245Z"/>
	</svg>
</SvgIcon>;
export default withStyles(styles, { name: "SkMiniCart" })(inject("uiStore")(withComponents(MiniCart)));
