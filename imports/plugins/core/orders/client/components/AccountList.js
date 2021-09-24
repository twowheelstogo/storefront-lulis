import React, { useState } from "react";
import { ClickAwayListener, Divider, Button } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import PlusCircleIcon from "mdi-material-ui/PlusCircle";

const Card = styled.div`
    background: white;
    border: 1px solid #dcdcdc;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
`;

const CardHeader = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 5px;
`;

const CardContent = styled.div`
    padding-top: 5px;
    padding-bottom: 5px;
    max-height: 500px;
    overflow-y: scroll;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const Item = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex-grow: 1;
    width: 100%;
    border-bottom: 1px solid #dcdcdc;
    box-sizing: border-box;
    padding: 5px;
    &:last-of-type {
    border-bottom: none;
    }
    > * {
    box-sizing: border-box;
    }
    &:hover {
        background: #dcdcdc;
    }
`;

const ItemTitle = styled.div`
    font-size: 14px;
    color: black;
`;

const ItemSubtitle = styled.div`
    font-size: 14px;
    color: #808080;
`;

/**
 * @name AccountList
 * @param {Object} props component props 
 * @returns {React.Component} returns a react component
 */
function AccountList(props) {
    const { handleClose, accounts, isLoading, handleSelect, accountOpen } = props;

    function renderAccountList() {
        return (
            <List>
                {accounts.map((account, index) => (
                    <Item key={`${index}`} onClick={() => handleSelect(account)}>
                        <ItemTitle>{account.name || "Sin nombre"}</ItemTitle>
                        <ItemSubtitle>{account.primaryEmailAddress}</ItemSubtitle>
                    </Item>
                ))}
            </List>
        );
    }

    return (
        <Card>
            <ClickAwayListener onClickAway={handleClose}>
                <div>
                    <CardHeader>
                        <Button
                            size="small"
                            startIcon={<PlusCircleIcon />}
                            onClick={accountOpen}
                        >{"Crear un nuevo cliente"}</Button>
                    </CardHeader>
                    <Divider />
                    <CardContent>
                        {isLoading && <div>loading...</div>}
                        {accounts.length > 0
                            ? renderAccountList() : (
                                <div>Sin Resultados</div>
                            )}
                    </CardContent>
                </div>
            </ClickAwayListener>
        </Card>
    );
}

AccountList.propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.object),
    handleClose: PropTypes.func,
    isLoading: PropTypes.bool,
    handleSelect: PropTypes.func,
    accountOpen: PropTypes.func,
};

AccountList.defaultProps = {
    accounts: [],
    handleClose() { },
    handleSelect() { },
    accountOpen() { }
};

export default AccountList;
