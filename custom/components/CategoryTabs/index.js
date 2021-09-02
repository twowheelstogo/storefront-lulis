import React, { Fragment, useState } from "react";
import CategoryLayout from "components/CategoryLayout";

const CategoryTabs = props =>  {
	const [ tab, setTab ] = useState(0);


	const {
		catalogItems,
		tags,
		cart,
		addItemsToCart,
		onChangeCartItemsQuantity,
		currencyCode
	} = props;
	return(
		<Fragment>
			{/* <ProductGrid products = {products} />  */}
			{(tags||[]).map((item,i)=>{
				const products = (catalogItems||[]).filter((element)=>{
					return element.node.product.tagIds.find((ids)=>ids==item._id)!=undefined;
				}).map((value)=>{
					const productInCart = (cart?.items||[]).find((cartItem)=>cartItem.productSlug==value.node.product.slug);
					return{
						...value.node.product,
						cartItem:productInCart
					};
				});
				return products.length>0?<CategoryLayout 
					key={`${i}`}
					title={item.displayTitle}
					currencyCode = {currencyCode}
					products={products}
					addItemsToCart={addItemsToCart}
					onChangeCartItemsQuantity={onChangeCartItemsQuantity}/>:<div key={`${i}`}></div>;
			})}
		</Fragment>
	);
};

export default CategoryTabs;