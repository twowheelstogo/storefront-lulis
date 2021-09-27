import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RenderMedia from "./RenderMedia";
import { IconButton } from "@material-ui/core";
import CloseIcon from "mdi-material-ui/Close";
import { withComponents } from "@reactioncommerce/components-context";

const List = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const convertToMedia = (imageURLs) => [{
    URLs: imageURLs
}];

/**
 * 
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */
function ProductItems(props) {
    const {
        products,
        handleChangeItemQuantity,
        handleRemoveItem,
        components: {
            CartItem
        }
    } = props;

    const onChangeCartItemQuantity = async (value, _id) => {
        await handleChangeItemQuantity({
            cartItemId: _id,
            quantity: value
        })
    };

    const onRemoveItemFromCart = async (_id) => {
        await handleRemoveItem(_id);
    }

    return (
        <List>
            {products.map(({ node: product }, index) => (
                <CartItem
                    key={product._id}
                    item={product}
                    onChangeCartItemQuantity={onChangeCartItemQuantity}
                    onRemoveItemFromCart={onRemoveItemFromCart}
                />
            ))}
        </List>
    )
}
ProductItems.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    handleChangeItemQuantity: PropTypes.func,
    handleRemoveItem: PropTypes.func
};

ProductItems.defaultProps = {
    products: [],
    handleChangeItemQuantity() { },
    handleRemoveItem() { }
};

export default withComponents(ProductItems);
