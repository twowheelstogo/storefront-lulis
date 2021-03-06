import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PageLoading from "components/PageLoading";
import Layout from "components/CustomLayout";
import withOrder from "containers/order/withOrder";
import OrderCard from "components/OrderCard";
import { withApollo } from "lib/apollo/withApollo";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import styled from "styled-components";

const CustomTitle = styled.h1`
	font-weight: 700;
	color: #3c3c3c;
	text-align: center;
`;

const CustomSubtitle = styled.p`
font-weight: 700;
color: #3c3c3c;
`;

const styles = (theme) => ({
	orderThankYou: {
		marginBottom: theme.spacing(3),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	title: {
		marginBottom: theme.spacing(3)
	}
});

class CheckoutComplete extends Component {
	static propTypes = {
		classes: PropTypes.object,
		isLoadingOrder: PropTypes.bool,
		order: PropTypes.shape({
			email: PropTypes.string.isRequired,
			referenceId: PropTypes.string.isRequired
		}),
		shop: PropTypes.shape({
			name: PropTypes.string.isRequired,
			description: PropTypes.string
		}),
		theme: PropTypes.object.isRequired
	};

	render() {
		const { classes, isLoadingOrder, order, shop } = this.props;

		if (isLoadingOrder) {
			return (
				<Layout shop={shop}>
					<PageLoading message="Loading order details..." />
				</Layout>
			);
		}

		if (!order) {
			return (
				<Layout shop={shop}>
					<div className={classes.checkoutContentContainer}>
						<div className={classes.orderDetails}>
							<section className={classes.section}>
								<Typography className={classes.title} variant="h6">Order not found</Typography>
							</section>
						</div>
					</div>
				</Layout>
			);
		}

		return (
			<Layout shop={shop}>
				<Helmet>
					<title>{shop && shop.name} | Checkout</title>
					<meta name="description" content={shop && shop.description} />
				</Helmet>
				<Grid container>
					<Grid item xs={false} md={3} /> {/* MUI grid doesn't have an offset. Use blank grid item instead. */}
					<Grid item xs={12} md={6}>
						<Grid item className={classes.orderThankYou} xs={12} md={12}>
							<CustomTitle className={classes.title}>Gracias por tu compra</CustomTitle>
							<CustomSubtitle>
								{"No de orden. "} <strong>{(`#${order.orderId}` || order.referenceId)}</strong>
							</CustomSubtitle>
							<Typography variant="body1">
								{"Te enviamos un correo de confirmaci??n a:"} <strong>{order.email}</strong>
							</Typography>
						</Grid>
						<Grid item xs={12} md={12}>
							<OrderCard isExpanded={true} order={order} />
						</Grid>
					</Grid>
					<Grid item xs={false} md={3} /> {/* MUI grid doesn't have an offset. Use blank grid item instead. */}
				</Grid>
			</Layout>
		);
	}
}

/**
 *  Static props for an order
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
 *  Static paths for an order
 *
 * @returns {Object} the props
 */
export async function getStaticPaths() {
	return {
		paths: locales.map((locale) => ({ params: { lang: locale } })),
		fallback: true
	};
}

export default withApollo()(withOrder(withStyles(styles, { withTheme: true })(CheckoutComplete)));
