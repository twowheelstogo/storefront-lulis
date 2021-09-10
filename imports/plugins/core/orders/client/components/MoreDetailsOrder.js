import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";


/**
 * @name MoreDetailsOrder
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */
function MoreDetailsOrder(props) {
    return  (
        <Card>
            <CardHeader title={"Notas"}/>
            <CardContent>{"Detalles"}</CardContent>
        </Card>
    );
}

export default MoreDetailsOrder;
