import React, { useState } from 'react';
import { 
    makeStyles,
    Paper,
    Grid,
    Typography,
    Button
} from '@material-ui/core';
import inject from "hocs/inject";
import Link from "components/Link";
import withCart from "containers/cart/withCart";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
// import { locales } from "translations/config";
// import { withApollo } from "lib/apollo/withApollo";
// /**recently added */
// import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
// import fetchCatalogProduct from "staticUtils/catalog/fetchCatalogProduct";
// import fetchAllTags from "staticUtils/tags/fetchAllTags";
// import fetchTranslations from "staticUtils/translations/fetchTranslations";

const useStyles = makeStyles( theme => ({
    card: {
        width: '95%',
        // height: 240,
        // maxHeight: 240,
        padding: theme.spacing(3, 1),
        margin: theme.spacing(0, 1),
        borderStyle:'solid',
        borderWidth:'1px',
        borderColor:'#7A6240'
    },
    showCard: {
        width: '95%',
        // height: 240,
        // maxHeight: 240,
        padding: theme.spacing(3, 1),
        margin: theme.spacing(0, 1),
        boxShadow: '2px 2px 14px 0px rgba(0,0,0,0.25)'
    },
    img: {
        // width: '90%',
        height: 260,
        // padding: theme.spacing(0, 1, 3, 1)
    },
    cartButtons: {
        margin: theme.spacing(0, 0, 1, 0)
    },
    productName: {
        color: '#0095b3',
        margin: theme.spacing(1, 2)
    },
    productDescription: {
        color: '#888e8e',
        margin: theme.spacing(1, 2)
    },
    productPrice: {
        color: '#0095b3',
        margin: theme.spacing(1, 2)
    },
    modifyCartButton: {
        color: '#0095b3',
    },
    addToCart: {
        foregroundColor: '#0095b3',
        color: '#ffffff'
    },
    qty: {
        color: '#888e8e',
        margin: theme.spacing(0, 1)
    }
}));

const ProductCard = props => {
    const { product } = props;
    const { slug } = product;
    const [ qty, setQty ] = useState(0);
    const [ show, setShow ] = useState(false);
    const classes = useStyles();

    const addProduct = () => {
        setQty(qty + 1)
    };

    const subtractProduct = () => {
        if(qty > 0) {
            setQty(qty - 1)
        } else {
            setQty(0)
        }
    }
    const handleOnClick = async () =>{
        const {addItemsToCart,shop,
        uiStore:{openCartWithTimeout}} = props;
        const currencyCode = (shop && shop.currency.code) || "USD";
        const price = priceByCurrencyCode(currencyCode, product.pricing);
        console.log("price: ",price);
        await addItemsToCart([
            {
              price: {
                amount: price.minPrice,
                currencyCode
              },
              productConfiguration: {
                productId: product.productId, // Pass the productId, not to be confused with _id
              },
              quantity:qty
            }
          ]);
          openCartWithTimeout(3000);
    }
    return (
        <Link
        href = "/product/[...slugOrId]"
            as = {`/product/${slug}`}
        >
        <Paper
        onMouseOver = {()=>setShow(true)}
        onMouseOut = {()=>setShow(false)}
        className = {show ? classes.showCard:classes.card}
        elevation={0}
        >
            <Grid
            container
            direction ="row"
            justify='flex-start'
            alignItems = 'center'
            alignContent = 'center'
            >
                <Grid
                    container
                    direction = 'column'
                    justify = 'center'
                    alignItems = 'center'
                    alignContent = 'center'
                >
                    <img 
                        src = { product.primaryImage.URLs.small }
                        className = { classes.img }
                    />
                </Grid>
                <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
                alignContent='center'>
                <div>
                <Typography variant = 'h5' className = { classes.productName }>
                    { product.title }
                </Typography>
                </div>
                {/* <Typography variant = 'body1' className = { classes.productDescription }>
                    { product.description }
                </Typography> */}
                    <div>
                <Typography variant = 'body2' className = { classes.productPrice}>
                    <strong>{ product.pricing[0].displayPrice }</strong>
                </Typography>
                </div>
                </Grid>
                        <Grid
                            container
                            direction = 'row'
                            justify = 'center'
                            alignItems = 'center'
                            alignContent = 'center'
                        >
                            <Grid item>
                                <Button
                                    onClick = { subtractProduct }
                                    className = { classes.modifyCartButton }
                                >
                                    -
                                </Button>
                         </Grid>

                             <Grid item>
                                 <Typography variant = 'h6' className = { classes.qty }>
                                     { qty }
                                 </Typography>
                             </Grid>
                            
                             <Grid item>
                                 <Button
                                     onClick = { addProduct }
                                     className = { classes.modifyCartButton }
                                 >
                                     +
                                 </Button>
                             </Grid>
                         </Grid>

                <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
                alignContent='center'
                >
                <Button
                    variant = 'outlined'
                    color='primary'
                    // className = { classes.addToCart }
                >
                    AÑADIR AL CARRITO
                </Button>
                </Grid>
            </Grid>
        </Paper>
        </Link>
    );
};
/**
 *  Static props for a product
 *
 * @returns {Object} the props
 */
//  export async function getStaticProps({ params: { slugOrId, lang } }) {
//     const productSlug = slugOrId && slugOrId[0];
//     const primaryShop = await fetchPrimaryShop(lang);
  
//     if (!primaryShop) {
//       return {
//         props: {
//           shop: null,
//           translations: null,
//           products: null,
//           tags: null
//         },
//         // eslint-disable-next-line camelcase
//         unstable_revalidate: 1 // Revalidate immediately
//       };
//     }
//     console.log("productSlug: ",productSlug);
//     return {
//       props: {
//         ...primaryShop,
//         ...await fetchTranslations(lang, ["common", "productDetail"]),
//         ...await fetchCatalogProduct(productSlug),
//         ...await fetchAllTags(lang)
//       },
//       // eslint-disable-next-line camelcase
//       unstable_revalidate: 120 // Revalidate each two minutes
//     };
//   }
  
//   /**
//    *  Static paths for a product
//    *
//    * @returns {Object} the paths
//    */
//   export async function getStaticPaths() {
//     return {
//       paths: locales.map((locale) => ({ params: { lang: locale, slugOrId: ["-"] } })),
//       fallback: true
//     };
//   }
export default withCart(inject("routingStore","uiStore")(ProductCard));