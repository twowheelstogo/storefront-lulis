import React, { Fragment, useState } from 'react';
import {
    makeStyles,
} from '@material-ui/core';

import CategoryLayout from 'components/CategoryLayout';
const useStyles = makeStyles( theme => ({
    bg: { 
        // backgroundColor: '#e8fbff',
        // width: '100vw',
        padding: theme.spacing(1, 2),
        margin: theme.spacing(0)
    },
    appbarBG: {
        // backgroundColor: '#ffffff',
        color: '#0095b3',
        boxShadow: '0px 0px 0px 0px'
    }
}));

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
            {(tags||[]).map(item=>{
                const products = (catalogItems||[]).filter((element)=>{
                    return element.node.product.tagIds.find((ids)=>ids==item._id)!=undefined;
                }).map((value)=>{
                    const productInCart = (cart?.items||[]).find((cartItem)=>cartItem.productSlug==value.node.product.slug);
                        return{
                            ...value.node.product,
                            cartItem:productInCart
                        }
                });
                return products.length>0?<CategoryLayout 
                title={item.displayTitle}
                currencyCode = {currencyCode}
                products={products}
                addItemsToCart={addItemsToCart}
                onChangeCartItemsQuantity={onChangeCartItemsQuantity}/>:<div></div>
            })}
        </Fragment>
    );
};

export default CategoryTabs;