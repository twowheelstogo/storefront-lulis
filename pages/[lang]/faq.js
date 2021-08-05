import React from "react";
import Layout from "components/CustomLayout";
import {withApollo} from "lib/apollo/withApollo";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import Helmet from "react-helmet";
import { locales } from "translations/config";
import { Grid,Typography } from "@material-ui/core";
import withQuestions from "containers/faq/withQuestions";
import CustomAccordion from "custom/components/CustomAccordion";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme)=>({
	title:{
		color:"#0095b3",
		textAlign:"center",
		marginBottom:"5rem"
	},
	subtitle:{
		color:"#0095b3"
	},
	bodytext:{
		fontSize:"20px",
		fontWeight:"400"
	},
	textContainer:{

	},
	imageContainer:{

	}
});
class FrequentAskedQuestions extends React.Component{
	render(){
		const {shop,classes:{title,subtitle,bodytext},questions} = this.props;
		return(
			<Layout shop={shop}>
				<Helmet>
					<title>{shop && shop.name}</title>
					<meta name="description" content={shop && shop.description} />
				</Helmet>
				<Grid
					container
					direction="column"
					justifyContent="center">
					<Grid item
						justifyContent="center">
						<h1 className={title} style={{
							color:"#0095b3",
							textAlign:"center",
							marginBottom:"5rem"
						}}>PREGUNTAS FRECUENTES</h1>
					</Grid>
					{/* main content */}
					<Grid
						container
						justifyContent="center"
						direction="column"
						style={{padding:"0 10%"}}>
						{questions.sections.map((section)=>{
							return (
								<Grid item>
									<CustomAccordion {...section} key={section.id}/>
								</Grid>
							);
						})}
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

export default withApollo()(withStyles(useStyles)(withQuestions(FrequentAskedQuestions)));