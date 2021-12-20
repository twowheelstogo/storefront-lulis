import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Router from "translations/i18nRouter";
import { useApolloClient } from "@apollo/client";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CartEmptyMessage from "components/CartEmptyMessage";
import { StripeProvider } from "react-stripe-elements";
import CheckoutActions from "components/CheckoutActions";
import CheckoutSummary from "components/CheckoutSummary";
import Layout from "components/CustomLayout";
import PageLoading from "components/PageLoading";
import { withApollo } from "lib/apollo/withApollo";
import useCart from "hooks/cart/useCart";
import useAuthStore from "hooks/globalStores/useAuthStore";
import useStores from "hooks/useStores";
import useShop from "hooks/shop/useShop";
import useAvailablePaymentMethods from "hooks/availablePaymentMethods/useAvailablePaymentMethods";
// import useAddressValidation from "hooks/address/useAddressValidation";
import useTranslation from "hooks/useTranslation";
import definedPaymentMethods from "custom/paymentMethods";
import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const HeaderAlert = styled.div`
	background: #000000;
	width: 100%;
	padding: 5px;
	text-align: center;
	color: white;
	text-weight: 800;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	gap: 20px;
	position: fixed;
	top: 110px;
	left: 0;
	z-index: 10000;
	font-size: 14px;
	display: ${(props) => (props.open ? "flex" : "none")}
`;

const useStyles = makeStyles((theme) => ({
	checkoutActions: {
		width: "100%",
		maxWidth: "800px",
		alignSelf: "center",
		paddingLeft: "auto",
		paddingRight: "auto",
		paddingBottom: theme.spacing(5),
		paddingTop: theme.spacing(5),
		[theme.breakpoints.down("md")]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2)
		}
		// [theme.breakpoints.up("md")]: {
		//   paddingRight: "2rem"
		// }
	},
	cartSummary: {
		maxWidth: "400px",
		alignSelf: "flex-start",
		[theme.breakpoints.up("md")]: {
			paddingRight: "2rem"
		}
	},
	checkoutContent: {
		flex: "1",
		maxWidth: theme.layout.mainContentMaxWidth,
		padding: "1rem",
		[theme.breakpoints.down("md")]: {
			maxWidth: "100%"
		}
	},
	checkoutContentContainer: {
		display: "flex",
		justifyContent: "center"
	},

	flexContainer: {
		display: "flex",
		flexDirection: "column"
	},
	emptyCartContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	emptyCart: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 320,
		height: 320
	},
	logo: {
		color: theme.palette.reaction.reactionBlue,
		marginRight: theme.spacing(1),
		borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`
	},
	main: {
		display: "flex",
		flexFlow: "column"
	},
	root: {},
	checkoutSummary: {
		width: "100%",
		maxWidth: "325px",
		paddingLeft: "auto",
		paddingRight: "auto",
		paddingTop: theme.spacing(5),
		alignSelf: "center",
		position: "sticky",
		top: "110px",
		[theme.breakpoints.down("md")]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
			maxWidth: "100%"
		}
	},
	flexSummary: {
		background: theme.palette.background.checkout,
		flex: "1 1 auto",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.down("sm")]: {
			background: "white"
		}
	},
	flexContent: {
		height: "100%",
		display: "flex",
		flexDirection: "column"
	},
	closeAlert: {
		color: "white"
	}
}));

const Checkout = ({ router }) => {
	const classes = useStyles();
	const { cartStore } = useStores();
	const shop = useShop();
	const authStore = useAuthStore();
	const { locale, t } = useTranslation("common"); // eslint-disable-line no-unused-vars, id-length
	const apolloClient = useApolloClient();
	// TODO: implement address validation
	// const [addressValidation, addressValidationResults] = useAddressValidation();
	const [stripe, setStripe] = useState();
	const {
		cart,
		isLoadingCart,
		checkoutMutations,
		clearAuthenticatedUsersCart,
		hasMoreCartItems,
		loadMoreCartItems,
		onRemoveCartItems,
		onChangeCartItemsQuantity
	} = useCart();
	const [availablePaymentMethods = [], isLoadingAvailablePaymentMethods] = useAvailablePaymentMethods();

	const { asPath } = router;
	const hasIdentity = !!((cart && cart.account !== null) || (cart && cart.email));
	const pageTitle = hasIdentity ? `Checkout | ${shop && shop.name}` : `Login | ${shop && shop.name}`;
	const [showAlert, setShowAlert] = useState(true);

	const hideAlert = () => setShowAlert(false);

	useEffect(() => {
		// Skipping if the `cart` is not available
		if (!cart) return;
		if (!hasIdentity) {
			Router.push("/cart/login");
		}
	}), [cart, hasIdentity, asPath, Router]; // eslint-disable-line no-sequences

	useEffect(() => {
		if (!stripe && process.env.STRIPE_PUBLIC_API_KEY && window && window.Stripe) {
			setStripe(window.Stripe(process.env.STRIPE_PUBLIC_API_KEY));
		}
	}), [stripe]; // eslint-disable-line no-sequences
	// eslint-disable-next-line react/no-multi-comp
	const renderCheckoutContent = () => {
		// sanity check that "tries" to render the correct /cart view if SSR doesn't provide the `cart`

		if (!cart) {
			return (
				<div className={classes.emptyCartContainer}>
					<div className={classes.emptyCart}>
						<div>
							<CartEmptyMessage onClick={() => Router.push("/")}
								messageText={"Tu Carrito está vacío"}
								buttonText={"Continuar comprando"} />
						</div>
					</div>
				</div>
			);
		}

		if (hasIdentity && cart) {
			if (cart && Array.isArray(cart.items) && cart.items.length === 0) {
				return (
					<div className={classes.emptyCartContainer}>
						<div className={classes.emptyCart}>
							<div>
								<CartEmptyMessage onClick={() => Router.push("/")}
									messageText={"Tu Carrito está vacío"}
									buttonText={"Continuar comprando"} />
							</div>
						</div>
					</div>
				);
			}

			const orderEmailAddress = (cart && cart.account && Array.isArray(cart.account.emailRecords) &&
				cart.account.emailRecords[0].address) || (cart ? cart.email : null);

			// Filter the hard-coded definedPaymentMethods list from the client to remove any
			// payment methods that were not returned from the API as currently available.
			const paymentMethods = definedPaymentMethods.filter((method) =>
				!!availablePaymentMethods.find((availableMethod) => availableMethod.name === method.name));

			return (
				<Grid container style={{ minHeight: "100vh" }}>
					<HeaderAlert open={showAlert}>
						<div>El tiempo de entrega de pedidos es de 1 a 2 horas!</div>
						<IconButton className={classes.closeAlert} size="small" color="inherit" onClick={hideAlert}>
							<CloseIcon fontSize="small" />
						</IconButton>
					</HeaderAlert>
					<Grid item xs={12} md={4}>
						<div className={classes.flexSummary}>
							<div className={classes.checkoutSummary}>
								<CheckoutSummary
									cart={cart}
									hasMoreCartItems={hasMoreCartItems}
									onRemoveCartItems={onRemoveCartItems}
									onChangeCartItemsQuantity={onChangeCartItemsQuantity}
									onLoadMoreCartItems={loadMoreCartItems}
								/>
							</div>
						</div>
					</Grid>
					<Grid item xs={12} md={8}>
						<div className={classes.flexContent}>
							<div className={classes.checkoutActions}>
								<CheckoutActions
									apolloClient={apolloClient}
									cart={cart}
									cartStore={cartStore}
									authStore={authStore}
									checkoutMutations={checkoutMutations}
									clearAuthenticatedUsersCart={clearAuthenticatedUsersCart}
									orderEmailAddress={orderEmailAddress}
									paymentMethods={paymentMethods}
								/>
							</div>
						</div>
					</Grid>
				</Grid>
			);
		}

		// Render nothing by default
		return null;
	};

	if (isLoadingCart || isLoadingAvailablePaymentMethods) {
		return (
			<Layout shop={shop}>
				<PageLoading delay={0} />
			</Layout>
		);
	}

	return (
		<Layout shop={shop} noMaxwidth>
			<Head>
				<title>{pageTitle}</title>
				<meta name="description" content={shop && shop.description} />
			</Head>
			{renderCheckoutContent()}
		</Layout>
	);
};

Checkout.propTypes = {
	router: PropTypes.object,
};

/**
 *  Static props for the cart
 *
 * @returns {Object} the props
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
 *  Static paths for the cart
 *
 * @returns {Object} the paths
 */
export async function getStaticPaths() {
	return {
		paths: locales.map((locale) => ({ params: { lang: locale } })),
		fallback: false
	};
}

export default withApollo()(Checkout);
