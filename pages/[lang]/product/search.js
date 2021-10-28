import React, { Component, Fragment } from "react";
import Layout from "components/CustomLayout";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
import Helmet from "react-helmet";
import { withApollo } from "lib/apollo/withApollo";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchProductListDesktop from "components/SearchProductListDesktop";
import SearchProductListMobile from "components/SearchProductListMobile";
import withProducts from "containers/product/withProducts";
import Router from "translations/i18nRouter";
import { Form } from "reacto-form";
import { getRequiredValidator,applyTheme } from "@reactioncommerce/components/utils";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import withCart from "containers/cart/withCart";
const CustomTitle = styled.div`
    font-size: 36px;
    font-weight: 700;
    color: #4F4F4E;
    text-align: center;
`;
const CustomLabel = styled.div`
    font-size: 14px;
    color: #B8BCCA;
`;
const CustomText = styled.div`
    font-size: 14px;
    color: #B8BCCA;
`;
const CustomText2= styled.div`
    font-size: 24px;
    color: #B8BCCA;
`;
const styles = theme => ({
	flexSearcherColumn: {
		background: theme.palette.background.checkout,
		flex: "1 1 auto",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.down("sm")]: {
			background: "white",
			height: "auto"
		}
	},
	searcherColumn: {
		width: "100%",
		maxWidth: "60%",
		alignSelf: "center",
		position: "sticky",
		height: "90vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		top: "70px",
		gap: "15px",
		alignItems: "flex-end",
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.down("md")]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
			maxWidth: "100%",
			justifyContent: "flex-start",
			height: "auto",
			paddingBottom: theme.spacing(2),
		},
		position: "sticky",
		top: "70px"
	},
	searchInput: {
		display: "flex",
		flexDirection: "column",
		gap: "15px",
		width: "100%",
		[theme.breakpoints.down("md")]: {
			position:"sticky",
			top:"70px",
		},
	},
	flexProductColumn: {
		display: "flex",
		flexDirection: "column"
	},
	productColumn: {
		width: "100%",
		maxWidth: "450px",
		alignSelf: "center",
		paddingLeft: "auto",
		paddingRight: "auto",
		height: "100%",
		paddingTop: theme.spacing(5),
		[theme.breakpoints.down("md")]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2)
		},
		paddingBottom: theme.spacing(5),
	},
	grid1: {
		order: 1,
		[theme.breakpoints.down("sm")]: {
			order: 2
		},
	},
	grid2: {
		order: 2,
		[theme.breakpoints.down("sm")]: {
			order: 1
		},
	},
	container: {
		minHeight: "calc(100vh - 70px)",
		[theme.breakpoints.down("sm")]: {
			minHeight: "auto"
		}
	},
	startFinding:{
		margin:"auto",
		width:"100%",
		height:"100vh",
		display:"flex",
		flexDirection:"column",
		justifyContent:"center",
		alignItems:"center",
		gap:"20px",
		[theme.breakpoints.down("md")]: {
			height:"60vh"
		}
	}
});
class SearchProduct extends Component {
    static defaultProps = {
    	value:{
    		search:""
    	},
    	validator:getRequiredValidator("search")
    };
    renderProducts() {
    	const {
    		products,
    		width,
    		uiStore,
    		addItemsToCart,
    		onChangeCartItemsQuantity,
			addOrCreateCartLoading,
    		cart,
    		shop
    	} = this.props;
    	const currencyCode = (shop && shop.currency.code) || "GTQ";
    	if(isWidthDown("sm",width)) return(
    		<SearchProductListMobile
    			items={products}
    			uiStore={uiStore}
				addOrCreateCartLoading={addOrCreateCartLoading}
    			currencyCode = {currencyCode}
    			addItemsToCart={addItemsToCart}
    			onChangeCartItemsQuantity={onChangeCartItemsQuantity}
    			cart={cart}
    		/>
    	);
    	return (
    		<SearchProductListDesktop
    			items={products}
    			uiStore={uiStore}
				addOrCreateCartLoading={addOrCreateCartLoading}
    			currencyCode = {currencyCode}
    			addItemsToCart={addItemsToCart}
    			onChangeCartItemsQuantity={onChangeCartItemsQuantity}
    			cart={cart}
    		/>
    	);
    }
    onSubmit = (value) =>{
    	Router.push(`/product/search?query=${value.search}`);
    }

	backPage = () => Router.push(`/`);

    renderContent() {
    	const { classes,
    		components: { SearchInput },
    		value,
    		validator,
    		awaiting
    	} = this.props;
    	return (
    		<Grid container className={classes.container}>
    			<Grid item xs={12} md={6} className={classes.grid1}>
    				<div className={classes.flexProductColumn}>
    					{awaiting &&(
    						<div className={classes.startFinding}>
    							<CustomText>{"Empieza a escribir para buscar productos"}</CustomText>
    						</div>
    					)}
    					{!awaiting &&(
    						<div className={classes.productColumn}>
    							{this.renderProducts()}
    						</div>
    					)}
    				</div>
    			</Grid>
    			<Grid item xs={12} md={6} className={classes.grid2}>
    				<div className={classes.flexSearcherColumn}>
    					<div className={classes.searcherColumn}>
    						<IconButton onClick={this.backPage}>
    							<CloseIcon />
    						</IconButton>
    						<div className={classes.searchInput}>
    							<CustomTitle>{"¿Qué es lo que estás buscando?"}</CustomTitle>
    							<CustomLabel>{"Escribe aquí el nombre del producto que deseas buscar"}</CustomLabel>
    							<Form
    								onSubmit={this.onSubmit}
    								value={value}
    								validator={validator}
    								revalidateOn="changed"
    							>
    								<SearchInput
    									id="searchInput"
    									name="search"
    									placeholder="Buscar..."
    								/>
    							</Form>
    						</div>
    					</div>
    				</div>
    			</Grid>
    		</Grid>
    	);
    }
    render() {
    	const { shop } = this.props;
    	return (
    		<Layout shop={shop} noMaxwidth>
    			<Helmet>
    				<title>{shop && shop.name}</title>
    				<meta name="description" content={shop && shop.description} />
    			</Helmet>
    			{this.renderContent()}
    		</Layout>
    	);
    }
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

export async function getStaticPaths() {
	return {
		paths: locales.map((locale) => ({ params: { lang: locale } })),
		fallback: false
	};
}
export default withApollo()(withWidth({initialWidth: "md"})(withStyles(styles)(withProducts(withCart(withComponents(SearchProduct))))));