import { useState, useCallback, useEffect } from "react";
import productsQuery from "../graphql/queries/products";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useIsMount } from "../helpers";

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
        shopId: shopIdProp
    } = args;

    const routeParams = useParams();
    const shopId = routeParams.shopId || shopIdProp;
    const [query, setQuery] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedFulfillmentMethod, setSelectedFulfillmentMethod] = useState(null);

    /**Query to get products */
    const { data: productsQueryResult, isLoading: isLoadingProducts, refetch: refetchProducts } = useQuery(productsQuery, {
        variables: {
            shopIds: [shopId],
            query
        },
        skip: !shopId
    });

    const { products } = productsQueryResult || {};

    const addDraftOrderItems = (items) => {
        console.log(items);
        const itemsWithQuantity = items.map((curr) => ({ ...curr, quantity: 1 }));
        setSelectedProducts((current) => [...current, ...itemsWithQuantity]);
    };

    const changeItemQuantity = (id, quantity) => {
        const currSelectedProducts = [...selectedProducts];
        const productItems = [];
        currSelectedProducts.forEach((item) => {
            const currQuantity = item.quantity + quantity;

            if(item._id == id && currQuantity > 0) {
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

    const removeItem = (id) => {
        const currSelectedProducts = [...selectedProducts];

        const productsWithoutItem =  currSelectedProducts.filter((item)=> item._id !== id);

        setSelectedProducts(productsWithoutItem);
    };

    /**Re-fetch products every time the query has changed*/
    useEffect(() => {

        if (!isMounted) {
            refetchProducts();
        }
    }, [query]);

    return {
        isLoadingProducts,
        products,
        selectedProducts,
        selectedAccount,
        selectedAddress,
        selectedFulfillmentMethod,
        addDraftOrderItems,
        changeItemQuantity,
        setSelectedAccount,
        setSelectedAddress,
        setSelectedFulfillmentMethod,
        removeItem,
        setQuery,
        shopId,
        query
    }
}

export default useDraftOrder;