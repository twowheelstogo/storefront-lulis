import React, { Fragment } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet as StyledComponentSheets } from "styled-components";
import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/core/styles";
import favicons from "custom/favicons";
import theme from "custom/reactionTheme";
import definedPaymentMethods from "custom/paymentMethods";
import analyticsProviders from "custom/analytics";

/**
 * For details about the styled-components SSR code in this file, see https://www.styled-components.com/docs/advanced#nextjs
 * _document is only rendered on the server side and not on the client side.
 * Event handlers like onClick can't be added to this file.
 */
class HTMLDocument extends Document {
	render() {
		const links = [
			{ rel: "canonical", href: process.env.CANONICAL_URL },
			{ rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700" },
			...favicons
		];
		const meta = [
			// Use minimum-scale=1 to enable GPU rasterization
			{
				name: "viewport",
				content: "user-scalable=0, initial-scale=1 minimum-scale=1, width=device-width, height=device-height"
			},
			// PWA primary color
			{
				name: "theme-color",
				content: theme.palette.primary.main
			}
		];

		// Analytics & Stripe Elements scripts
		const scripts = [
			...analyticsProviders.map((provider) => ({
				type: "text/javascript",
				innerHTML: provider.renderScript()
			}))
		];
		definedPaymentMethods
			.some((method) => method.name === "stripe_card")
			&& scripts.push({
				type: "text/javascript",
				src: "https://js.stripe.com/v3/"
			});

		scripts.push({
			type: "text/javascript",
			src: `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`
		});

		scripts.push({
			type: "text/javascript",
			innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `
		});

		return (
			<Html lang="en">
				<Head>
					{meta.map((tag, index) => <meta key={index} {...tag} />)}
					{links.map((link, index) => <link key={index} {...link} />)}
				</Head>
				<body>
					<Main />
					<NextScript />
					{scripts.map((script, index) => (script.innerHTML ? /* eslint-disable-next-line */
						<script async key={index} type={script.type} dangerouslySetInnerHTML={{ __html: script.innerHTML }} /> : <script async key={index} {...script} />))}
				</body>
			</Html>
		);
	}
}

HTMLDocument.getInitialProps = async (ctx) => {
	const styledComponentSheet = new StyledComponentSheets();
	const materialUiSheets = new MaterialUiServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	try {
		ctx.renderPage = () => originalRenderPage({
			enhanceApp: (App) => (props) => (
				styledComponentSheet.collectStyles(materialUiSheets.collect(<App {...props} />))
			)
		});
		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: (
				<Fragment key="styles">
					{initialProps.styles}
					{materialUiSheets.getStyleElement()}
					{styledComponentSheet.getStyleElement()}
				</Fragment>
			)
		};
	} finally {
		styledComponentSheet.seal();
	}
};

export default HTMLDocument;
