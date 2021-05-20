import React from "react";
import Layout from "components/Layout";
import {withApollo} from "lib/apollo/withApollo";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import Helmet from 'react-helmet';
import { locales } from "translations/config";
import { Grid,Typography,makeStyles,withStyles } from "@material-ui/core";
const useStyles = makeStyles((theme)=>({
	title:{
		color:'#0095b3',
		textAlign:'center',
		marginBottom:'5rem'
	},
	subtitle:{
		color:'#0095b3'
	},
	bodytext:{
		fontSize:'20px',
		fontWeight:'400'
	}
}));
class PoliticsAndDevolutions extends React.Component{
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
				color:"#0095b3",
				textAlign:"center",
				marginBottom:"5rem"
			}}>POLÍTICAS DE DEVOLUCIÓN</h1>
			</Grid>
			<Grid item>
			<h4 className={subtitle} style={{color:'#0095b3'}}>DEVOLUCIÓN/ REEMBOLSO</h4>
            <p>Al tratarse de comida a domicilio, la política de devolución se basa en la resolución de conflictos en el momento de la recepción del pedido. Si existe inconformidad en cuanto a la calidad del producto, contactarse directamente por medio de mensaje directo por Instagram, Whatsapp, mensaje de Facebook, enviando correo por medio de la página web.</p>
            <br></br>
            <blockquote>
                <p>1. El cliente inspeccionara el producto inmediatamente tras su llegada al destino pactado, con el fin de determinar si ha sido dañado durante el transporte.</p>
                <p>2. Si se encontrara un defecto de calidad, el Cliente deberá poner el producto a disposición del Vendedor para ser evaluado. La forma para proceder será contactando a LULIS en un plazo por medio de mensaje directo por Instagram, Whatsapp, mensaje de Facebook, enviando correo por medio de la página web adjuntando fotografías, descripción de incidencia y código de envío. El Vendedor podrá optar entre:</p>
            </blockquote>
            <blockquote>
                <p>a. Sustitución del producto</p>
                <p>b. Reembolso por valor del producto</p>
                <p>c. Reducir el precio en proporción al defecto del producto</p>
            </blockquote>
            <br></br>
            <p>En cualquiera de los escenarios, el Vendedor asumirá los gastos de transporte o sustitución del producto.</p>
            <ul>
                <li>El Vendedor tendrá derecho a investigar el reclamo y solicitar al cliente las pruebas que considere necesarias.</li>
                <li>LULIS se reserva el derecho a cancelar pedidos sin necesidad de alegar causa justa. El Cliente tendrá derecho al reembolso de la cantidad abonada.</li>
            </ul>
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
};

export async function getStaticPaths() {
	return {
		paths: locales.map((locale) => ({ params: { lang: locale } })),
		fallback: false
	};
};

export default withApollo()(withStyles(useStyles)(PoliticsAndDevolutions));