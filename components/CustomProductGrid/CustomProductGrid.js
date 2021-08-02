import React from "react";
import {Grid} from "@material-ui/core";
import ProductCard from "components/HorizontalProductCard";
import {withStyles} from "@material-ui/core/styles";
const styles = (theme)=>({
	grid: {
		margin: theme.spacing(2, 0)
	}
});
class CustomProductGrid extends React.Component{
	render(){
		const {classes} = this.props;
		return(
			<React.Fragment>
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
								<ProductCard product = { product } />
							</Grid>    
						)
					}
				</Grid>
			</React.Fragment>
		);
	}
}
export default (styles)(CustomProductGrid);