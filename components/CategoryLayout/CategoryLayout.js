import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ProductGrid from "custom/components/ProductGrid";

const styles = (theme)=>({
    title:{

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
                </div>
                <div className={classes.content}>
                    <ProductGrid products={products}/>
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(CategoryLayout);