import React, { Component, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import RoundedButton from "components/RoundedButton";
import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import BundleItems from "components/BundleItems";

const styles = (theme) => ({
    root: {
        paddingTop: theme.spacing(10),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    image: {
        margin: "auto",
        display: "block",
    },
    imgContainer: {
        [theme.breakpoints.up("md")]: {
            minHeight: "50vh"
        }
    },
    content: {
        width: "100%",
        // background:'red',
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    headerContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "auto",
        marginBottom: "auto",
        alignItems: "center"
    },
    title: {
        fontSize: 36,
        fontWeight: 600,
        color: theme.palette.primary.main
    },
    subtitle: theme.typography.subtitle3,
    favoriteIcon: {
        color: theme.palette.primary.main
    },
    description: {
        fontSize: "16px",
        color: "black"
    },
    controls: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: "10px",
        alignItems: "center"
    },
    centerControls: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "10px",
        alignItems: "center",
        paddingTop: theme.spacing(2)
    },
    removeButton: {
        background: theme.palette.primary.main,
        color: "white",
        borderRadius: "10px",
        width: "36px",
        height: "36px"

    },
    addButon: {
        background: theme.palette.secondary.light,
        color: "white",
        borderRadius: "10px",
        width: "36px",
        height: "36px"
    },
    bottom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
        // background:'green'
    }
});

const BundleDetails = (props) => {
    const [quantity, setQuantity] = useState(0);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const {
        classes,
        productBundle: {
            product,
            items
        },
        currencyCode
    } = props;
    const hostname = process.browser && (window.location.hostname != "localhost" ? "https://api.qbit01.com" : "http://localhost:3000");

    const media = (process.browser && product.media && product.media[0].URLs) ? `${hostname}${product.media[0].URLs.small.replace("jpg", "png")}` : "";

    const handleChange = (count) => setQuantity(quantity + count);

    return (
        <Fragment>
            <div className={classes.root}>
                <Grid container>
                    <Grid item lg={6} xs={12}>
                        <div className={classes.imgContainer}>
                            <img src={media} className={classes.image} />
                        </div>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <div className={classes.content}>
                            <div>
                                <div className={classes.headerContent}>
                                    {/* <CustomProductTitle>{product.title}</CustomProductTitle> */}
                                    <div className={classes.title}>{product.title}</div>
                                    <IconButton>
                                        <FavoriteIcon className={classes.favoriteIcon} />
                                    </IconButton>
                                </div>
                                <div className={classes.subtitle}>{product.variants[0].pricing.displayPrice}</div>
                                <br></br>
                                <div className={classes.description}>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at diam lectus. Nullam ultricies metus nec turpis aliquet ullamcorper. Aenean dolor justo, imperdiet nec ligula ut, cursus porta lacus. Donec eu ornare velit. Fusce sit amet ipsum sit amet odio mollis rhoncus eget nec justo. Aenean facilisis ullamcorper sodales. Pellentesque pretium at risus in tincidunt. Vestibulum est felis, malesuada sed odio vitae, rhoncus bibendum mi. Sed vitae egestas lectus. Fusce vel fermentum metus. "}</div>
                            </div>
                            <br></br>
                        </div>
                    </Grid>
                    <BundleItems 
                        items={items}
                        currencyCode={currencyCode}
                    />
                </Grid>
            </div>
        </Fragment>
    );
}

BundleDetails.propTypes = {
    addItemsToCart: PropTypes.func,
    cart: PropTypes.object,
    classes: PropTypes.object,
    productBundle: PropTypes.object,
    shop: PropTypes.object,
    onChangeCartItemsQuantity: PropTypes.func,
    currencyCode: PropTypes.any
};

BundleDetails.defaultProps = {
    addItemsToCart() { },
    cart: {},
    classes: {},
    productBundle: {
        product: {}
    },
    shop: {},
    onChangeCartItemsQuantity() { },
    currencyCode: null
};

export default withStyles(styles)(BundleDetails);
