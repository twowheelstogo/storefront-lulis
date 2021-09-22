import { useState, useMemo, useEffect } from "react";
import productsQuery from "../graphql/queries/products";
import cartByAccountIdQuery from "../graphql/queries/cartByAccountId";
import anonymousCartByCartIdQuery from "../graphql/queries/anonymousCartByCartId";
import draftOrderQuery from "../graphql/queries/draftOrder";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useIsMount } from "../helpers";
import {
    reconcileCartsMutation,
    removeCartItemsMutation,
    setFulfillmentOptionCartMutation,
    setShippingAddressCartMutation,
    setEmailOnAnonymousCartMutation,
    updateCartItemsQuantityMutation,
    updateFulfillmentOptionsForGroup as updateFulfillmentOptionsForGroupMutation,
    updateFulfillmentTypeForGroup as updateFulfillmentTypeForGroupMutation,
    addDraftOrderCartItemsMutation,
} from "../graphql/mutations/cart";
import {
    createDraftOrderCartMutation,
    addDraftOrderAccountMutation
} from "../graphql/mutations/draftOrder";
import {
    placeOrderMutation
} from "../graphql/mutations/order";

/**
 * @method useDraftOrder
 * @summary useDraftOrder hook
 * @param {Object} args input arguments
 * @param {String} args.shopId  Shop Id to load draft order data for
 * @returns {Object} Result containing the draft order and other helpers for managing that draft order
 */
function useDraftOrder(args = {}) {
    const { enqueueSnackbar } = useSnackbar();
    const isMounted = useIsMount();
    const {
        shopId: shopIdProp,
        draftOrderId: draftOrderIdProp
    } = args;

    const routeParams = useParams();
    const shopId = routeParams.shopId || shopIdProp;
    const draftOrderId = routeParams.draftOrderId || draftOrderIdProp;
    const [query, setQuery] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedFulfillmentMethod, setSelectedFulfillmentMethod] = useState(null);
    const [selectedFulfillmentType, setSelectedFulfillmentType] = useState("shipping");
    const [anonymousCartId, setAnonymousCartId] = useState(null);
    const [anonymousCartToken, setAnonymousCartToken] = useState(null);

    const [addDraftOrderAccount] = useMutation(addDraftOrderAccountMutation);
    const [updateFulfillmentOptionsForGroup] = useMutation(updateFulfillmentOptionsForGroupMutation);
    const [updateFulfillmentTypeForGroup] = useMutation(updateFulfillmentTypeForGroupMutation);

    /**Query to get products */
    const { data: productsQueryResult, isLoading: isLoadingProducts, refetch: refetchProducts } = useQuery(productsQuery, {
        variables: {
            shopIds: [shopId],
            query
        },
        skip: !shopId
    });

    /**Query to get draft order */
    const { data: draftOrderQueryResult, loading: isLoadingDraftOrder, refetch: refetchDraftOrder } = useQuery(draftOrderQuery, {
        variables: {
            draftOrderId
        }
    });

    const shouldSkipAccountCartByAccountIdQuery = Boolean(!selectedAccount || anonymousCartToken || anonymousCartId || isLoadingDraftOrder || !shopId);
    const shouldSkipAnonymousCartByCartIdQuery = Boolean(selectedAccount || isLoadingDraftOrder || !anonymousCartId || !anonymousCartToken);

    /**Query to get account cart */
    const [
        fetchAccountCart,
        { loading: isLoadingAccountCart, called: accountCartQueryCalled, data: cartData, fetchMore, refetch: refetchAccountCart }
    ] = useLazyQuery(cartByAccountIdQuery, {
        variables: {
            shopId,
            accountId: selectedAccount?._id || null
        },
        poliInterval: shouldSkipAccountCartByAccountIdQuery ? 0 : 10000
    });

    /**Query to get anonymous cart */
    const [
        fetchAnonymousCart,
        { data: cartDataAnonymous, called: anonymousCartQueryCalled, refetch: refetchAnonymousCart, loading: isLoadingAnonymousCart }
    ] = useLazyQuery(anonymousCartByCartIdQuery, {
        variables: {
            cartId: anonymousCartId,
            cartToken: anonymousCartToken
        },
        poliInterval: shouldSkipAnonymousCartByCartIdQuery ? 0 : 10000
    });

    if (!accountCartQueryCalled && !shouldSkipAccountCartByAccountIdQuery) {
        fetchAccountCart();
    } else if (!anonymousCartQueryCalled && !shouldSkipAnonymousCartByCartIdQuery) {
        fetchAnonymousCart();
    }

    const { products } = productsQueryResult || {};
    const { draftOrder } = draftOrderQueryResult || {};

    const addDraftOrderItems = (items) => {

        const itemsWithQuantity = items.map((curr) => ({ ...curr, quantity: 1 }));
        setSelectedProducts((current) => [...current, ...itemsWithQuantity]);
    };

    const cart = useMemo(() => {
        if (!shouldSkipAccountCartByAccountIdQuery && cartData) {
            return cartData.cart;
        }
        if (!shouldSkipAnonymousCartByCartIdQuery && cartDataAnonymous) {
            return cartDataAnonymous.cart;
        }

        return {};
    }, [cartData, cartDataAnonymous, shouldSkipAccountCartByAccountIdQuery, shouldSkipAnonymousCartByCartIdQuery]);

    /**Mutation to add or create cart */
    const [
        addOrCreateCartMutation, {
            loading: addOrCreateCartLoading
        }] = useMutation(cart && cart._id ? addDraftOrderCartItemsMutation : createDraftOrderCartMutation);


    const cartIdAndCartToken = () => {
        // const { accountCartId, anonymousCartId, anonymousCartToken } = cartStore;
        let cartToken = {};
        if (!selectedAccount) {
            cartToken = { cartToken: anonymousCartToken };
        }

        return {
            cartId: cart._id || anonymousCartId,
            ...cartToken
        };
    };

    const handleAddItemsToCart = async (items) => {
        const input = {};

        if (Object.keys(cart || {}).length == 0 || !cart) {
            input.draftOrderId = draftOrderId;
            input.shopId = shopId;

            if (selectedAccount) {
                input.accountId = selectedAccount._id;
            }

            input.createCartInput = {
                shopId,
                items
            };

        } else {
            input.items = items;

            if (cart._id) {
                input.cartId = cart._id;
            }

            if (anonymousCartId) {
                input.cartId = anonymousCartId;
            }

            if (anonymousCartToken) {
                input.cartToken = anonymousCartToken;
            }

            if (selectedAccount) {
                input.accountId = selectedAccount._id;
            }
        }

        try {
            await addOrCreateCartMutation({
                variables: {
                    input
                }
            });
            refetchCart();
            enqueueSnackbar("Productos agregados al carrito correctamente", { variant: "success" });
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar(error.message.replace("GraphQL error: ", ""), { variant: "error" });
        }
    };

    useEffect(() => {

        if (!isMounted) {
            if (draftOrder?.cartToken) {
                setAnonymousCartId(draftOrder.cartId);
                setAnonymousCartToken(draftOrder.cartToken);
                // fetchAnonymousCart();
            }
            else if (draftOrder?.accountId) {
                setAnonymousCartId(null);
                setAnonymousCartToken(null);
                // fetchAccountCart();
            }
        }
    }, [draftOrder]);

    const changeItemQuantity = (id, quantity) => {
        const currSelectedProducts = [...selectedProducts];
        const productItems = [];
        currSelectedProducts.forEach((item) => {
            const currQuantity = item.quantity + quantity;

            if (item._id == id && currQuantity > 0) {
                productItems.push({
                    ...item,
                    quantity: currQuantity
                });
            } else {
                productItems.push(item);
            }
        });

        setSelectedProducts(productItems);
    };

    const refetchCart = () => {
        refetchDraftOrder();
        if (!shouldSkipAccountCartByAccountIdQuery) {
            refetchAccountCart();
        } else if (!shouldSkipAnonymousCartByCartIdQuery) {
            refetchAnonymousCart();
        }
    }

    const removeItem = (id) => {
        const currSelectedProducts = [...selectedProducts];

        const productsWithoutItem = currSelectedProducts.filter((item) => item._id !== id);

        setSelectedProducts(productsWithoutItem);
    };

    /**Re-fetch products every time the query has changed*/
    useEffect(() => {

        if (!isMounted) {
            refetchProducts();
        }
    }, [query]);

    const handleSelectAddress = (item) => {

        setSelectedAddress(item);
    };

    const handleSelectAccount = async (item) => {

        try {

            setSelectedAddress(null);
            await addDraftOrderAccount({
                variables: {
                    input: {
                        accountId: item._id,
                        cartId: anonymousCartId || cart._id,
                        shopId,
                        draftOrderId
                    }
                }
            });

            setAnonymousCartId(null);
            setAnonymousCartToken(null);
            setSelectedAccount(item);
            refetchCart();
            enqueueSnackbar("Cliente seleccionado", { variant: "success" });
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar(error.message.replace("GraphQL error: ", ""), { variant: "error" });
        }
    };

    const handleSelectFulfillmentMethod = (item) => {

        setSelectedFulfillmentMethod(item);
    };

    const handleSelectFulfillmentType = async ({ fulfillmentGroupId, fulfillmentType }) => {

        try {
            await updateFulfillmentTypeForGroup({
                variables: {
                    input: {
                        ...cartIdAndCartToken(),
                        fulfillmentGroupId,
                        fulfillmentType
                    }
                }
            });

            handleUpdateFulfillmentOptionsForGroup(fulfillmentGroupId);
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar(error.message.replace("GraphQL error: ", ""), { variant: "error" });
        }
    };

    const [setShippingAddressOnCart] = useMutation(setShippingAddressCartMutation, {
        onCompleted({ setShippingAddressFromDraftOrder }) {
            console.log(setShippingAddressFromDraftOrder.cart.checkout?.fulfillmentGroups[0]._id);
            handleUpdateFulfillmentOptionsForGroup(setShippingAddressFromDraftOrder.cart.checkout?.fulfillmentGroups[0]._id);
        }
    });

    const cleanTypenames = (object) => {
        const omitTypename = (key, value) => (key === "__typename" ? undefined : value);

        return JSON.parse(JSON.stringify(object), omitTypename);
    }

    const handleSelectShippingAddress = async (address) => {
        const addressId = address._id;
        delete address._id;

        const input = {
            ...cartIdAndCartToken(),
            address: cleanTypenames(address),
            addressId
        };

        if (selectedAccount) Object.assign(input, { accountId: selectedAccount._id });

        try {
            await setShippingAddressOnCart({
                variables: {
                    input
                }
            });
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar(error.message.replace("GraphQL error: ", ""), { variant: "error" });
        }
    }

    const handleUpdateFulfillmentOptionsForGroup = async (fulfillmentGroupId) => {
        const input = {
            ...cartIdAndCartToken(),
            fulfillmentGroupId
        };
        if (selectedAccount) {
            Object.assign(input, { accountId: selectedAccount._id });
        }

        await updateFulfillmentOptionsForGroup({
            variables: {
                input
            }
        })
    };

    const [
        placeOrder,
        { loading: placingOrder }
    ] = useMutation(placeOrderMutation, {
        onCompleted({ placeOrderFromDraftOrder }) {
            console.log(placeOrderFromDraftOrder);
        }
    });

    const buildOrder = async () => {
        const { checkout } = cart;
        if (!selectedAccount) throw new Error("Debes seleccionar un cliente");

        console.log(cart);
        const fulfillmentGroups = (checkout.fulfillmentGroups || []).map((group) => {
            const { data } = group;
            let { selectedFulfillmentOption } = group;

            const items = cart.items.edges.map(({ node: item }) => ({
                addedAt: item.addedAt,
                price: item.price.amount,
                productConfiguration: item.productConfiguration,
                quantity: item.quantity,
                metafields: item.metafields || []
            }));
            if (!selectedFulfillmentOption || selectedFulfillmentOption == null) {
                throw new Error("No has seleccionado una dirección de envío");
            }
            return {
                data,
                items,
                selectedFulfillmentMethodId: selectedFulfillmentOption.fulfillmentMethod._id,
                shopId: group.shop._id,
                totalPrice: checkout.summary.total.amount,
                type: group.type
            };
        });

        return {
            cartId: cart._id,
            currencyCode: checkout.summary.total.currency.code,
            email: selectedAccount.primaryEmailAddress,
            fulfillmentGroups,
            shopId
        };
    };

    const buildPayment = [{
        amount: cart && cart.checkout && cart.checkout.summary.total.amount,
        method: "none"
    }];

    const buildBilling = {
        customerName: "CF",
        nit: "CF",
        address: "ciudad",
        country: "GUATEMALA",
        depto: "GUATEMALA",
        city: "GUATEMALA"
    }

    const handlePlaceOrder = async () => {
        const order = cleanTypenames(await buildOrder());

        Object.assign(order, { billing: buildBilling });
        const input = {
            order
        };
        if (selectedAccount) Object.assign(input, { accountId: selectedAccount._id });
        Object.assign(input, { payments: buildPayment });
        Object.assign(input, { billing: buildBilling });

        try {
            await placeOrder({
                variables: {
                    input
                }
            });
            enqueueSnackbar("Orden creada correctamente!", { variant: "success" });
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar(error.message.replace("GraphQL error: ", ""), { variant: "error" });
        }
    };

    return {
        isLoadingProducts,
        products,
        selectedProducts,
        selectedAccount,
        selectedAddress,
        selectedFulfillmentMethod,
        selectedFulfillmentType,
        addDraftOrderItems,
        changeItemQuantity,
        setSelectedAccount: handleSelectAccount,
        selectAccount: setSelectedAccount,
        setSelectedAddress: handleSelectShippingAddress,
        setSelectedFulfillmentMethod: handleSelectFulfillmentMethod,
        setSelectedFulfillmentType: handleSelectFulfillmentType,
        removeItem,
        setQuery,
        shopId,
        query,
        draftOrder,
        cart,
        addItemsToCart: handleAddItemsToCart,
        handlePlaceOrder,
        placingOrder
    }
}

export default useDraftOrder;