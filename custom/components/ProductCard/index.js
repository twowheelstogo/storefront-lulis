import React, { useState } from 'react';
import { 
    makeStyles,
    Paper,
    Grid,
    Typography,
    Button
} from '@material-ui/core';

import Link from "components/Link";

const useStyles = makeStyles( theme => ({
    card: {
        width: '95%',
        height: 240,
        // maxHeight: 240,
        padding: theme.spacing(3, 1),
        margin: theme.spacing(0, 1),
        borderStyle:'solid',
        borderWidth:'1px',
        borderColor:'#7A6240'
    },
    showCard: {
        width: '95%',
        height: 240,
        // maxHeight: 240,
        padding: theme.spacing(3, 1),
        margin: theme.spacing(0, 1),
        boxShadow: '2px 2px 14px 0px rgba(0,0,0,0.25)'
    },
    img: {
        width: '90%',
        maxHeight: 160,
        // padding: theme.spacing(0, 1, 3, 1)
    },
    cartButtons: {
        margin: theme.spacing(0, 0, 1, 0)
    },
    productName: {
        color: '#0095b3',
        margin: theme.spacing(1, 2)
    },
    productDescription: {
        color: '#888e8e',
        margin: theme.spacing(1, 2)
    },
    productPrice: {
        color: '#0095b3',
        margin: theme.spacing(1, 2)
    },
    modifyCartButton: {
        color: '#0095b3',
    },
    addToCart: {
        backgroundColor: '#0095b3',
        color: '#ffffff'
    },
    qty: {
        color: '#888e8e',
        margin: theme.spacing(0, 1)
    }
}));

const ProductCard = props => {
    const { product } = props;
    const { slug } = product;
    const [ qty, setQty ] = useState(0);
    const [ show, setShow ] = useState(false);
    const classes = useStyles();

    const addProduct = () => {
        setQty(qty + 1)
    };

    const subtractProduct = () => {
        if(qty > 0) {
            setQty(qty - 1)
        } else {
            setQty(0)
        }
    }

    return (
        <Link
            href = "/product/[...slugOrId]"
            as = {`/product/${slug}`}
        >
            <Paper 
                onMouseOver = { () => setShow(true) }
                onMouseOut = { () => setShow(false) }
                className = { show ? classes.showCard : classes.card }
                elevation={0}
            >
                <Grid
                    container
                    direction = 'row'
                    justify = 'flex-start'
                    alignItems = 'center'
                    alignContent = 'center'
                >
                    <Grid
                        item 
                        md = { 8 }
                        xs = { 8 }
                    >
                        <Grid
                            container
                            direction = 'column'
                            justify = 'flex-start'
                            alignItems = 'flex-start'
                            alignContent = 'flex-start'
                        >
                            <Typography variant = 'h5' className = { classes.productName }>
                                { product.title }
                            </Typography>

                            {/* <Typography variant = 'body1' className = { classes.productDescription }>
                                { product.description }
                            </Typography> */}

                            <Typography variant = 'body2' className = { classes.productPrice}>
                                <strong>{ product.pricing[0].displayPrice }</strong>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        md = { 4 }
                        xs = { 4 }
                    >
                        <Grid
                            container
                            direction = 'column'
                            justify = 'center'
                            alignItems = 'center'
                            alignContent = 'center'
                        >
                            <img 
                                src = { product.primaryImage.URLs.small }
                                className = { classes.img }
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    container
                    direction = 'row'
                    justify = 'flex-start'
                    alignItems = 'center'
                    alignContent = 'center'
                    className = { classes.cartButtons }
                >
                    <Grid
                        item 
                        lg = { 4 }
                        md = { 6 }
                        xs = { 6 }
                    >
                        <Grid
                            container
                            direction = 'row'
                            justify = 'center'
                            alignItems = 'center'
                            alignContent = 'center'
                        >
                            <Grid item>
                                <Button
                                    onClick = { subtractProduct }
                                    className = { classes.modifyCartButton }
                                >
                                    -
                                </Button>
                            </Grid>

                            <Grid item>
                                <Typography variant = 'h6' className = { classes.qty }>
                                    { qty }
                                </Typography>
                            </Grid>
                            
                            <Grid item>
                                <Button
                                    onClick = { addProduct }
                                    className = { classes.modifyCartButton }
                                >
                                    +
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid 
                        item
                        lg = { 4 }
                        md = { 6 }
                        xs = { 6 }
                    >
                        <Button
                            variant = 'contained'
                            className = { classes.addToCart }
                        >
                            AÑADIR AL CARRITO
                        </Button>
                    </Grid>

                </Grid>
            </Paper>
        </Link>
    );
};

export default ProductCard;