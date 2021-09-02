import React from "react";
import {withStyles} from "@material-ui/core/styles";
import CustomProductCard from "components/CustomProductCard";
const styles = (theme) => ({
	root:{
		width:"100%",
		paddingTop:theme.spacing(2)
	},
	title:theme.typography.title1,
	productList:{
		display:"grid",
		gap:"15px",
		gridAutoFlow:"column",
		paddingTop:"10px",
		overflowX:"scroll",
		// scrollbarWidth:'none',
		justifyContent:"flex-start",
		gridAutoColumns:"minmax(180px,180px)"
	}
});
const RelatedProducts = props => {
	const {classes,relatedProducts,product,cart,onChangeCartItemsQuantity,addItemsToCart,uiStore,currencyCode} = props;
	const products = relatedProducts.filter((item)=>item.node.product.productId!=product.productId)
		.map((item)=>{
			const productInCart = (cart?.items||[]).find((cartItem)=>cartItem.productSlug==item.node.product.slug);
			return{
				...item.node.product,
				cartItem:productInCart
			};
		});
	return(
		<React.Fragment>
			<div className={classes.root}>
				<div className={classes.title}>{"Productos Relacionados"}</div>
				<br></br>
				<div className={classes.productList}>
					{/* {relatedProducts.filter((item)=>item.node.product.productId!=product.productId)
                .map((item)=>< CustomProductCard product={item.node.product}/>)} */}
					{products.map((item, index)=><CustomProductCard 
					    key={`${index}`}
						product={item}
						currencyCode = {currencyCode} 
						addItemsToCart={addItemsToCart}
						onChangeCartItemsQuantity={onChangeCartItemsQuantity}
						uiStore={uiStore}/>)}
				</div>
				{/* <DesktopVerticalScroll {...props}/> */}
			</div>
		</React.Fragment>
	);
};
export default withStyles(styles)(RelatedProducts);