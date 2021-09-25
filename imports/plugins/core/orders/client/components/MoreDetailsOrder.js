import React from "react";
import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { TextField, Button } from "@reactioncommerce/catalyst";
import styled from "styled-components";
import BillingServices from "../helpers/billingServices";
import PropTypes from "prop-types";
import { useReactOidc } from "@axa-fr/react-oidc-context";

const InputGrid = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const ColFull = styled.div`
    flex: 1 1 100%;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const InputCol = styled.div`
    display: flex;
    flex: 1 1 auto;
`;

/**
 * @name MoreDetailsOrder
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */
function MoreDetailsOrder(props) {
    const { handleChangeBillingDetails, value } = props;
    const { oidcUser } = useReactOidc();
    const { access_token: accessToken } = oidcUser || {};

    const handleSearchCustomer = async () => {
        const service = await BillingServices.getNit(value?.nit, accessToken);
        console.log(service);
        if (service.hasData) {
            handleChangeBillingDetails({
                ...value,
                name: service.name,
                address: service.street,
                isCf: false,
                partnerId: service.partnerId
            });
        }
    };

    const handleChange = (event) => handleChangeBillingDetails({
        ...value,
        [event.target.id]: event.target.value
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title={"Datos de facturación"} />
                    <CardContent>
                        <Grid item xs={12}>
                            <InputGrid>
                                <InputCol>
                                    <TextField
                                        name="nit"
                                        id="nit"
                                        placeholder="Nit"
                                        onChange={handleChange}
                                    />
                                </InputCol>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleSearchCustomer}
                                >{"Buscar"}</Button>
                            </InputGrid>
                            <ColFull>
                                <TextField
                                    id="name"
                                    name="name"
                                    placeholder="Nombre completo"
                                    onChange={handleChange}
                                />
                            </ColFull>
                            <ColFull>
                                <TextField
                                    id="address"
                                    name="address"
                                    placeholder="Dirección"
                                    onChange={handleChange}
                                />
                            </ColFull>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title={"Notas de regalo"} />
                    <CardContent>{"Detalles"}</CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

MoreDetailsOrder.propTypes = {
    value: PropTypes.shape({
        nit: PropTypes.string,
        name: PropTypes.string,
        address: PropTypes.string
    }),
    handleChange: PropTypes.func
};

MoreDetailsOrder.defaultProps = {
    value: {
        nit: "",
        name: "",
        isCf: true,
        address: "ciudad",
        country: "GUATEMALA",
        depto: "GUATEMALA",
        city: "GUATEMALA"
    },
    handleChangeBillingDetails() { }
};

export default MoreDetailsOrder;
