import React from "react";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import {withStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";import { addTypographyStyles, applyTheme, CustomPropTypes } from "@reactioncommerce/components/utils";
const Item = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    border-bottom-color: ${applyTheme("CartItem.borderBottomColor")};
    border-bottom-style: solid;
    border-bottom-width: ${applyTheme("CartItem.borderBottomWidth")};
    border-left-color: ${applyTheme("CartItem.borderLeftColor")};
    border-left-style: solid;
    border-left-width: ${applyTheme("CartItem.borderLeftWidth")};
    border-right-color: ${applyTheme("CartItem.borderRightColor")};
    border-right-style: solid;
    border-right-width: ${applyTheme("CartItem.borderRightWidth")};
    box-sizing: border-box;
      &:last-of-type {
        border-bottom: none;
      }
      > * {
        box-sizing: border-box;
      }
`;
const ItemLeading = styled.div`
    width: auto;
    height: auto;
`;
const ItemTrailing = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 0;
    margin-left: auto;
    width: 100px;
`;
const ItemTitle = styled.div`
font-size:16px;
font-weight:700;
color:#000000;
`;
const ItemSubtitle = styled.div`
display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  font-size: 14px;
  font-weight:300;
  color: "#7A6240";
`;
const ItemContent = styled.div`
    width: 250px;
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const ItemRemoveButton = styled.button`
${addTypographyStyles("CartItemRemoveButton", "labelText")}
align-self: flex-start;
background-color: transparent;
border: none;
color: ${applyTheme("CartItem.removeButtonColor")};
cursor: pointer;
display: table;
flex: 0 1 auto;
margin-bottom: ${applyTheme("CartItem.removeButtonSpacingBelow")};
margin-left: 0;
margin-right: 0;
margin-top: ${applyTheme("CartItem.removeButtonSpacingAbove")};
padding-bottom: 0;
padding-left: 0;
padding-right: 0;
padding-top: 0;
width: auto;
&:focus,
&:hover {
  color: ${applyTheme("CartItem.removeButtonColor_focus")};
}
`;
const styles = (theme) => ({
	root:{
		padding:theme.spacing(2)
	},
	removeButton:{
		background:theme.palette.primary.main,
		color:"white",
		borderRadius:"10px",
		width:"24px",
		height:"24px"

	},
	addButon:{
		background:theme.palette.secondary.light,
		color:"white",
		borderRadius:"10px",
		width:"24px",
		height:"24px"
	},

});
const Controls = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
`;
class CustomCartItem extends React.Component{
    handleRemoveItemFromCart = () => {
    	const { onRemoveItemFromCart, item: { _id } } = this.props;
    	onRemoveItemFromCart(_id);
    };
      handleChangeCartItemQuantity = (value) => {
      	const { onChangeCartItemQuantity, item: { _id } } = this.props;
      	onChangeCartItemQuantity(value, _id);
      };
      render(){
      	const {
      		components,
      		isMiniCart,
      		isReadOnly,
      		productURLPath,
      		classes,
      		item: {
      			attributes,
      			compareAtPrice,
      			currentQuantity,
      			productSlug,
      			productVendor,
      			title,
      			quantity,
      			isLowQuantity,
      			imageURLs,
      			price: { displayAmount: displayPrice },
      			subtotal
      		},
      		removeText,
      		totalText
      	} = this.props;

      	const { displayAmount: displaySubtotal } = subtotal || {};
      	const { displayAmount: displayCompareAtPrice } = compareAtPrice || {};
		const hostname = process.browser && (window.location.hostname != "localhost" ? "https://api.qbit01.com" : "http://localhost:3000");
      	const imageUrl = (imageURLs && `${hostname}${imageURLs && imageURLs.small}`) || `${hostname}/resources/placeholder.gif`;

		  return(
      		<React.Fragment>
      			<Item className={classes.root}>
      				<ItemLeading>
      					<img src={imageUrl} width={95} height={95}></img>
      				</ItemLeading>
      				<ItemContent>
      					<ItemTitle>{title}</ItemTitle>
      					<div>
      						<Controls>
      							<IconButton className={classes.removeButton}
      								onClick={()=> this.handleChangeCartItemQuantity(quantity-1)}>
      								<RemoveIcon/>
      							</IconButton>
      							<ItemTitle>{quantity}</ItemTitle>
      							<IconButton className={classes.addButon}
      								onClick={()=> this.handleChangeCartItemQuantity(quantity+1)}>
      								<AddIcon/>
      							</IconButton>
      						</Controls>
      						<ItemRemoveButton onClick={this.handleRemoveItemFromCart}>{"Remover"}</ItemRemoveButton>
      					</div>
      				</ItemContent>
      				<ItemTrailing>
      					<ItemSubtitle style={{display:"flex",justifyContent:"flex-end"}}>{displayPrice}</ItemSubtitle>
      					{quantity!=1 && <div>
      						<ItemSubtitle style={{display:"flex",justifyContent:"flex-end"}}>{`Total: (${quantity})`}</ItemSubtitle>
      						<ItemSubtitle style={{display:"flex",justifyContent:"flex-end"}}>{displaySubtotal}</ItemSubtitle>
      					</div>}
      				</ItemTrailing>
      			</Item>
      		</React.Fragment>
      	);
      }
}
export default withStyles(styles)(withComponents(CustomCartItem));