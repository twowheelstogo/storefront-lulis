import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";


/**
 * @name ShippingMethod
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */
function ShippingMethod(props) {
    return  (
        <Card>
            <CardHeader title={"Método de entrega"}/>
            <CardContent>{"Detalles"}</CardContent>
        </Card>
    );
}

export default ShippingMethod;
