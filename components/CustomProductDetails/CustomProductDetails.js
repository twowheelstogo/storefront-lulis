import React, { useState,useEffect } from "react";
import {Grid,IconButton} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import RelatedProducts from "components/RelatedProducts";
import RoundedButton from "components/RoundedButton";
import styled from "styled-components";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import variantById from "lib/utils/variantById";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import inject from "hocs/inject";
import Router from "translations/i18nRouter";



const CustomProductTitle = styled.div`
   font-size:36px;
   font-weight:600;
   color:#000000;
   display: -webkit-box;
     -webkit-line-clamp: 1;
     -webkit-box-orient: vertical;  
     overflow: hidden;
`;
const styles = (theme) => ({
	root:{
		paddingTop:theme.spacing(10),
		paddingLeft:theme.spacing(2),
		paddingRight:theme.spacing(2),
	},
	image:{
		margin:"auto",
		display:"block",
	},
	imgContainer:{
		[theme.breakpoints.up("md")]:{
			minHeight: "50vh"
		}
	},
	content:{
		width:"100%",
		// background:'red',
		height:"100%",
		display:"flex",
		flexDirection:"column",
		justifyContent:"space-between"
	},
	headerContent:{
		display:"flex",
		flexDirection:"row",
		justifyContent:"space-between",
		marginTop:"auto",
		marginBottom:"auto",
		alignItems:"center"
	},
	title: {
		fontSize:36,
		fontWeight:600,
		color:theme.palette.primary.main
	},
	subtitle:theme.typography.subtitle3,
	favoriteIcon:{
		color:theme.palette.primary.main
	},
	description:{
		fontSize:"16px",
		color:"black"
	},
	controls:{
		display:"flex",
		flexDirection:"row",
		justifyContent:"flex-end",
		gap:"10px",
		alignItems:"center"
	},
	centerControls:{
		display:"flex",
		flexDirection:"row",
		justifyContent:"center",
		gap:"10px",
		alignItems:"center",
		paddingTop:theme.spacing(2)
	},
	removeButton:{
		background:theme.palette.primary.main,
		color:"white",
		borderRadius:"10px",
		width:"36px",
		height:"36px"

	},
	addButon:{
		background:theme.palette.secondary.light,
		color:"white",
		borderRadius:"10px",
		width:"36px",
		height:"36px"
	},
	bottom:{
		display:"flex",
		flexDirection:"row",
		justifyContent:"flex-end",
		width:"100%",
		// background:'green'
	}
});
const CustomProductDetails = props => {
	const theme = useTheme();
	const matches= useMediaQuery(theme.breakpoints.down("sm"));
	const [quantity,setQuantity] = useState(1);
	const { classes,
		product,
		relatedProducts,cart,addItemsToCart,onChangeCartItemsQuantity,uiStore,currencyCode} = props;
	const relatedProps = {product,relatedProducts,cart,addItemsToCart,onChangeCartItemsQuantity,uiStore,currencyCode};
	delete relatedProducts.classes;
	useEffect(()=>{
		const { product, uiStore } = props;
		const variant =product.variants[0];
		// Select the variant, and if it has options, the first option
		const variantId = variant._id;
		let selectOptionId;
		if (!selectOptionId && variant.options && variant.options.length) {
			selectOptionId = variant.options[0]._id;
		}

		uiStore.setPDPSelectedVariantId(variantId, selectOptionId);

		Router.replace("/product/[...slugOrId]", `/product/${product.slug}/${selectOptionId || variantId}`);
	},[]);
	const handleChange = (count) => setQuantity(quantity+count);
	const handleAddToCart = async () => {
		const {
			addItemsToCart,
			currencyCode,
			product,
			uiStore: { openCartWithTimeout, pdpSelectedOptionId, pdpSelectedVariantId },
			width
		} = props;
      
		// Get selected variant or variant option
		const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
		const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
		const selectedVariantOrOption = selectedOption || selectedVariant;
      
		if (selectedVariantOrOption) {
			// Get the price for the currently selected variant or variant option
			const price = priceByCurrencyCode(currencyCode, selectedVariantOrOption.pricing);
      
			// Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema
			await addItemsToCart([
				{
					price: {
						amount: price.price,
						currencyCode
					},
					productConfiguration: {
						productId: product.productId, // Pass the productId, not to be confused with _id
						productVariantId: selectedVariantOrOption.variantId // Pass the variantId, not to be confused with _id
					},
					quantity
				}
			]);
		}
		//   if (isWidthUp("md", width)) {
		//     // Open the cart, and close after a 3 second delay
		//     openCartWithTimeout(3000);
		//   }
		openCartWithTimeout(3000);
		// Router.push("","")
	};
	const currentProduct = (cart?.items||[]).find(item=>item.productSlug==product.slug);
	const currentQuantity = currentProduct ? currentProduct.quantity : 0;
	const subtotal = `Q${Number(product.pricing[0].maxPrice*quantity).toFixed(2)}`;
	const hostname = typeof window !== "undefined" && (window.location.hostname != "localhost" ? "https://api.qbit01.com" : "http://localhost:3000");
	const media = product.primaryImage && product.primaryImage.URLs ? product.primaryImage.URLs.small.replace("jpg","png"):`${hostname}/resources/placeholder.gif`;
	return(
		<React.Fragment>
			<div className={classes.root}>
				<Grid container>
					<Grid item lg={6} xs={12}>
							<div className={classes.imgContainer}>
							<img src={media}  className={classes.image}/>
							</div>
					</Grid>
					<Grid item lg={6} xs={12}>
						<div className={classes.content}>
							<div>
								<div className={classes.headerContent}>
									{/* <CustomProductTitle>{product.title}</CustomProductTitle> */}
									<div className={classes.title}>{product.title}</div>
									<IconButton>
										<FavoriteIcon className={classes.favoriteIcon}/>
									</IconButton>
								</div>
								<div className={classes.subtitle}>{product.pricing[0].displayPrice}</div>
								<br></br>
								<div className={classes.description}>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at diam lectus. Nullam ultricies metus nec turpis aliquet ullamcorper. Aenean dolor justo, imperdiet nec ligula ut, cursus porta lacus. Donec eu ornare velit. Fusce sit amet ipsum sit amet odio mollis rhoncus eget nec justo. Aenean facilisis ullamcorper sodales. Pellentesque pretium at risus in tincidunt. Vestibulum est felis, malesuada sed odio vitae, rhoncus bibendum mi. Sed vitae egestas lectus. Fusce vel fermentum metus. "}</div>
							</div>
							<br></br>
							<div className={!matches?classes.controls:classes.centerControls}>
								<IconButton className={classes.removeButton} onClick={()=>handleChange(-1)} disabled={quantity==0}>
									<RemoveIcon/>
								</IconButton>
								<div className={classes.title}>{quantity}</div>
								<IconButton className={classes.addButon} onClick={()=>handleChange(1)}>
									<AddIcon/>
								</IconButton>
							</div>
						</div>
					</Grid>
					<Grid item xs={12}>
						<RelatedProducts {...relatedProps}/>
					</Grid>
					<div className={classes.bottom}>
						<Grid
							item
							xs={12}
							lg={4}>
							<br></br>
							<br></br>
							<RoundedButton onClick={handleAddToCart} buttonTitle={currentQuantity>0?"Agregar más al carrito": "Agregar al carrito"} buttonSubtitle={quantity!=1?`${quantity} items por ${subtotal}`:`${quantity} item por ${subtotal}`}/>
						</Grid>
					</div>
				</Grid>
			</div>
		</React.Fragment>
	);
};
export default withWidth({ initialWidth: "md" })(withStyles(styles, { withTheme: true })(inject("routingStore", "uiStore")(CustomProductDetails)));
