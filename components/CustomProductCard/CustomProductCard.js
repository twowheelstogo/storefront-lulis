import React from "react";
import {withStyles} from "@material-ui/core/styles";
import styled from "styled-components";
import {IconButton} from "@material-ui/core";
import {Add as AddIcon, Remove as RemoveIcon} from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import { applyTheme, CustomPropTypes, getRequiredValidator } from "@reactioncommerce/components/utils";
import Link from "components/Link";

const StyledContent = styled.div`
display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  font-size: 14px;
  font-weight:300;
  color: "#7A6240";
`;
const StyledTitle = styled.div`
font-size:16px;
font-weight:700;
color:#000000;
@media (min-width: ${applyTheme("sm", "breakpoints")}px) {
    font-size: 18px;
  }
display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;
const styles = (theme) => ({
	root:{
		background:theme.palette.background.cards,
		width: "auto",
		borderRadius:"14px",
		padding:theme.spacing(1),
		textAlign:"center",
	},
	image:{
		borderRadius:"10px",
	},
	title:theme.typography.title1,
	subtitle:{
		fontSize: 14,
		fontWeight:300,
		color: "#7A6240",
		background:"red",
	},
	header:{
		display:"flex",
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"start"
	},
	badge: {
		width: 20,
		height: 20,
		position:"absolute",
		top: 0,
		right: 0,
		backgroundColor: theme.palette.reaction.badges.product,
		color: theme.palette.primary.main
	}

});
const CustomProductCard = props => {
	const {product,classes} = props;
	const HandleAddItemToCart = async () => {
		const {product,addItemsToCart,uiStore:{openCartWithTimeout},currencyCode} = props;
		const currentVariant = product.variants[0];
		const price =Array.isArray(currentVariant.pricing)? priceByCurrencyCode(currencyCode,currentVariant.pricing):currentVariant.pricing;
		await addItemsToCart([
			{
				price:{
					amount:price.price,
					currencyCode:currencyCode,
				},
				productConfiguration:{
					productId:(product.productId && product.productId) || product._id,
					productVariantId:(currentVariant.variantId && currentVariant.variantId) || currentVariant._id
				},
				quantity:1
			}
		]);
		openCartWithTimeout(3000);
	};
	const HandleRemoveItemToCart = () => {
		const {onChangeCartItemsQuantity,product,uiStore:{openCartWithTimeout}} = props;
		onChangeCartItemsQuantity({
			quantity:product.cartItem.quantity-1,
			cartItemId:product.cartItem._id
		});
		openCartWithTimeout(3000);
	};
	const quantity = product.cartItem!=undefined?product.cartItem.quantity:0;
	const displayPrice = Array.isArray(product.pricing)?product.pricing[0].displayPrice:product.pricing.displayPrice;
    const hostname = typeof window !== "undefined" && (window.location.hostname != "localhost" ? "https://api.qbit01.com" : "http://localhost:3000");
	const media = product.primaryImage && product.primaryImage.URLs && product.primaryImage.URLs.small || ( product.media && `${hostname}${product.media[0].URLs.small}`) || `/images/placeholder.gif`;
	const {slug} = product;
	
	return(
		<React.Fragment>
			<Badge badgeContent={quantity}
				classes={{ badge: classes.badge }}>
				<div className={classes.root}>
					<div className={classes.header}>
						<IconButton size="small" color="primary" 
							disabled={product.cartItem==undefined}
							onClick={HandleRemoveItemToCart}>
							<RemoveIcon/>
						</IconButton>
						<img className={classes.image} src={media} width={75} height={75}/>
						<IconButton size="small" color="primary"
							onClick={HandleAddItemToCart}>
							<AddIcon/>
						</IconButton>
					</div>
					<Link
						href = "/product/[...slugOrId]"
						as = {`/product/${slug}`}>
						<StyledTitle>{product.title}</StyledTitle>
						<StyledContent>{product.description}</StyledContent>
					</Link>
					<StyledTitle>{displayPrice}</StyledTitle>
				</div>
			</Badge>
		</React.Fragment>
	);
};

export default withStyles(styles)(CustomProductCard);