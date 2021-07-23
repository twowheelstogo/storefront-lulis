import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ProductGrid from "custom/components/ProductGrid";

const styles = (theme)=>({
    title:{
        color:theme.palette.secondary.main,
        fontSize:36,
        fontWeight:'700'
    },
    divider:{
        color:theme.palette.secondary.main,
        borderTop:theme.palette.borders.secondary,
        borderRadius:5
    },
    content:{

    }
})
class CategoryLayout extends React.Component{
    static propTypes={
        title:PropTypes.string.isRequired,
        products:PropTypes.array.isRequired 
    }
    render(){
        const {classes,title,products,addItemsToCart,onChangeCartItemsQuantity} = this.props;
        return(
            <React.Fragment>
                <div className={classes.title}>
                <p>{title}</p>
                <hr className={classes.divider}></hr>
                </div>
                <div className={classes.content}>
                    <ProductGrid products={products} addItemsToCart={addItemsToCart}
                    onChangeCartItemsQuantity={onChangeCartItemsQuantity}/>
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(CategoryLayout);