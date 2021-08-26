import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import HorizontalBundleItemCard from "components/HorizontalBundleItemCard";

const BundleItems = (props) => {
    const {
        items,
        disabled,
        handleChange,
        currencyCode,
        uiStore
    } = props;

    return (
        <Grid container spacing={2}>
            {items.map((item) => (
                <Grid item xs={12} md={4}>
                    <HorizontalBundleItemCard
                        currencyCode={currencyCode}
                        product={item}
                        uiStore={uiStore}
                        handleChange={handleChange}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

BundleItems.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    disabled: PropTypes.bool,
    handleChange: PropTypes.func,
    uiStore: PropTypes.object,
    currencyCode: PropTypes.object
};

BundleItems.defaultProps = {
    items: [],
    disabled: false,
    handleChange() { },
    uiStore: null,
    currencyCode: null
};

export default inject("uiStore")(BundleItems);
