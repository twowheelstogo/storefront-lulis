import React from "react";
import MainLayout from "components/MainLayout";
import { withApollo } from "lib/apollo/withApollo";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import Helmet from "react-helmet";
import { locales } from "translations/config";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
const useStyles = (theme) => ({
	title: {
		color: "#8ce0c9",
		textAlign: "center",
		marginBottom: "5rem"
	},
	subtitle: {
		color: theme.palette.primary.light
	},
	bodytext: {
		fontSize: "20px",
		fontWeight: "400"
	},
	image: {

	},
	content: {
		margin: "auto",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
	}
});
class About extends React.Component {
    static propTypes = {
    	shop: PropTypes.object,
    	classes: PropTypes.shape({
    		content: PropTypes.any
    	})
    }
    render() {
    	const { shop, classes: { content } } = this.props;
    	return (
    		<MainLayout shop={shop}
    			title="SOBRE NOSOTROS"
    			subtitle=""
    			type="image"
    			background="https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2Fezgif.com-gif-maker(2).png?alt=media&token=e1c9e79f-4977-4288-9fd5-7737dc96e268s">
    			<Helmet>
    				<title>{shop && shop.name}</title>
    				<meta name="description" content={shop && shop.description} />
    			</Helmet>
    			<Grid
    				container
    				justifyContent="center"
    				style={{ padding: "5% 10%" }}>
    				<Grid item xs={12} sm={6}>
    					<img src="https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2Fabout.PNG?alt=media&token=782a9eee-dcb6-487d-bff1-97d9ab653ffe" width="100%"></img>
    				</Grid>
    				<Grid item xs={12} sm={6} style={{ margin: "auto", paddingLeft: "5%", paddingRight: "5%", textAlign: "center" }}>
    					<div className={content}>
    						<h2 style={{
    							color: "#8ce0c9"
    						}}>Todos sabemos el nivel de felicidad que nos hace sentir una Lulis!!</h2>
    						<p style={{
    							color: "#8ce0c9"
    						}}>Ese olor de galletas en el horno hace feliz a todos los que están en la casa,
                                incluse los que pasan enfrente ;)</p>
    						<p style={{
    							color: "#8ce0c9"
    						}}>Hemos dedicado años de nuetras vidas para llegar a lo que hoy conocemos como Lulis, donde
                                día a día creamos nuevas opciones para que tu y todos a tu alrededor disfruten ;)</p>
    						<br></br>
    						<p style={{
    							color: "#8ce0c9"
    						}}>Lots of love & lots of cookies,</p>
    						<p style={{
    							color: "#8ce0c9"
    						}}>Team Lulis</p>
    					</div>
    				</Grid>
    			</Grid>
    		</MainLayout>
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

export default withApollo()(withStyles(useStyles)(About));