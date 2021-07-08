import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import inject from "hocs/inject";
import Helmet from 'react-helmet';
import { inPageSizes } from "lib/utils/pageSizes";
import { withApollo } from "lib/apollo/withApollo";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withCart from "containers/cart/withCart";

import MainLayout from 'components/MainLayout';
import HomePage from 'custom/homePage';

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import fetchAllTags from "staticUtils/tags/fetchAllTags";
import CategoryLayout from 'components/CategoryLayout';
import {makeStyles} from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileHomePage from "components/MobileHomePage";
// @inject("routingStore")
// @observer
const useStyles = makeStyles((theme)=>({
	root:{
		display:'flex'
	},
	content:{
		padding:theme.spacing(2)
	}
}))
const Home = props => {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
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

	const { routingStore } = props;
	routingStore.setTagId(null);
	
	const setPageSize = (pageSize) => {
	this.props.routingStore.setSearch({ limit: pageSize });
	this.props.uiStore.setPageSize(pageSize);
	};

	const setSortBy = (sortBy) => {
	this.props.routingStore.setSearch({ sortby: sortBy });
	this.props.uiStore.setSortBy(sortBy);
	};

	const {
		catalogItems,
		catalogItemsPageInfo,
		isLoadingCatalogItems,
		routingStore: { query },
		shop,
		tags,
		uiStore,
		cart,
		addItemsToCart,
		onChangeCartItemsQuantity
	} = props;
	const pageSize = query && inPageSizes(query.limit) ? parseInt(query.limit, 10) : uiStore.pageSize;
    const sortBy = query && query.sortby ? query.sortby : uiStore.sortBy;
	let pageTitle;
    if (shop) {
      pageTitle = shop.name;
      if (shop.description) pageTitle = `${pageTitle} | ${shop.description}`;
    } else {
      pageTitle = "Storefront";
    }

	return(
		<MainLayout shop = { shop } title="YUM NOM NOM :)"
		subtitle="" background="https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2Fprincipal.png?alt=media&token=f54afab0-0e72-4590-a711-20f72204938f"
		type="image">
			<Helmet>
				<title>{shop && shop.name}</title>
				<meta name="description" content={shop && shop.description} />
			</Helmet>
			{!matches &&(
				<main className={classes.content}>
				<HomePage 
					catalogItems={ catalogItems }
					currencyCode={ (shop && shop.currency && shop.currency.code) || "GTQ" }
					isLoadingCatalogItems={ isLoadingCatalogItems }
					pageInfo={ catalogItemsPageInfo }
					pageSize={ pageSize }
					tags={tags}
					setPageSize={ setPageSize }
					setSortBy={ setSortBy }
					sortBy={ sortBy }
					cart={cart}
					addItemsToCart={addItemsToCart}
					onChangeCartItemsQuantity={onChangeCartItemsQuantity}
				/>
				</main>
			)}
			{matches &&(
				<MobileHomePage
				 catalogItems = {catalogItems}
				 tags = {tags}
				 cart={cart}
				 addItemsToCart={addItemsToCart}
				 onChangeCartItemsQuantity={onChangeCartItemsQuantity}
				/>
			)}
        </MainLayout>
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
	const tags = await fetchAllTags(lang)
	if (!primaryShop) {
		return {
			props: {
			shop: null,
			...translations
			},
			fetchAllTags:null,
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
  
export default withApollo()(withCatalogItems(withCart(inject("routingStore", "uiStore")(Home))));