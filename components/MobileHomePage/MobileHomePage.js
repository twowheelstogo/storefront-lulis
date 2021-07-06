import React from "react";
import {withStyles} from "@material-ui/core/styles"
import ProductGrid from "custom/components/ProductGrid";
import CatalogNavItems from "components/CatalogNavItems";
const styles = (theme) => ({
    root:{

    },
    productList:{
        padding:theme.spacing(2)
    }
});
const MobileHomePage = (props)=>{
        const  {
            catalogItems,
            tags,
            classes
        } = props;
        return(
            <React.Fragment>
                <CatalogNavItems tags={tags}/>
                <div className={classes.productList}>
                <ProductGrid products ={catalogItems.map((item)=>item.node.product)}/>
                </div>
            </React.Fragment>
        );
}

export default withStyles(styles)(MobileHomePage);