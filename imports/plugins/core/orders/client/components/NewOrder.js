import React from "react";
import { Grid } from "@material-ui/core";
import OrderProducts from "./OrderProducts";
import OrderSummary from "./OrderSummary";
import ShippingMethod from "./ShippingMethod";
import MoreDetailsOrder from "./MoreDetailsOrder";
import OrderCustomer from "./OrderCustomer";
import useDraftOrder from "../hooks/useDraftOrder";
import useAccounts from "../hooks/useAccounts";

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
        setSelectedAccount,
        setSelectedAddress,
        setSelectedFulfillmentMethod
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
        handleAddItems: addDraftOrderItems,
        handleChangeItemQuantity: changeItemQuantity,
        handleRemoveItem: removeItem,
        isLoadingProducts,
        query
    };

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>buttons</Grid>
            <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OrderProducts {...productProps} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderSummary />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OrderCustomer {...accountProps} />
                    </Grid>
                    <Grid item xs={12}>
                        <ShippingMethod />
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