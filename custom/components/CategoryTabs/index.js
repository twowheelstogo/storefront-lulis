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
        sortBy
    } = props;

    const products = (catalogItems || []).map((item) => item.node.product);
    
    products.map( product => {
        if(categories.includes(product.metafields[0].value)) {
            productsByCategories.map( category => {
                if(category.name === product.metafields[0].value) {
                    category.products.push(product);
                };
            });
        } else {
            categories.push(product.metafields[0].value);

            productsByCategories.push({
                name: product.metafields[0].value,
                products: [ product ] 
            });
        };
    });

    return(
        <Fragment>
            {
                isLoadingCatalogItems ? (
                    <PageLoading />
                ) : (
                    <div className = { classes.bg }>
                        <AppBar 
                            position = 'static' 
                            color = 'transparent'
                            className = { classes.appbarBG }
                        >
                            <Tabs 
                                value = { tab } 
                                onChange = { handleTabChange }
                                aria-label = "simple tabs"
                            >
                                {
                                    categories.map( category => 
                                        <Tab label = { category } />    
                                    )
                                }
                            </Tabs>
                        </AppBar>

                        {
                            tab === 0 && (
                                <ProductGrid products = { productsByCategories[0].products } />    
                            )
                        }

                        {
                            tab === 1 && (
                                <ProductGrid products = { productsByCategories[1].products } />    
                            )
                        }

{
                            tab === 2 && (
                                <ProductGrid products = { productsByCategories[2].products } />    
                            )
                        }
                    </div>
                )
            }
        </Fragment>
    );
};

export default CategoryTabs;