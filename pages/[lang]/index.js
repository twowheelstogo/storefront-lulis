import React, { } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import Helmet from "react-helmet";
import { inPageSizes } from "lib/utils/pageSizes";
import { withApollo } from "lib/apollo/withApollo";
import withCatalogItems from "containers/catalog/withCatalogItems";
import PageLoading from "components/PageLoading";

import MainLayout from "components/MainLayout";
import HomePage from "custom/homePage";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import fetchAllTags from "staticUtils/tags/fetchAllTags";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MobileHomePage from "components/MobileHomePage";
// @inject("routingStore")
// @observer
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex"
	},
	content: {
		padding: theme.spacing(2)
	}
}));
const Home = props => {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const propTypes = {
		catalogItems: PropTypes.array,
		catalogItemsPageInfo: PropTypes.object,
		isLoadingCatalogItems: PropTypes.bool,
		routingStore: PropTypes.Object,
		shop: PropTypes.shape({
			currency: PropTypes.shape({
				code: PropTypes.string.isRequired
			})
		}),
		tag: PropTypes.object,
		uiStore: PropTypes.shape({
			pageSize: PropTypes.number.isRequired,
			setPageSize: PropTypes.func.isRequired,
			setSortBy: PropTypes.func.isRequired,
			sortBy: PropTypes.string.isRequired
		})
	};

	const {
		shop,
		isLoadingCatalogItems,
		slugStore: { heroTitle, heroBackground }
	} = props;

	let pageTitle;
	if (shop) {
		pageTitle = shop.name;
		if (shop.description) pageTitle = `${pageTitle} | ${shop.description}`;
	} else {
		pageTitle = "Storefront";
	}
	if (isLoadingCatalogItems) return <PageLoading />
	return (
		<MainLayout shop={shop} title={heroTitle}
			subtitle="" background={heroBackground}
			type="image">
			<Helmet>
				<title>{shop && shop.name}</title>
				<meta name="description" content={shop && shop.description} />
			</Helmet>
			{!matches && (
				<RenderHomePage {...props} />
			)}
			{matches && (
				<RenderMobilePage {...props} />
			)}
		</MainLayout>
	);
};
const RenderHomePage = props => {
	const {
		catalogItems,
		catalogItemsPageInfo,
		isLoadingCatalogItems,
		shop,
		tags,
		cart,
		addItemsToCart,
		onChangeCartItemsQuantity
	} = props;
	const classes = useStyles();
	return (
		<main className={classes.content}>
			<HomePage
				catalogItems={catalogItems}
				currencyCode={(shop && shop.currency && shop.currency.code) || "GTQ"}
				isLoadingCatalogItems={isLoadingCatalogItems}
				pageInfo={catalogItemsPageInfo}
				tags={tags}
				cart={cart}
				addItemsToCart={addItemsToCart}
				onChangeCartItemsQuantity={onChangeCartItemsQuantity}
			/>
		</main>
	);
};
const RenderMobilePage = props => {
	const {
		catalogItems,
		isLoadingCatalogItems,
		shop,
		tags,
		cart,
		addItemsToCart,
		onChangeCartItemsQuantity,
		slugStore
	} = props;
	const currencyCode = (shop && shop.currency.code) || "GTQ";
	return (
		<MobileHomePage
			slugStore={slugStore}
			currencyCode={currencyCode}
			catalogItems={catalogItems}
			tags={tags}
			cart={cart}
			addItemsToCart={addItemsToCart}
			onChangeCartItemsQuantity={onChangeCartItemsQuantity}
		/>
	);
};
/**
*  Static props for the main layout
*
* @param {String} lang - the shop's language
* @returns {Object} the props
*/

export async function getStaticProps({ params: { lang } }) {
	const primaryShop = await fetchPrimaryShop(lang);
	const translations = await fetchTranslations(lang, ["common"]);
	const tags = await fetchAllTags(lang);
	if (!primaryShop) {
		return {
			props: {
				shop: null,
				...translations
			},
			fetchAllTags: null,
			// eslint-disable-next-line camelcase
			unstable_revalidate: 1 // Revalidate immediately
		};
	}

	return {
		props: {
			...primaryShop,
			...translations,
			...tags
		},
		// eslint-disable-next-line camelcase
		unstable_revalidate: 120 // Revalidate each two minutes
	};
}

/**
*  Static paths for the main layout
*
* @returns {Object} the paths
*/

export async function getStaticPaths() {
	return {
		paths: locales.map((locale) => ({ params: { lang: locale } })),
		fallback: false
	};
}

export default withApollo()(withCatalogItems(inject("routingStore", "uiStore", "slugStore")(Home)));