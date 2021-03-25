import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Carousel from 'custom/components/Carousel';
import ShowImage from 'custom/components/ShowImage';
import CategoryTabs from 'custom/components/CategoryTabs';
import ProductGrid from 'components/ProductGrid';
// import PageLoading from 'components/PageLoading';

const styles = makeStyles( theme => ({
    homepage: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing.unit * 2
    },
    images: {
        width: '100%',
        height: 'auto',
        maxWidth: 400
    },
    title: {
        color: '#0095b3',
        fontWight: 500,
    },
    imagesContainer: {
        marginTop: '10vh',
        marginBottom: '10vh'
    }
}));

const HomePage = props => {
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

    const classes = styles();

    return (
        <Fragment>
            {/* <Carousel /> */}

            <Grid
                container
                direction = 'row'
                justify = 'center'
                alignItems = 'center'
                alignContent = 'center'
                className = { classes.imagesContainer }
            >
                <Grid
                    item 
                    md = { 6 }
                    xs = { 12 }
                >
                     <Grid
                            container
                            direction = 'column'
                            justify = 'center'
                            alignItems = 'center'
                            alignContent = 'center'
                        >
                            <img 
                                src = 'https://cdn.shopify.com/s/files/1/0471/9814/2623/files/Lulis_web_22_503x.jpeg?v=1599172549'
                            />
                        </Grid>
                </Grid>

                <Grid
                    item
                    md = { 6 }
                    xs = { 12 }
                >
                    <Grid
                        container
                        direction = 'column'
                        justify = 'flex-start'
                        alignItems = 'flex-start'
                        alignContent = 'flex-start'
                    >
                        <Typography variant = 'h1' className = { classes.title }>
                            FRESH
                        </Typography>

                        <Typography variant = 'h1' className = { classes.title }>
                            CHUNKY
                        </Typography>

                        <Typography variant = 'h1' className = { classes.title }>
                            GOOEY
                        </Typography>

                        <Typography variant = 'h1' className = { classes.title }>
                            SUPER
                        </Typography>

                        <Typography variant = 'h1' className = { classes.title }>
                            YUMMY XL
                        </Typography>

                        <Typography variant = 'h1' className = { classes.title }>
                            COOKIES
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <CategoryTabs 
                catalogItems = { catalogItems }
                currencyCode = { currencyCode }
                isLoadingCatalogItems = { isLoadingCatalogItems }
                pageInfo = { pageInfo }
                pageSize = { pageSize }
                setPageSize = { setPageSize }
                setSortBy = { setSortBy }
                sortBy = { sortBy }
            />

            <ShowImage />
        </Fragment>
    );
};

// HomePage.PropTypes = {
//     classes: PropTypes.object
// };

export default HomePage;