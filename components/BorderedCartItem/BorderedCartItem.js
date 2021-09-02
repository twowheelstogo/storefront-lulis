import React from "react";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import {withStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import RemoveIcon from "@material-ui/icons/Remove";import { addTypographyStyles, applyTheme, CustomPropTypes } from "@reactioncommerce/components/utils";
const Item = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    border-radius: 10px;
    background: #F1F1F1;
`;
const ItemBody = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: row;
`;
const ItemActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
	closeButton:{
		background:"#C4C4C4",
		color:"black",
		borderRadius:"10px",
		width:"24px",
		height:"24px",
	},
	image:{
		borderRadius: "10px"
	}
});
const Controls = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
`;
class BorderedCartItem extends React.Component{
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
		  const hostname = typeof window !== "undefined" && (window.location.hostname != "localhost" ? "https://api.qbit01.com" : "http://localhost:3000");
      	const imageUrl = (imageURLs && `${hostname}${imageURLs && imageURLs.small}`) || `/images/placeholder.gif`;
      	return(
      		<React.Fragment>
      			<Item className={classes.root}>
      				<ItemBody>
      					<ItemLeading>
      						<img className={classes.image} src={imageUrl} width={70} height={70}></img>
      					</ItemLeading>
      					<ItemContent>
      						<ItemTitle>{title}</ItemTitle>
      						<ItemTitle>{displayPrice}</ItemTitle>
      					</ItemContent>
      					<ItemTrailing>
      						{/* <ItemSubtitle style={{display:'flex',justifyContent:'flex-end'}}>{displayPrice}</ItemSubtitle> */}
      						{quantity!=1 && <div>
      							<ItemSubtitle style={{display:"flex",justifyContent:"flex-end"}}>{`Total: (${quantity})`}</ItemSubtitle>
      							<ItemSubtitle style={{display:"flex",justifyContent:"flex-end"}}>{displaySubtotal}</ItemSubtitle>
      						</div>}
      					</ItemTrailing>
      				</ItemBody>
      				<ItemActions>
      					<IconButton className={classes.closeButton}
      						onClick={this.handleRemoveItemFromCart}>
      						<CloseIcon fontSize="small"/>
      					</IconButton>
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
      				</ItemActions>
      			</Item>
      		</React.Fragment>
      	);
      }
}
//const imageUrl = "http://localhost:3000/assets/files/Media/dsia87CQqKqJtLueo/small/6%20mini%20cranberry.png";
export default withStyles(styles)(withComponents(BorderedCartItem));