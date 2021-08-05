import React,{useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import ProductGrid from "custom/components/ProductGrid";
import CatalogNavItems from "components/CatalogNavItems";
const styles = (theme) => ({
	root:{

	},
	productList:{
		padding:theme.spacing(2)
	}
});
const MobileHomePage = (props)=>{
	const  {
		catalogItems,
		tags,
		classes,
		cart,
		addItemsToCart,
		onChangeCartItemsQuantity,
		currencyCode,
		slugStore:{handleSlugSelected, handleTagSelected, currentTag}
	} = props;
	const [selected,SetSelected] = useState(currentTag||tags[0]);
	const handleChange = (value) => {
		SetSelected(value);
			handleSlugSelected({
			title: value.displayTitle,
			background: value.heroMediaUrl || "https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2Fprincipal.png?alt=media&token=f54afab0-0e72-4590-a711-20f72204938f"
		});
		handleTagSelected(value)
	}
	const products = catalogItems.filter((element=>{
		return element.node.product.tagIds.find((ids)=>ids==selected?._id)!=undefined;
	})).map((item)=>{
		const productInCart = (cart?.items||[]).find((cartItem)=>cartItem.productSlug==item.node.product.slug);
		return{
			...item.node.product,
			cartItem:productInCart
		};
	});
	return(
		<React.Fragment>
			<CatalogNavItems tags={tags} selected={selected} SetSelected={handleChange}/>
			<div className={classes.productList}>
				<ProductGrid 
					currencyCode = {currencyCode}
					products ={products} addItemsToCart={addItemsToCart} onChangeCartItemsQuantity={onChangeCartItemsQuantity}/>
			</div>
		</React.Fragment>
	);
};

export default withStyles(styles)(MobileHomePage);