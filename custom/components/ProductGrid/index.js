import React, { Fragment } from 'react';
import { 
    makeStyles,
    Grid,

} from '@material-ui/core';

import ProductCard from '../ProductCard';

const useStyles = makeStyles( theme => ({
    grid: {
        margin: theme.spacing(2, 0)
    }
}));

const ProductGrid = props => {
    const { products } = props;
    const classes = useStyles();

    return (
        <Fragment>
            <Grid
                container
                direction = 'row'
                justify = 'flex-start'
                alignItems = 'center'
                alignContent = 'center'
            >
                {
                    products.map( product => 
                        <Grid
                            item
                            lg = { 4 }
                            md = { 4 }
                            xs = { 12 }
                            className = { classes.grid }
                        >
                            <ProductCard product = { product } />
                        </Grid>    
                    )
                }
            </Grid>
        </Fragment>
    );
};

export default ProductGrid;