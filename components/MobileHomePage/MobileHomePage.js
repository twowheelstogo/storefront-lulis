import React,{useState} from "react";
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
        const [selected,SetSelected] = useState(tags[0]||null);
        const products = catalogItems.filter((element=>{
            return element.node.product.tagIds.find((ids)=>ids==selected?._id)!=undefined
        })).map((item)=>item.node.product)
        return(
            <React.Fragment>
                <CatalogNavItems tags={tags} selected={selected} SetSelected={SetSelected}/>
                <div className={classes.productList}>
                <ProductGrid products ={products}/>
                </div>
            </React.Fragment>
        );
}

export default withStyles(styles)(MobileHomePage);