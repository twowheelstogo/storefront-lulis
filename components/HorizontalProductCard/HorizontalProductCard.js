import React from "react";
import PropTypes from "prop-types";
import { Grid, IconButton, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";
import styled from "styled-components";
import Link from "components/Link";
import Badge from "@material-ui/core/Badge";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import Router from "translations/i18nRouter";

const StyledContent = styled.div`
display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  font-size: 14px;
  font-weight:300;
  color: "#7A6240";
`;
const StyledTitle = styled.div`
font-size:18px;
font-weight:700;
color:#000000;
display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;
const styles = (theme) => ({
	root: {
		display: "flex",
		flexGrow: 1,
		flexDirection: "row",
		background: theme.palette.background.cards,
		padding: "10px",
		borderRadius: "10px",
	},
	leading: {
		width: "50",
		height: "auto"
	},
	content: {
		width: "100%",
		paddingLeft: "5px",
		paddingRight: "5px",
	},
	trailing: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		marginRight: "0",
		marginLeft: "auto",
	},
	image: {
		borderRadius: "10px"
	},
	title: theme.typography.title1,
	subtitle: {
		fontSize: 14,
		fontWeight: 300,
		color: "#7A6240",
		background: "red",
	},
	controls: {
		display: "flex",
		flexDirection: "row",
	},
	badge: {
		width: 20,
		height: 20,
		top: 0,
		right: 0,
		backgroundColor: theme.palette.reaction.badges.product,
		color: theme.palette.primary.main
	},
	badgeMargin: {
		width: "100%"
	}
});
class HorizontalProductCard extends React.Component {
	constructor(props) {
		super(props);
	}
	static propTypes = {

	}
	async HandleAddItemToCart(props) {
		const { product, addItemsToCart, uiStore: { openCartWithTimeout }, currencyCode } = props;
		const currentVariant = product.variants[0];
		const price = Array.isArray(currentVariant.pricing) ? priceByCurrencyCode(currencyCode, currentVariant.pricing) : currentVariant.pricing;
		await addItemsToCart([
			{
				price: {
					amount: price.price,
					currencyCode: currencyCode,
				},
				productConfiguration: {
					productId: (product.productId && product.productId) || product._id,
					productVariantId: (currentVariant.variantId && currentVariant.variantId) || currentVariant._id
				},
				quantity: 1
			}
		]);
		openCartWithTimeout(3000);

	}
	HandleRemoveItemToCart(props) {
		const { onChangeCartItemsQuantity, product, uiStore: { openCartWithTimeout } } = props;
		onChangeCartItemsQuantity({
			quantity: product.cartItem.quantity - 1,
			cartItemId: product.cartItem._id
		});
		openCartWithTimeout(3000);
	}
	render() {
		const { classes, product, addOrCreateCartLoading } = this.props;
		const { slug } = product;
		const quantity = product.cartItem != undefined ? product.cartItem.quantity : 0;
		const displayPrice = Array.isArray(product.pricing) ? product.pricing[0].displayPrice : product.pricing.displayPrice;
		const hostname = (typeof window !== "undefined" && (window.location.hostname != "localhost" ? "https://api.lulisgt.com" : "http://localhost:3000")) || "https://api.lulisgt.com";
		const media = ((product?.primaryImage && product?.primaryImage.URLs.small) || (product.media && product.media.length && `${hostname}${product?.media[0].URLs.small}`)) || `/images/placeholder.gif`;

		return (
			<React.Fragment>
				<Badge badgeContent={quantity}
				className={classes.badgeMargin}
					classes={{ badge: classes.badge }}>
					<div className={classes.root}>
						<div className={classes.leading}>
							<img className={classes.image} src={media} width={95} height={95} />
						</div>
						<div className={classes.content}>
							<Link
								href={product.productType != "bundle" ? "/product/[...slugOrId]" : "/bundle/[productId]"}
								as={product.productType != "bundle" ? `/product/${slug}` : `/bundle/${product.productId}`}>
								<StyledTitle>{product.title}</StyledTitle>
								<StyledContent>{product.pageTitle}</StyledContent>
							</Link>
						</div>
						<div className={classes.trailing}>
							<div className={classes.title} style={{ display: "flex", justifyContent: "flex-end" }}>{displayPrice}</div>
							{product.productType == null && (
								<div className={classes.controls}>
									<IconButton size="small" color="primary" disabled={product.cartItem == undefined} onClick={() => this.HandleRemoveItemToCart(this.props)}>
										<RemoveIcon />
									</IconButton>
									<IconButton size="small" color="primary" disabled={addOrCreateCartLoading} onClick={() => this.HandleAddItemToCart(this.props)}>
										<AddIcon />
									</IconButton>
								</div>
							)}
							{product.productType == "bundle" && (
								<div className={classes.controls}>
									<Button
										color="primary"
										onClick={() => { Router.push(`/bundle/${product.productId}`) }}
									>
										{"Agregar"}
									</Button>
								</div>
							)}
						</div>
						<div></div>
					</div>
				</Badge>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(HorizontalProductCard);