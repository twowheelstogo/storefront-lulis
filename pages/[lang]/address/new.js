import React,{ Component, Fragment } from "react";
import Layout from "components/CustomLayout";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import PropTypes from "prop-types";
import useShop from "hooks/shop/useShop";
import { CustomPropTypes } from "@reactioncommerce/components/utils";
import { withApollo } from "lib/apollo/withApollo";
import { locales } from "translations/config";

import Head from "next/head";

const CreateAddress = props =>{
        const shop = useShop();
        const pageTitle = `Address | New | ${shop && shop.name}`
        return(
            <Layout shop={shop} noMaxwidth>
                 <Head>
                    <title>{pageTitle}</title>
                    <meta name="description" content={shop && shop.description} />
                </Head>
                <div>CreateAddress</div>
            </Layout>
        );
}
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
  
export default withApollo()(CreateAddress);