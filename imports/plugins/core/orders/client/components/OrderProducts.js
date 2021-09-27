import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import styled from "styled-components";
import { Button, TextField } from "@reactioncommerce/catalyst";
import PropTypes from "prop-types";
import ProductsModal from "./ProductsModal";
import ProductItems from "./ProductItems";

const InputGrid = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
`;

const InputCol = styled.div`
    display: flex;
    flex: 1 1 auto;
`;

/**
 * @name OrderProducts
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */
function OrderProducts(props) {
    const [open, setOpen] = useState(false);
    const {
        handleQuery,
        products,
        selectedProducts,
        handleAddItems,
        handleUpdateCartItemQuantity,
        handleRemoveItem,
        query,
        cart
    } = props;

    const handleClose = () => {
        handleQuery("");
        setOpen(false);
    }

    const handleChange = (event) => {
        handleQuery(event.target.value);
        setOpen(true);
    }

    return (
        <Card>
            <CardHeader title={"Productos"} />
            <CardContent>
                <InputGrid>
                    <InputCol>
                        <TextField
                            defaultValue={query}
                            onChange={handleChange}
                            placeholder="Buscar..."
                        />
                    </InputCol>
                    <Button
                        color="primary"
                        variant="outlined"
                        isFullWidth
                        onClick={() => setOpen(true)}
                    >{"Buscar"}</Button>
                </InputGrid>
                <ProductItems
                    handleChangeItemQuantity={handleUpdateCartItemQuantity}
                    handleRemoveItem={handleRemoveItem}
                    products={cart && cart.items && cart.items.edges || []}
                />
            </CardContent>
            <ProductsModal
                selectedProducts={selectedProducts}
                products={products}
                open={open}
                handleClose={handleClose}
                handleChange={handleChange}
                handleAddItems={handleAddItems}
                value={query}
            />
        </Card>
    );
}

OrderProducts.propTypes = {
    handleQuery: PropTypes.func,
    products: PropTypes.arrayOf(PropTypes.object),
    selectedProducts: PropTypes.array,
    handleAddItems: PropTypes.func,
    handleUpdateCartItemQuantity: PropTypes.func,
    handleRemoveItem: PropTypes.func,
    isLoadingProducts: PropTypes.bool,
    cart: PropTypes.object,

};

OrderProducts.defaultProps = {
    handleQuery() { },
    products: [],
    selectedProducts: [],
    handleAddItems() { },
    handleUpdateCartItemQuantity() { },
    handleRemoveItem() { },
    isLoadingProducts: false,
    cart: null
}

export default OrderProducts;
