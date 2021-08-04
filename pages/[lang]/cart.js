import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import inject from "hocs/inject";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import CartSummary from "components/CartSummary/v2";
import withCart from "containers/cart/withCart";
import CartItems from "components/CartItems";
import CheckoutButtons from "components/CheckoutButtons";
import Link from "components/Link";
import Layout from "components/CustomLayout";
import Router from "translations/i18nRouter";
import PageLoading from "components/PageLoading";
import { withApollo } from "lib/apollo/withApollo";
import RoundedButton from "components/RoundedButton";
import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import BorderedCartItem from "components/BorderedCartItem";

const styles = (theme) => ({
	cartEmptyMessageContainer: {
		margin: "80px 0"
	},
	checkoutButtonsContainer: {
		backgroundColor: theme.palette.reaction.black02,
		padding: theme.spacing(2)
	},
	customerSupportCopy: {
		paddingLeft: `${theme.spacing(4)}px !important`
	},
	phoneNumber: {
		fontWeight: theme.typography.fontWeightBold
	},
	title: {
		fontWeight: theme.typography.fontWeightMedium,
		marginTop: "1.6rem",
		marginBottom: "3.1rem"
	},
	itemWrapper: {
		borderTop: theme.palette.borders.default,
		borderBottom: theme.palette.borders.default
	},
	cartItems:{
		padding:theme.spacing(1)
	}
});

class CartPage extends Component {
  static propTypes = {
  	cart: PropTypes.shape({
  		totalItems: PropTypes.number,
  		items: PropTypes.arrayOf(PropTypes.object),
  		checkout: PropTypes.shape({
  			fulfillmentTotal: PropTypes.shape({
  				displayAmount: PropTypes.string
  			}),
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
  };

  handleClick = () => Router.push("/");
  handleCheckout = () => Router.push("/cart/checkout");

  handleItemQuantityChange = (quantity, cartItemId) => {
  	const { onChangeCartItemsQuantity } = this.props;

  	onChangeCartItemsQuantity({ quantity, cartItemId });
  };

  handleRemoveItem = async (itemId) => {
  	const { onRemoveCartItems } = this.props;

  	await onRemoveCartItems(itemId);
  };

  renderCartItems(isMobile) {
  	const { cart, classes, hasMoreCartItems, loadMoreCartItems } = this.props;

  	if (cart && Array.isArray(cart.items) && cart.items.length) {
  		if(isMobile){
  			return (
  				<Grid item xs={12} md={8} className={classes.cartItems}>
  					<CartItems
  						hasMoreCartItems={hasMoreCartItems}
  						onLoadMoreCartItems={loadMoreCartItems}
  						items={cart.items}
  						onChangeCartItemQuantity={this.handleItemQuantityChange}
  						onRemoveItemFromCart={this.handleRemoveItem}
  						components={{
  							CustomCartItem:(cartItemProps)=>(
  								<BorderedCartItem {...cartItemProps}/>
  							)
  						}}
  					/>
  				</Grid>
  			);
  		}
  		return (
  			<Grid item xs={12} md={8}>
  				<div className={classes.itemWrapper}>
  					<CartItems
  						hasMoreCartItems={hasMoreCartItems}
  						onLoadMoreCartItems={loadMoreCartItems}
  						items={cart.items}
  						onChangeCartItemQuantity={this.handleItemQuantityChange}
  						onRemoveItemFromCart={this.handleRemoveItem}
  					/>
  				</div>
  			</Grid>
  		);
  	}

  	return (
  		<Grid item xs={12} className={classes.cartEmptyMessageContainer}>
  			<CartEmptyMessage
  				messageText = {"Tu Carrito está vacío"}
  				buttonText = {"Continuar comprando"}
  				onClick={this.handleClick} />
  		</Grid>
  	);
  }
  
  renderCartSummary() {
  	const { cart, classes } = this.props;

  	if (cart && cart.checkout && cart.checkout.summary && Array.isArray(cart.items) && cart.items.length) {
  		const { fulfillmentTotal, itemTotal, surchargeTotal, taxTotal, total } = cart.checkout.summary;

  		return (
  			<Grid item xs={12} md={3}>
  				<CartSummary
  					cartTitleText = {"Resùmen del carrito"}
  					displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
  					displaySubtotal={itemTotal && itemTotal.displayAmount}
  					displaySurcharge={surchargeTotal && surchargeTotal.displayAmount}
  					displayTax={taxTotal && taxTotal.displayAmount}
  					displayTotal={total && total.displayAmount}
  					itemsQuantity={cart.totalItemQuantity}
  				/>
  				<div className={classes.checkoutButtonsContainer}>
  					{/* <CheckoutButtons primaryButtonText={"Proceder a la compra"}/> */}
  					<RoundedButton buttonTitle="Proceder a la compra"
  						buttonSubtitle={total && `Total: ${total.displayAmount}`}
  						onClick={this.handleCheckout}/>
  				</div>
  			</Grid>
  		);
  	}

  	return null;
  }

  render() {
  	const { cart, classes, shop,width } = this.props;
  	// when a user has no item in cart in a new session, this.props.cart is null
  	// when the app is still loading, this.props.cart is undefined
  	if (typeof cart === "undefined") return <PageLoading delay={0} />;
  	// if(isWidthDown("sm",width)) return <MobileLayout {...this.props}/>
  	return (
  		<Layout shop={shop}>
  			<Helmet
  				title={`Cart | ${shop && shop.name}`}
  				meta={[{ name: "description", content: shop && shop.description }]}
  			/>
  			<Typography className={classes.title} variant="h4" align="center">
            Tu Carrito
  			</Typography>
  			<Grid container spacing={isWidthUp("md",width)?3:0}>
  				{this.renderCartItems(isWidthDown("sm",width))}
  				{this.renderCartSummary()}
  				<Grid className={classes.customerSupportCopy} item>
  					{/* <Typography paragraph variant="caption">
                Have questions? call <span className={classes.phoneNumber}>1.800.555.5555</span>
              </Typography> */}
  					<Typography paragraph variant="caption">
  						<Link href="#">Información de envío</Link>
  					</Typography>
  					<Typography paragraph variant="caption">
  						<Link href="#">Políticas de privacidad</Link>
  					</Typography>
  				</Grid>
  			</Grid>
  		</Layout>
  	);
  }
}
/**
 *  Static props for the cart route
 *
 * @param {String} lang - the shop's language
 * @returns {Object} props
 */
export async function getStaticProps({ params: { lang } }) {
	const primaryShop = await fetchPrimaryShop(lang);
	const translations = await fetchTranslations(lang, ["common"]);
	if (!primaryShop) {
		return {
			props: {
				shop: null,
				...translations
			},
			// eslint-disable-next-line camelcase
			unstable_revalidate: 1 // Revalidate immediately
		};
	}

	return {
		props: {
			...primaryShop,
			...translations
		},
		// eslint-disable-next-line camelcase
		unstable_revalidate: 120 // Revalidate each two minutes
	};
}

/**
 *  Static paths for the cart route
 *
 * @returns {Object} paths
 */
export async function getStaticPaths() {
	return {
		paths: locales.map((locale) => ({ params: { lang: locale } })),
		fallback: false
	};
}

export default withApollo()(withWidth({initialWidth: "md"})(withStyles(styles)(withCart(inject("uiStore")(CartPage)))));
