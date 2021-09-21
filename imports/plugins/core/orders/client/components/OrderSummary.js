import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Title1 = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: black;
`;

/**
 * @name OrderSummary
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */
function OrderSummary(props) {
    const { summary } = props;

    const {fulfillmentTotal, itemTotal, taxTotal, discountTotal, total} = summary || {};

    return (
        <Card>
            <CardHeader title={"Pago"} />
            <CardContent>
                <Grid>
                    <Row>
                        <div>{"Subtotal"}</div>
                        <div>{itemTotal?.displayAmount || "-"}</div>
                    </Row>
                    <Row>
                        <div>{"Envío"}</div>
                        <div>{fulfillmentTotal?.displayAmount || "-"}</div>
                    </Row>
                    <Row>
                        <div>{"Descuento"}</div>
                        <div>{discountTotal?.displayAmount || "-"}</div>
                    </Row>
                    <Row>
                        <div>{"Impuesto"}</div>
                        <div>{taxTotal?.displayAmount || "-"}</div>
                    </Row>
                    <Row>
                        <Title1>{"Total"}</Title1>
                        <Title1>{total?.displayAmount || "-"}</Title1>
                    </Row>
                </Grid>
            </CardContent>
        </Card>
    );
}

OrderSummary.propTypes = {
    summary: PropTypes.shape({
        fulfillmentTotal: PropTypes.object,
        itemTotal: PropTypes.object,
        taxTotal: PropTypes.object,
        discountTotal: PropTypes.object,
        total: PropTypes.object
    })
};

export default OrderSummary;
