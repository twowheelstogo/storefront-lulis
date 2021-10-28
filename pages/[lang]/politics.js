import React from "react";
import Layout from "components/CustomLayout";
import { withApollo } from "lib/apollo/withApollo";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import Helmet from "react-helmet";
import { locales } from "translations/config";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	title: {
		color: "#8ce0c9",
		textAlign: "center",
		marginBottom: "5rem"
	},
	subtitle: {
		color: "#8ce0c9"
	},
	bodytext: {
		fontSize: "20px",
		fontWeight: "400"
	}
}));
class PoliticsAndDevolutions extends React.Component {
	render() {
		const { shop, classes: { title, subtitle, bodytext } } = this.props;
		return (
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
							color: "#8ce0c9",
							textAlign: "center",
							marginBottom: "5rem"
						}}>POLÍTICAS DE DEVOLUCIÓN</h1>
					</Grid>
					<Grid item>
						<h4 className={subtitle} style={{ color: "#8ce0c9" }}>DEVOLUCIÓN/ REEMBOLSO</h4>
						<p>Al tratarse de comida a domicilio, la política de devolución se basa en la resolución de conflictos en el momento de la recepción del pedido. Si existe inconformidad en cuanto a la calidad del producto o de la orden, contactarse directamente por whatsapp +502 4548-5624 ese mismo día. </p>
						<br></br>
						<blockquote>
								<p>1. El cliente inspeccionara el producto inmediatamente tras su llegada al destino pactado, con el fin de determinar si ha sido dañado durante el transporte.</p>
							<blockquote>
								<p>a. Si se encontrara un defecto de calidad, el Cliente deberá poner el producto a disposición del Vendedor para ser evaluado. La forma para proceder será contactando a LULIS por medio de correo electrónico, adjuntando fotografías, descripción de incidencia y código de envío. El  Vendedor podrá optar entre:</p>
								<blockquote>
									<p>i. Sustitución del producto</p>
									<p>ii. Reembolso por valor del producto</p>
								</blockquote>
							</blockquote>
						</blockquote>
						<blockquote>
							<p>Procedimiento de entrega (lulisgt.com). El pedido será entregado a través de una empresa de logística tercera contratada por Lulis. El procedimiento será el siguiente:</p>
							<blockquote>
								<p>a. Piloto llega al destino y procede a comunicarse con el cliente, de no lograr comunicarse se esperan 10 minutos. Si transcurren los 10 minutos y no hay respuesta el repartidor se comunica con el área de servicio al cliente para darle seguimiento correspondiente. Esta área se comunicará con el cliente por la villa donde realizaron su pedido. Si no se logra comunicación después de 30 minutos el repartidor se retira del destino y el producto regresa a tienda.</p>
								<blockquote>
									<p>i. Si el cliente desea su pedido nuevamente con gusto se puede enviar pagando el envió nuevamente.</p>
								</blockquote>
							</blockquote>
						</blockquote>
						<blockquote>
							<p>Aplicaciones</p>
							<blockquote>
								<p>a. Reclamos de ordenes realizadas por medio de las aplicaciones (Hugo, Pedidos Ya o Uber) deben ser tratadas directamente con la aplicación utilizada.</p>
							</blockquote>
						</blockquote>
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

export default withApollo()(withStyles(useStyles)(PoliticsAndDevolutions));