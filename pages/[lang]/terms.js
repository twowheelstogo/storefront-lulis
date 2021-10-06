import React from "react";
import Layout from "components/CustomLayout";
import {withApollo} from "lib/apollo/withApollo";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import Helmet from "react-helmet";
import { locales } from "translations/config";
import { Grid,Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme)=>({
	title:{
		color:"#8ce0c9",
		textAlign:"center",
		marginBottom:"5rem"
	},
	subtitle:{
		color:"#8ce0c9"
	},
	bodytext:{
		fontSize:"20px",
		fontWeight:"400"
	}
});
class TermsAndConditions extends React.Component{
	render(){
		const {shop,classes:{title,subtitle,bodytext}} = this.props;
		return(
			<Layout shop={shop}>
				<Helmet>
					<title>{shop && shop.name}</title>
					<meta name="description" content={shop && shop.description} />
				</Helmet>
				<Grid
					container
					direction="column"
					textAlign="center">
					<Grid item
						justifyContent="center">
						<h1 className={title} style={{
							color:"#8ce0c9",
							textAlign:"center",
							marginBottom:"5rem"
						}}>TÉRMINOS Y CONDICIONES</h1>
					</Grid>
					<Grid item>
						<h4 className={subtitle} style={{color:"#8ce0c9"}}>Precios</h4>
						<ol type="1">
							<li className={bodytext}>Todos los precios se muestran como precios finales, es decir con cualquier impuesto o derecho relativo a la venta ya incluido.</li>
							<li className={bodytext}>El precio definitivo será el aplicable en la fecha de aceptación de pedido. Precios en cotizaciones, estimaciones u otros documentos por el Vendedor no son vinculantes para este.</li>
							<li className={bodytext}>El Vendedor podrá modificar precios entre fechas de aceptación de pedido y la de pago en los siguientes supuestos:
								<ol>
									<li>Variación de los precios de materia prima o de condiciones de suministro.</li>
									<li>Gastos adicionales al producto o a su suministro.</li>
								</ol>
							</li>
						</ol><h4 className={subtitle} style={{color:"#8ce0c9"}}>Pago y Garantías</h4>
						<ol type="1">
							<li className={bodytext}>El pago del producto se realiza por adelantado por medio de transferencia o con tarjeta de crédito o débito.</li>
							<li className={bodytext}>El pago no se entenderá efectuado hasta el ingreso efectivo de la cantidad correspondiente en la cuenta bancaria del Vendedor.</li>
							<li className={bodytext}>El pago del precio se hará efectivo en su totalidad, no admitiéndose pagos parciales.</li>
							<li className={bodytext}>El Vendedor tendrá derecho a retener el pedido por tiempo ilimitado si el pago no se ha realizado, o hasta que se compruebe el mismo.</li>
						</ol>
					</Grid>
				</Grid>
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

export default withApollo()(withStyles(useStyles)(TermsAndConditions));