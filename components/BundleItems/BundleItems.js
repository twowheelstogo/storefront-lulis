import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import HorizontalBundleItemCard from "components/HorizontalBundleItemCard";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {
        flexGrow: 1
    }
});

const BundleItems = (props) => {
    const {
        items,
        disabled,
        handleChange,
        currencyCode,
        uiStore,
        classes
    } = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                {items.map((item, index) => (
                    <Grid item xs={12} md={4} key={`${index}`}>
                        <HorizontalBundleItemCard
                            currencyCode={currencyCode}
                            product={item}
                            uiStore={uiStore}
                            handleChange={handleChange}
                            disabled={disabled}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

BundleItems.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    disabled: PropTypes.bool,
    handleChange: PropTypes.func,
    uiStore: PropTypes.object,
    currencyCode: PropTypes.string,
    classes: PropTypes.any
};

BundleItems.defaultProps = {
    items: [],
    disabled: false,
    handleChange() { },
    uiStore: null,
    currencyCode: "GTQ"
};

export default withStyles(styles)(inject("uiStore")(BundleItems));
