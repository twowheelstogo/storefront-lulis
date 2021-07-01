import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ProductGrid from "custom/components/ProductGrid";

const styles = (theme)=>({
    title:{
        color:"#7A6240",
        fontSize:35,
        fontWeight:'800'
    },
    divider:{
        color:"#7A6240",
        borderTop:'1px solid #7A6240',
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
        const {classes,title,products} = this.props;
        return(
            <React.Fragment>
                <div className={classes.title}>
                <p>{title}</p>
                <hr className={classes.divider}></hr>
                </div>
                <div className={classes.content}>
                    <ProductGrid products={products}/>
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(CategoryLayout);