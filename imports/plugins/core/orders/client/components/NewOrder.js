import React, { useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import OrderProducts from "./OrderProducts";
import OrderSummary from "./OrderSummary";
import ShippingMethod from "./ShippingMethod";
import MoreDetailsOrder from "./MoreDetailsOrder";
import OrderCustomer from "./OrderCustomer";
import useDraftOrder from "../hooks/useDraftOrder";
import useAccounts from "../hooks/useAccounts";
import { Button } from "@reactioncommerce/catalyst";
import styled from "styled-components";

const GridButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    padding: 5px;
`;

/**
 * @name NewOrder
 * @returns {React.Component} A React component
 */
function NewOrder() {
    const {
        isLoadingProducts,
        products,
        selectedProducts,
        addDraftOrderItems,
        changeItemQuantity,
        removeItem,
        setQuery,
        query,
        selectedAccount,
        selectedAddress,
        selectedFulfillmentMethod,
        selectedFulfillmentType,
        setSelectedAccount,
        setSelectedAddress,
        setSelectedFulfillmentMethod,
        setSelectedFulfillmentType,
        addItemsToCart,
        cart,
        draftOrder,
        selectAccount
    } = useDraftOrder();
    const {
        accounts,
        isLoadingAccounts,
        accountsQuery,
        setAccountsQuery
    } = useAccounts();

    const accountProps = {
        accounts,
        isLoadingAccounts,
        accountsQuery,
        setAccountsQuery,
        selectedAccount,
        setSelectedAccount
    };

    const productProps = {
        handleQuery: setQuery,
        products: products && products.nodes || [],
        selectedProducts,
        handleAddItems: addItemsToCart,
        handleChangeItemQuantity: changeItemQuantity,
        handleRemoveItem: removeItem,
        isLoadingProducts,
        query,
        cart
    };

    // const { checkout: { fulfillmentGroups } } = cart || {
    //     checkout: null
    // };
    const { checkout } = cart || {};
    const { fulfillmentGroups } = checkout || {};
    const [fulfillmentGroup] = fulfillmentGroups || [];

    const shippingProps = {
        selectedAccount,
        selectedAddress,
        selectShippingAddress: setSelectedAddress,
        selectedFulfillmentMethod,
        selectFulfillmentMethod: setSelectedFulfillmentMethod,
        selectedFulfillmentType,
        selectFulfillmentType: setSelectedFulfillmentType,
        fulfillmentGroup: fulfillmentGroup || null
    }

    useEffect(() => {

        if (!selectedAccount && draftOrder?.accountId && Array.isArray(accounts)) {
            selectAccount(accounts.find((item) => item._id == draftOrder.accountId));
        }
    }, [accounts, draftOrder])

    return (
        <Grid container spacing={2}>
            <Grid
                xs={12}
            >
                <GridButtons>
                    <Button
                        color="primary"
                        variant="outlined"
                    >{"Cancelar"}</Button>
                    <Button
                        color="primary"
                        variant="contained"
                    >{"Guardar"}</Button>
                </GridButtons>
            </Grid>
            <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OrderProducts {...productProps} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderSummary summary={cart.checkout && cart.checkout.summary} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OrderCustomer {...accountProps} />
                    </Grid>
                    <Grid item xs={12}>
                        <ShippingMethod {...shippingProps} />
                    </Grid>
                    <Grid item xs={12}>
                        <MoreDetailsOrder />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default NewOrder;