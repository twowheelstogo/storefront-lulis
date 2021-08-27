import graphQLRequest from "staticUtils/graphQLRequest";
import productBundleQuery from "./productBundle.js";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";

/**
 * Fetch a product bundle by its id
 * 
 * @param {String} productId - The bundle id of the bundle to fetch
 * @param {String} lang - The bundle id of the bundle to fetch
 * @returns {Object} bundle - the fetched bundle
 */
export default async function fetchProductBundle(productId, lang) {
    const { shop } = await fetchPrimaryShop(lang);

    // return { productBundle: { productId, shop, lang } }
    if (!productId || !shop) return { productBundle: {} };

    const data = await graphQLRequest(productBundleQuery, {
        productId,
        shopId: shop._id
    });

    return data && { productBundle: data.productBundle };
}
