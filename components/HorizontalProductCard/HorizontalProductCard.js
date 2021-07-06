import React from "react";
import PropTypes from "prop-types";
import {Grid,IconButton} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles"
import {Add as AddIcon, Remove as RemoveIcon} from "@material-ui/icons"
import styled from "styled-components";
import Link from "components/Link"
import Badge from "@material-ui/core/Badge";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
const StyledContent = styled.div`
display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  font-size: 14px;
  font-weight:300;
  color: "#7A6240";
`;
const StyledTitle = styled.div`
font-size:18px;
font-weight:700;
color:#000025;
display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;
const styles = (theme)=>({
    root:{
        display:'flex',
        flexGrow:1,
        flexDirection:'row',
        background:theme.palette.background.cards,
        padding:'10px',
        borderRadius:'10px',
    },
    leading:{
        width:'50',
        height:'auto'
    },
    content:{
        width:'100%',
        paddingLeft:'5px',
        paddingRight:'5px',
    },
    trailing:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        marginRight:'0',
        marginLeft:'auto',
    },
    image:{
        borderRadius:'10px'
    },
    title:theme.typography.title1,
    subtitle:{
        fontSize: 14,
        fontWeight:300,
        color: "#7A6240",
        background:'red',
    },
    controls:{
        display:'flex',
        flexDirection:'row',
    },
    badge: {
      width: 20,
      height: 20,
      top: 0,
      right: 0,
      backgroundColor: '#0095b3',
      color: '#ffffff'
    }
});
class HorizontalProductCard extends React.Component{
    constructor(props){
        super(props);
    }
    static propTypes = {

    }
    async HandleAddItemToCart(props){
        const {product,addItemsToCart} = props;
        const currentVariant = product.variants[0];
        const price = priceByCurrencyCode("USD",currentVariant.pricing);
        await addItemsToCart([
            {
                price:{
                amount:price.price,
                currencyCode:"USD",
                },
                productConfiguration:{
                    productId:product.productId,
                    productVariantId:currentVariant.variantId
                },
                quantity:1
            }
        ])

    }
    HandleRemoveItemToCart(props){
        const {onChangeCartItemsQuantity,product} = props;
        onChangeCartItemsQuantity({
            quantity:product.cartItem.quantity-1,
            cartItemId:product.cartItem._id
        });
    }
    render(){
        const {classes,product} = this.props;
        const {slug} = product;
        const quantity = product.cartItem!=undefined?product.cartItem.quantity:0
        return(
            <React.Fragment>
                <Badge badgeContent={quantity}
                 classes={{ badge: classes.badge }}>
                <div className={classes.root}>
                    <div className={classes.leading}>
                        <img className={classes.image} src={product.primaryImage.URLs.small} width={95} height={95}/>
                    </div>
                    <div className={classes.content}>
                    <Link
                    href = "/product/[...slugOrId]"
                    as = {`/product/${slug}`}>
                    <StyledTitle>{product.title}</StyledTitle>
                    <StyledContent>{product.description}</StyledContent>
                    </Link>
                    </div>
                    <div className={classes.trailing}>
                        <div className= {classes.title} style={{display:'flex',justifyContent:'flex-end'}}>{product.pricing[0].displayPrice}</div>
                        <div className={classes.controls}>
                            <IconButton size="small" color="primary" disabled={product.cartItem==undefined} onClick={()=>this.HandleRemoveItemToCart(this.props)}>
                            <RemoveIcon/>
                            </IconButton>
                            <IconButton size="small" color="primary" onClick={()=>this.HandleAddItemToCart(this.props)}>
                            <AddIcon/>
                            </IconButton>
                        </div>
                        </div>
                    <div></div>
                </div>
                </Badge>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(HorizontalProductCard);