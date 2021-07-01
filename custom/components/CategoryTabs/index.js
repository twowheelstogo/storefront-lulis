import React, { Fragment, useState } from 'react';
import {
    makeStyles,
    Typography,
    Grid,
    AppBar,
    Tabs,
    Tab,
} from '@material-ui/core';

import CatalogGrid from "@reactioncommerce/components/CatalogGrid/v1";
import PageLoading from 'components/PageLoading';
import PageStepper from "components/PageStepper";
import PageSizeSelector from "components/PageSizeSelector";
import SortBySelector from "components/SortBySelector";
import ProductGrid from "../ProductGrid";
import CategoryLayout from 'components/CategoryLayout';
const useStyles = makeStyles( theme => ({
    bg: { 
        // backgroundColor: '#e8fbff',
        // width: '100vw',
        padding: theme.spacing(1, 2),
        margin: theme.spacing(0)
    },
    appbarBG: {
        // backgroundColor: '#ffffff',
        color: '#0095b3',
        boxShadow: '0px 0px 0px 0px'
    }
}));

const CategoryTabs = props =>  {
    const [ tab, setTab ] = useState(0);
    const classes = useStyles();
    let categories = [];
    let productsByCategories = [];

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    }

    const {
        catalogItems,
        currencyCode,
        isLoadingCatalogItems,
        pageInfo,
        pageSize,
        setPageSize,
        setSortBy,
        sortBy,
        tags
    } = props;
    console.log(tags);
    return(
        <Fragment>
            {/* <ProductGrid products = {products} />  */}
            {(tags||[]).map(item=>{
                const products = (catalogItems||[]).filter((element)=>{
                    return element.node.product.tagIds.find((ids)=>ids==item._id)!=undefined;
                }).map((value)=>value.node.product);
                return products.length>0?<CategoryLayout 
                title={item.displayTitle}
                products={products}/>:<div></div>
            })}
        </Fragment>
    );
};

export default CategoryTabs;