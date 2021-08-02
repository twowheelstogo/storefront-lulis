import React from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import Helmet from "react-helmet";
import { withApollo } from "lib/apollo/withApollo";

import Layout from "components/Layout";
import ContactUsForm from "custom/contactUs";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";

const ContactUs = props => {
	const propTypes = {
		shop: PropTypes.shape({
			currency: PropTypes.shape({
				code: PropTypes.string.isRequired
			})
		})
	};

	const {
		shop,
	} = props;

	let pageTitle;
	if (shop) {
		pageTitle = shop.name;
		if (shop.description) pageTitle = `${pageTitle} | ${shop.description}`;
	} else {
		pageTitle = "Storefront";
	}

	return (
		<Layout shop = { shop }>
			<Helmet>
				<title>{shop && shop.name}</title>
				<meta name="description" content={shop && shop.description} />
			</Helmet>

			<ContactUsForm />
		</Layout>
	);
};

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

export async function getStaticPaths() {
	return {
		paths: locales.map((locale) => ({ params: { lang: locale } })),
		fallback: false
	};
}

export default withApollo()(ContactUs);