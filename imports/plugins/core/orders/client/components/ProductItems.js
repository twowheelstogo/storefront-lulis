import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RenderMedia from "./RenderMedia";
import { IconButton } from "@material-ui/core";
import CloseIcon from "mdi-material-ui/Close";

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const Item = styled.div`
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #dcdcdc;
    box-sizing: border-box;
    display: flex;
    flex-grow: 1;
    height: 80px;
    flex-direction: row;
    &:last-of-type {
    border-bottom: none;
    }
    > * {
    box-sizing: border-box;
    }
`;

const ItemLeading = styled.div`
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ItemContent = styled.div`
    flex: 1 1 auto;
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center; 
`;

const ItemTrailing = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 2px;
`;

const ItemTitle = styled.div`
     font-size: 14px;
     font-weight: 700;
     color: #3C5D6F;
`;

const ItemSubtitle = styled.div`
font-size: 14px;
font-weight: 600;
color: #565656;
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
        handleRemoveItem
    } = props;
    return (
        <List>
            {products.map(({ node: product }, index) => (
                <Item key={`${index}`}>
                    <ItemLeading>
                        <RenderMedia media={product.imageURLs && convertToMedia(product.imageURLs)} />
                    </ItemLeading>
                    <ItemContent>
                        <ItemTitle>{product.title}</ItemTitle>
                        <ItemSubtitle>{`${product.quantity} x ${product.price.displayAmount}`}</ItemSubtitle>
                    </ItemContent>
                    <ItemTrailing>
                        <ItemSubtitle>{product.price.displayAmount}</ItemSubtitle>
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </ItemTrailing>
                </Item>
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

export default ProductItems;
