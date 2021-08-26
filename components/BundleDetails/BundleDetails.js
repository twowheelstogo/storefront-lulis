import React, { Component, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import RoundedButton from "components/RoundedButton";
import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import { useTheme } from "@material-ui/core/styles";
import BundleItems from "components/BundleItems";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import inject from "hocs/inject";

const BundleAlert = styled.div`
    left: 0;
    right: 0;
    top: auto !important;
    position: fixed;
    justify-content: center;
    display: flex;
    margin: 0 1.6rem;
    z-index: 1000;
    transition: bottom .3s ease-out;
    pointer-events: none;

`;

const BundleAlertContent = styled.div`
    background: #7A6240;
    padding: 1rem;
    text-align: center;
    border-radius: 3px;
    color: white;
`;

function ElevationScroll(props) {
    const { children, window, classes: { bundleAlert, bundleAlertHidden } } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    console.log("trigger", trigger);

    return React.cloneElement(children, {
        elevation: 0,
        className: trigger ? bundleAlertHidden : bundleAlert
    });
}

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
        width: "100%"
        // background:'green'
    },
    bundleAlert: {
        bottom: "2.6rem"
    },
    bundleAlertHidden: {
        bottom: "-15rem"
    }
});

const itemMetaFields = (items) => {

    return items.map((element, index) => ({
        key: `${index}`,
        value: JSON.stringify({
            quantity: element.quantity,
            _id: element._id,
            title: element.title,
            description: element.description,
            media: element.media,
            pageTitle: element.pageTitle,
            pricing: element.pricing
        }),
        valueType: "bundleItem"
    }));
}

const BundleDetails = (props) => {
    // const [quantity, setQuantity] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const theme = useTheme();
    // const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const {
        classes,
        productBundle: {
            product,
            items,
            limit
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

    const handleAddToCart = async () => {
        const {
            addItemsToCart,
            currencyCode,
            uiStore: { openCartWithTimeout },
            productBundle: { product, variantId: productVariantId, productId }
        } = props;

        const price = product.variants[0].pricing.price;

        await addItemsToCart({
            price: {
                amount: price,
                currencyCode
            },
            productConfiguration: {
                productId,
                productVariantId
            },
            metafields: itemMetaFields(selectedItems),
            quantity: 1
        });

        openCartWithTimeout(3000);
    };

    const mergedItems = (items || []).map((item) => {
        const match = selectedItems.find((selectedItem) => selectedItem._id == item._id);
        if (match) {
            return {
                ...item,
                quantity: match.quantity
            }
        }
        return item;
    });

    const totalItems = selectedItems.reduce((total, element) => total + element.quantity, 0);

    const totalMessage = totalItems != limit ? `Tu bundle debe contener ${limit} productos, has seleccionado ${totalItems}` : `Hay ${totalItems} productos seleccionados, tu bundle está listo`;

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
                                <div className={classes.description}
                                    style={{
                                        color: (totalItems == limit) ? "green" : "red"
                                    }}
                                >{totalMessage}</div>
                            </div>
                            <br></br>
                        </div>
                    </Grid>
                    <Grid item><br></br></Grid>
                    <BundleItems
                        items={mergedItems}
                        currencyCode={currencyCode}
                        handleChange={setItem}
                        disabled={totalItems == limit}
                    />
                    <Grid item>
                        <ElevationScroll {...props}>
                            <BundleAlert>
                                <BundleAlertContent>
                                    <div>{totalMessage}</div>
                                </BundleAlertContent>
                            </BundleAlert>
                        </ElevationScroll>
                    </Grid>
                    {totalItems == limit && (
                        <div className={classes.bottom}>
                            <Grid
                                item
                                xs={12}
                                lg={4}>
                                <br></br>
                                <br></br>
                                <RoundedButton
                                    buttonTitle="Agregar al carrito"
                                    buttonSubtitle={`${limit} productos por ${product.variants[0].pricing.displayPrice}`}
                                    onClick={handleAddToCart}
                                />
                            </Grid>
                        </div>
                    )}
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

export default withStyles(styles)(inject("uiStore")(BundleDetails));
