import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useIsMount } from "../helpers";
import accountsQuery from "../graphql/queries/accounts";
import { useQuery, useMutation } from "@apollo/react-hooks";
/**
 * @method useAccounts
 * @summary useAccounts hook
 * @returns {Object}
 */
function useAccounts() {
    const { enqueueSnackbar } = useSnackbar();
    const isMounted = useIsMount();
    const [query, setQuery] = useState("");

    /**Query to get all accounts */
    const { data: accountsQueryResult, isLoading: isLoadingAccounts, refetch: refetchAccounts } = useQuery(accountsQuery, {
        variables: {
            query
        }
    });

    const { accounts } = accountsQueryResult || {};

    /**Re-fetch accounts every time the query has changed */
    useEffect(() => {

        if (!isMounted) {
            refetchAccounts();
        }
    }, [query]);

    return {
        accounts: accounts && accounts.nodes || [],
        isLoadingAccounts,
        accountsQuery: query,
        setAccountsQuery: setQuery
    };
}

export default useAccounts;
