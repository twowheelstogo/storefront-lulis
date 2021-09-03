import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import Breadcrumbs from "components/Breadcrumbs";
import ProductGrid from "components/ProductGrid";
import ProductGridEmptyMessage from "components/ProductGrid/ProductGridEmptyMessage";
import ProductGridHero from "components/ProductGridHero";
import ProductGridTitle from "components/ProductGridTitle";
import MainLayout from "components/MainLayout";
import SharedPropTypes from "lib/utils/SharedPropTypes";
import { withApollo } from "lib/apollo/withApollo";
import CustomProductGrid from "custom/components/ProductGrid";
import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchAllTags from "staticUtils/tags/fetchAllTags";
import fetchTag from "staticUtils/tag/fetchTag";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { withStyles } from "@material-ui/core/styles";
import PageLoading from "components/PageLoading";
import { useRouter } from "next/router";


const styles = (theme) => ({
	root: {
		padding: theme.spacing(2)
	}
});

const StyledProductGrid = withStyles(styles)((props)=> {
	const {
		currencyCode,
		cart,
		addItemsToCart,
		onChangeCartItemsQuantity,
		products: catalogProducts,
		classes
	} = props;
	const products = catalogProducts.map((product)=> {
		const productInCart = (cart?.items || []).find((item)=> item.productSlug == product.node.product.slug);
		return{
			...product.node.product,
			cartItem:productInCart
		};
	})
	return (
		<div className={classes.root}>
			<CustomProductGrid
			currencyCode={currencyCode}
			cart={cart}
			addItemsToCart={addItemsToCart}
			onChangeCartItemsQuantity={onChangeCartItemsQuantity}
			products={products}
		/>
		</div>
	);
})

class TagGridPage extends Component {
	static propTypes = {
		/**other properties */
		catalogItems: PropTypes.array.isRequired,
		catalogItemsPageInfo: PropTypes.object,
		classes: PropTypes.object,
		initialGridSize: PropTypes.object,
		isLoadingCatalogItems: PropTypes.bool,
		routingStore: PropTypes.shape({
			query: PropTypes.shape({
				limit: PropTypes.string,
				sortby: PropTypes.string
			}),
			setSearch: PropTypes.func.isRequired,
			tag: SharedPropTypes.tag
		}),
		shop: PropTypes.shape({
			currency: PropTypes.shape({
				code: PropTypes.string.isRequired
			}),
			description: PropTypes.string
		}),
		tag: SharedPropTypes.tag,
		uiStore: PropTypes.shape({
			pageSize: PropTypes.number.isRequired,
			setPageSize: PropTypes.func.isRequired,
			setSortBy: PropTypes.func.isRequired,
			sortBy: PropTypes.string.isRequired
		})
	};

	static defaultProps = {
		catalogItems: []
	};

	static getDerivedStateFromProps(props) {
		const { routingStore, tag } = props;
		if (tag && routingStore.tagId !== tag._id) {
			routingStore.setTagId(tag._id);
			routingStore.setSearch({
				before: null,
				after: null
			});
		}

		return null;
	}

	state = {};

	setPageSize = (pageSize) => {
		this.props.routingStore.setSearch({ limit: pageSize });
		this.props.uiStore.setPageSize(pageSize);
	};

	setSortBy = (sortBy) => {
		this.props.routingStore.setSearch({ sortby: sortBy });
		this.props.uiStore.setSortBy(sortBy);
	};

	renderHeaderMetatags(metafields) {
		const { shop } = this.props;

		const metatags = [];
		let hasDescription = false;
		metafields.forEach((field) => {
			if (field.namespace && field.namespace === "metatag") {
				const metatag = {
					content: field.value
				};
				metatag[field.scope] = field.key;
				metatags.push(metatag);
				if (field.key === "description") {
					hasDescription = true;
				}
			}
		});
		if (hasDescription === false) {
			metatags.push({ name: "description", content: shop && shop.description });
		}
		return metatags;
	}
	getMetaImage(metafields) {
		let url = "https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2Fezgif.com-gif-maker(2).png?alt=media&token=e1c9e79f-4977-4288-9fd5-7737dc96e268s";
		metafields.forEach((field) => {
			if (field.key == "og:image") url = field.value;
		});
		return url;
	}
	getMediaUrl(heroMediaUrl) {
		if (heroMediaUrl == null) return "https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2Fezgif.com-gif-maker(2).png?alt=media&token=e1c9e79f-4977-4288-9fd5-7737dc96e268s";
		return heroMediaUrl;
	}
	render() {
		const {
			catalogItems,
			isLoadingCatalogItems,
			shop,
			tag,
		} = this.props;
		
		const currencyCode = (shop && shop.currency.code) || "GTQ";

		if (!tag && !shop) {
			return (
				<MainLayout shop={shop} title={"No encontrado"}
					subtitle=""
					type="image"
					background="https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2Fezgif.com-gif-maker(2).png?alt=media&token=e1c9e79f-4977-4288-9fd5-7737dc96e268s">
					<ProductGridEmptyMessage
						actionMessage="Go Home"
						resetLink="/"
					/>
				</MainLayout>
			);
		}

		if(isLoadingCatalogItems || !tag) return <PageLoading />

		return (
			<MainLayout shop={shop}
				title={`${(tag && tag.displayTitle) || "Sin etiqueta"}`}
				subtitle=""
				type="image"
				background={this.getMediaUrl((tag && tag.heroMediaUrl) || "https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2Fezgif.com-gif-maker(2).png?alt=media&token=e1c9e79f-4977-4288-9fd5-7737dc96e268s")}>
				<Helmet
					title={`${tag && tag.name} | ${shop && shop.name}`}
					meta={
						tag && tag.metafields && tag.metafields.length > 0 ?
							this.renderHeaderMetatags(tag.metafields)
							:
							[{ name: "description", content: shop && shop.description }]
					}
				/>
					<StyledProductGrid
						currencyCode={currencyCode}
						products={catalogItems}
					/>
			</MainLayout>
		);
	}
}

/**
 *  Static props for the tags route
 *
 * @param {String} lang - the shop's language
 * @param {String} slug - the tag's slug
 * @returns {Object} props
 */
export async function getStaticProps({ params: { lang, slug } }) {
	const primaryShop = await fetchPrimaryShop(lang);

	if (!primaryShop) {
		return {
			props: {
				shop: null,
				translations: null,
				fetchAllTags: null,
				tag: null
			},
			// eslint-disable-next-line camelcase
			unstable_revalidate: 1 // Revalidate immediately
		};
	}

	return {
		props: {
			...primaryShop,
			...await fetchTranslations(lang, ["common"]),
			...await fetchAllTags(lang),
			...await fetchTag(slug, lang)
		},
		// eslint-disable-next-line camelcase
		unstable_revalidate: 120 // Revalidate each two minutes
	};
}

/**
 *  Static path for the tags route
 *
 * @returns {Object} the paths
 */
export async function getStaticPaths() {
	return {
		paths: locales.map((locale) => ({ params: { lang: locale, slug: "-" } })),
		fallback: true
	};
}

export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(TagGridPage)));
