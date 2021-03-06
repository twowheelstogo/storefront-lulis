import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import Helmet from "react-helmet";
import { inPageSizes } from "lib/utils/pageSizes";
import { withApollo } from "lib/apollo/withApollo";
import withCatalogItems from "containers/catalog/withCatalogItems";

import Layout from "components/CustomLayout";
import HomePage from "custom/homePage";
import CategoryTabs from "custom/components/CategoryTabs";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";

// @inject("routingStore")
// @observer

const Store = props => {
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
		uiStore
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
		<Layout shop = { shop }>
			<Helmet>
				<title>{shop && shop.name}</title>
				<meta name="description" content={shop && shop.description} />
			</Helmet>

			<CategoryTabs 
				catalogItems={ catalogItems }
				currencyCode={ (shop && shop.currency && shop.currency.code) || "GTQ" }
				isLoadingCatalogItems={ isLoadingCatalogItems }
				pageInfo={ catalogItemsPageInfo }
				pageSize={ pageSize }
				setPageSize={ setPageSize }
				setSortBy={ setSortBy }
				sortBy={ sortBy }
				cart={{items:[]}}
			/>
		</Layout>
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
  
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(Store)));