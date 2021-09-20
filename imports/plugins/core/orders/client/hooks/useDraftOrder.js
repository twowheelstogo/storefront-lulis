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
    addCartItemsMutation,
    reconcileCartsMutation,
    removeCartItemsMutation,
    setFulfillmentOptionCartMutation,
    setShippingAddressCartMutation,
    setEmailOnAnonymousCartMutation,
    updateCartItemsQuantityMutation,
    updateFulfillmentOptionsForGroup,
    updateFulfillmentTypeForGroup
} from "../graphql/mutations/cart";
import {
    createDraftOrderCartMutation,
    addDraftOrderAccountMutation
} from "../graphql/mutations/draftOrder";

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
        console.log(items);
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
        }] = useMutation(cart && cart._id ? addCartItemsMutation : createDraftOrderCartMutation);

    const handleAddItemsToCart = async (items) => {
        const input = {};

        if (!cart) {
            input = {
                draftOrderId,
                shopId
            };

            if (selectedAccount) {
                input.accountId = selectedAccount._id;
            }

            input.createCartInput = {
                shopId,
                items
            };

        } else {
            input = {
                items
            };

            if (cart._id) {
                input.cartId = cart._id;
            }

            if (anonymousCartId) {
                input.cartId = anonymousCartId;
            }

            if (anonymousCartToken) {
                input.cartToken = anonymousCartToken;
            }
        }

        await addOrCreateCartMutation({
            variables: {
                input
            }
        });
        refetchCart();
    };

    useEffect(() => {

        if (!isMounted) {
            if (draftOrder?.cartToken) {
                setAnonymousCartId(draftOrder.cartId);
                setAnonymousCartToken(draftOrder.cartToken);
                refetchAnonymousCart();
            }
            else if (draftOrder?.accountId) {
                setAnonymousCartId(null);
                setAnonymousCartToken(null);
                refetchAccountCart();
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
        if (!accountCartQueryCalled && !shouldSkipAccountCartByAccountIdQuery) {
            fetchAccountCart();
        } else if (!anonymousCartQueryCalled && !shouldSkipAnonymousCartByCartIdQuery) {
            fetchAnonymousCart();
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

    const handleSelectAccount = (item) => {

        setSelectedAddress(null);
        setSelectedAccount(item);
    };

    const handleSelectFulfillmentType = (item) => {

        setSelectedAddress(null);
        setSelectedFulfillmentType(item);
    };

    const handleSelectFulfillmentMethod = (item) => {

        setSelectedFulfillmentMethod(item);
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
        setSelectedAddress: handleSelectAddress,
        setSelectedFulfillmentMethod: handleSelectFulfillmentMethod,
        setSelectedFulfillmentType: handleSelectFulfillmentType,
        removeItem,
        setQuery,
        shopId,
        query,
        draftOrder,
        cart,
        addItemsToCart: handleAddItemsToCart,

    }
}

export default useDraftOrder;