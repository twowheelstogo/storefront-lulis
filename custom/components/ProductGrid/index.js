import React, { Fragment } from 'react';
import { 
    makeStyles,
    Grid,
    
} from '@material-ui/core';

import ProductCard from 'components/HorizontalProductCard';
import inject from "hocs/inject";
const useStyles = makeStyles( theme => ({
    grid: {
        margin: theme.spacing(0, 0)
    }
}));

const ProductGrid = props => {
    const { products,addItemsToCart,onChangeCartItemsQuantity,currencyCode,uiStore } = props;
    const classes = useStyles();

    return (
        <Fragment>
            <Grid
                container
                direction = 'row'
                justify = 'flex-start'
                alignContent = 'center'
                spacing={1}
            >
                {
                    products.map( product => 
                        <Grid
                            item
                            lg = { 3 }
                            md = { 4 }
                            sm={6}
                            xs = { 12 }
                            className = { classes.grid }
                        >
                            <ProductCard
                            currencyCode = {currencyCode}
                            uiStore = {uiStore}
                            product = { product } addItemsToCart={addItemsToCart}
                            onChangeCartItemsQuantity={onChangeCartItemsQuantity}/>
                        </Grid>    
                    )
                }
            </Grid>
        </Fragment>
    );
};

export default inject("uiStore")(ProductGrid);