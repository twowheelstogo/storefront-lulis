import React, { useMemo } from "react";
import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchProductBundle from "staticUtils/bundles/fetchProductBundle";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { useRouter } from "next/router";
import PageLoading from "components/PageLoading";
import withCart from "containers/cart/withCart";
import { withApollo } from "lib/apollo/withApollo";
import Helmet from "react-helmet";
import Layout from "components/CustomLayout";
import Typography from "@material-ui/core/Typography";
import BundleDetails from "components/BundleDetails";

/**
 *
 * @name buildJSONLd
 * @param {Object} product - The product
 * @param {Object} shop - The shop
 * @summary Builds a JSONLd object from product properties.
 * @return {String} Stringified product jsonld
 */
 function buildJSONLd(product, shop) {
	if (!product || !shop) return "";

	const currencyCode = shop.currency.code || "GTQ";
	const priceData = product.pricing[0];
	const images = product.media.map((image) => image.URLs.original);

	let productAvailability = "http://schema.org/InStock";
	if (product.isLowQuantity) {
		productAvailability = "http://schema.org/LimitedAvailability";
	}
	if (product.isBackorder && product.isSoldOut) {
		productAvailability = "http://schema.org/PreOrder";
	}
	if (!product.isBackorder && product.isSoldOut) {
		productAvailability = "http://schema.org/SoldOut";
	}

	// Recommended data from https://developers.google.com/search/docs/data-types/product
	const productJSON = {
		"@context": "http://schema.org/",
		"@type": "Product",
		"brand": product.vendor,
		"description": product.description,
		"image": images,
		"name": product.title,
		"sku": product.sku,
		"offers": {
			"@type": "Offer",
			"priceCurrency": currencyCode,
			"price": priceData.minPrice,
			"availability": productAvailability,
			"seller": {
				"@type": "Organization",
				"name": shop.name
			}
		}
	};

	return JSON.stringify(productJSON);
}

function ProductBundleDetailPage(props) {
	const router = useRouter();
	const {
		productBundle,
		addItemsToCart,
		cart,
		onChangeCartItemsQuantity,
		shop
	} = props;

	const currencyCode = (shop && shop.currency.code) || "GTQ";
	// const JSONLd = useMemo(() => {
	// 	if (productBundle && shop) {
	// 		return buildJSONLd(productBundle, shop);
	// 	}
	// 	return null;
	// }, [productBundle, shop]);
	// if(process.browser) console.log(window.location.hostname)

	if (router.isFallback) return <PageLoading />;
	if (!productBundle || !shop) return <Typography>Not Found</Typography>;

	return (
		<Layout shop={shop}>
			<Helmet
				title={`${productBundle && productBundle.name} | ${shop && shop.name}`}
				meta={[{ name: "description", content: productBundle && productBundle.description }]}
				// script={[{ type: "application/ld+json", innerHTML: JSONLd }]}
			/>
			{/* <div>a</div> */}
			<BundleDetails
				addItemsToCart={addItemsToCart}
				currencyCode={currencyCode}
				productBundle={productBundle}
				shop={shop}
				cart={cart}
				onChangeCartItemsQuantity={onChangeCartItemsQuantity}
			/>
		</Layout>
		// <div>a</div>
	);
}

/**
 *  Static props for a product
 *
 * @returns {Object} the props
 */
export async function getStaticProps({ params: { productId, lang } }) {
	const primaryShop = await fetchPrimaryShop(lang);
	const translations = await fetchTranslations(lang, ["common"]);
	const productBundle = await fetchProductBundle(productId, lang);
	if (!primaryShop || !productBundle) {
		return {
			props: {
				shop: null,
				translations: null,
				productBundle: null
			},
			// eslint-disable-next-line camelcase
			unstable_revalidate: 1 // Revalidate immediately
		}
	}

	return {
		props: {
			...primaryShop,
			...translations,
			...productBundle
		},
		unstable_revalidate: 120
	}
}

/**
 *  Static paths for a product
 *
 * @returns {Object} the paths
 */
export async function getStaticPaths() {
	return {
		paths: locales.map((locale) => ({ params: { lang: locale, productId: "-" } })),
		fallback: true
	};
}

export default withApollo()(ProductBundleDetailPage);
