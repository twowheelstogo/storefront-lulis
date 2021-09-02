import React, { Fragment } from "react";
import { 
	Grid,
    
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ProductCard from "components/HorizontalProductCard";
import inject from "hocs/inject";
const useStyles = makeStyles( theme => ({
	grid: {
		margin: theme.spacing(0, 0)
	},
	center:{
		margin: "auto",
		width: "100%",
		height: "100%",
		textAlign: "center"
	}
}));

const ProductGrid = props => {
	const { products,addItemsToCart,onChangeCartItemsQuantity,currencyCode,uiStore } = props;
	const classes = useStyles();
	if(products.length == 0) return (
		<Fragment>
			<div className={classes.center}>{"No hay coincidencias"}</div>
		</Fragment>
	);
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
					products.map( (product, index) => 
						<Grid
							item
							key={`${index}`}
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