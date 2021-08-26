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
        fontSize: "20px",
        color: "black",
        [theme.breakpoints.down("md")]: {
            fontSize: "16px"
        }
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
    // const [quantity, setQuantity] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
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

    // const handleChange = (count) => setQuantity(quantity + count);

    const setItem = (item, quantity) => {
        const items = [...selectedItems];

        const currentIndex = items.findIndex((product) => product._id == item._id);

        if (currentIndex == -1) {
            items.push({
                ...item,
                quantity: 1
            })
        } else {
            let currQuantity = items[currentIndex].quantity;

            if (currQuantity == 1 && quantity == -1) {
                items.splice(currentIndex, 1);
            } else {
                items[currentIndex] = {
                    ...items[currentIndex],
                    quantity: currQuantity + quantity
                };
            }
        }

        setSelectedItems(items);
    }

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
                                <div className={classes.description}>{product.description}</div>
                            </div>
                            <br></br>
                        </div>
                    </Grid>
                    <BundleItems
                        items={items}
                        currencyCode={currencyCode}
                        handleChange={setItem}
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
