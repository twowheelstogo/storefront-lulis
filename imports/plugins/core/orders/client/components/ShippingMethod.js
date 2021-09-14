import React from "react";
import { Card, CardContent, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styled from "styled-components";

const styles = (theme) => ({
    radioLabel: {
        fontSize: "14px"
    }
})

const CustomTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #3c3c3c;
    letter-spacing: 0.5px;
`;

const CardContainer = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
`;

const StyledRadio = withStyles({
    root: {
        color: "#3c3c3c"
    }
})((props) => <Radio color="default" {...props} />);

const Item = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    padding: 0px;
    justify-content: space-between;
    align-items: center;
`;

const ItemTitle = styled.div`
    font-weight: 600;
    font-size: 14px;
    color: #3B4256;
`;

const ItemSubtitle = styled.div`
    font-weight: 400;
    font-size: 14px;
`;

const ItemContent = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
`;

/**
 * @name ShippingMethod
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */

const RadioItem = ({ handleChange, selected, value, title, subtitle }) => (
    <Item>
        <StyledRadio
            checked={selected}
            onChange={handleChange}
            value={value}
            name={title}
        />
        <ItemContent>
            {title && <ItemTitle>{title}</ItemTitle>}
            <ItemSubtitle>{subtitle}</ItemSubtitle>
        </ItemContent>
    </Item>
);

function ShippingMethod(props) {
    const {
        selectedAccount,
        selectedAddress,
        selectedFulfillmentMethod,
        selectedFulfillmentType,
        selectShippingAddress,
        selectFulfillmentMethod,
        selectFulfillmentType,
        classes
    } = props;

    const handleChange = (event) => selectFulfillmentType(event.target.value);

    function renderShippingMethod() {
        return (
            <div>
                <CustomTitle>{"Dirección de envío"}</CustomTitle>
            </div>
        );
    }

    function renderPickupMethod() {
        return (
            <div>
                <CustomTitle>{"Fecha de entrega"}</CustomTitle>
            </div>
        );
    }

    return (
        <Card>
            <CardContent>
                <CustomTitle>{"Método de entrega"}</CustomTitle>
                <CardContainer>
                    <RadioItem
                        selected={selectedFulfillmentType === "shipping"}
                        handleChange={handleChange}
                        value="shipping"
                        subtitle="Entrega a domicilio"
                    />
                    <RadioItem
                        selected={selectedFulfillmentType === "pickup"}
                        handleChange={handleChange}
                        value="pickup"
                        subtitle="Recoger en tienda"
                    />
                </CardContainer>
                {selectedFulfillmentType == "shipping" && renderShippingMethod()}
                {selectedFulfillmentType == "pickup" && renderPickupMethod()}
            </CardContent>
        </Card>
    );
}

ShippingMethod.propTypes = {
    selectedAccount: PropTypes.object,
    selectedAddress: PropTypes.object,
    selectedFulfillmentMethod: PropTypes.object,
    selectedFulfillmentType: PropTypes.object,
    selectShippingAddress: PropTypes.func,
    selectFulfillmentMethod: PropTypes.func,
    selectFulfillmentType: PropTypes.func,
    classes: PropTypes.any
};

ShippingMethod.defaultProps = {
    selectedAccount: null,
    selectShippingAddress() { },
    selectFulfillmentMethod() { },
    selectFulfillmentType() { },
    selectedAddress: null,
    selectedFulfillmentMethod: null,
    selectedFulfillmentType: null
};

export default withStyles(styles)(ShippingMethod);
