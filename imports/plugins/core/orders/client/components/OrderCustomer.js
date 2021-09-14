import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import PropTypes from "prop-types";
import { TextField } from "@reactioncommerce/catalyst";
import styled from "styled-components";
import { Popper, Grow } from "@material-ui/core";
import AccountList from "./AccountList";

const InputGrid = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
`;

const AccountContent = styled.div`
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const CustomTitle = styled.div`
    font-size: 14px;
    font-weight: 700;
    color: #3C5D6F;
`;

const CustomContent = styled.div`
    font-size: 14px;
    color: black;
`

const InputCol = styled.div`
    display: flex;
    flex: 1 1 auto;
`;

/**
 * @name OrderCustomer
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */
function OrderCustomer(props) {
    const { accounts, isLoadingAccounts, accountsQuery, setAccountsQuery, selectedAccount, setSelectedAccount } = props;
    const anchorRef = React.useRef(null);
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleChange = (event) => setAccountsQuery(event.target.value);

    const handleSelect = (item) => {

        setSelectedAccount(item);
        setOpen(false);
    }

    return (
        <Card>
            <CardHeader title={"Cliente"} />
            <CardContent>
                <InputGrid>
                    <InputCol>
                        <TextField
                            placeholder="Buscar..."
                            ref={anchorRef}
                            onClick={handleToggle}
                            onFocus={handleToggle}
                            onChange={handleChange}
                        />
                    </InputCol>
                </InputGrid>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ width: anchorRef.current?.clientWidth || "200px", zIndex: 1300 }}>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <AccountList
                                handleClose={handleClose}
                                isLoading={isLoadingAccounts}
                                accounts={accounts}
                                handleSelect={handleSelect}
                            />
                        </Grow>
                    )}
                </Popper>
                {selectedAccount && (
                    <AccountContent>
                        <CustomTitle>{"Información de contacto"}</CustomTitle>
                        <CustomContent>{selectedAccount.name || "Sin nombre"}</CustomContent>
                        <CustomContent>{selectedAccount.primaryEmailAddress}</CustomContent>
                    </AccountContent>
                )}
            </CardContent>
        </Card>
    );
}

OrderCustomer.propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.object),
    isLoadingAccounts: PropTypes.bool,
    accountsQuery: PropTypes.string,
    setAccountsQuery: PropTypes.func,
    selectedAccount: PropTypes.object,
    setSelectedAccount: PropTypes.func
};

OrderCustomer.defaultProps = {
    accounts: [],
    accountsQuery: "",
    setAccountsQuery() { },
    selectedAccount: {},
    setSelectedAccount() { }
};

export default OrderCustomer;
