import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";


/**
 * @name OrderSummary
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */
function OrderSummary(props) {
    return  (
        <Card>
            <CardHeader title={"Pago"}/>
            <CardContent>{"Detalles"}</CardContent>
        </Card>
    );
}

export default OrderSummary;
