import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles,useMediaQuery, useTheme } from '@material-ui/core';
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
        padding:'10px'
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
        sortBy,
        tags
    } = props;
    const uiTheme = useTheme();
    const matches = useMediaQuery(uiTheme.breakpoints.down("xs"));

    const classes = styles();

    return (
        <Fragment>
            <CategoryTabs 
                catalogItems = { catalogItems }
                currencyCode = { currencyCode }
                isLoadingCatalogItems = { isLoadingCatalogItems }
                pageInfo = { pageInfo }
                pageSize = { pageSize }
                setPageSize = { setPageSize }
                setSortBy = { setSortBy }
                sortBy = { sortBy }
                tags={tags}
            />

        </Fragment>
    );
};

// HomePage.PropTypes = {
//     classes: PropTypes.object
// };

export default HomePage;