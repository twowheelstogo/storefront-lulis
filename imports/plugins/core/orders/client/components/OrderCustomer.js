import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";

/**
 * @name OrderCustomer
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */
function OrderCustomer(props) {
    
    return (
        <Card>
            <CardHeader title={"Cliente"}/>
            <CardContent>{"Detalles"}</CardContent>
        </Card>
    ); 
}

export default OrderCustomer;
