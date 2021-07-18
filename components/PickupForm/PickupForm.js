import React, { Component, Fragment } from "react";
import { Form } from "reacto-form";
import { withComponents } from "@reactioncommerce/components-context";
import { CustomPropTypes, applyTheme } from "@reactioncommerce/components/utils";
import PropTypes from "prop-types";
import styled from "styled-components";
import { uniqueId } from "lodash";
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColFull = styled.div`
  flex: 1 1 100%;
`;

const ColHalf = styled.div`
  flex: 1 1 100%;
  @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
    flex: 0 1 calc(50% - 9px);
  }
`;
class PickupForm extends Component{
    static propTypes = {
        components: PropTypes.shape({
            Field: CustomPropTypes.component.isRequired,
            TextInput: CustomPropTypes.component.isRequired
        })
    }

    _form = null;

    uniqueInstanceIdentifier = uniqueId("AddressForm_");
    onChange = () => {

    }
    onSubmit = () => {

    }
    static defaultProps = {
        name: "pickup",
        onChange: () => {},
        onSubmit: () => {},
        value: {
            pickupDate: "20210721",
            pickupTime: ""
        }
    } 
    render(){
        const {
            components:{
                Field,
                TextInput
            },
            value,
            onChange,
            onSubmit,
            name
        } = this.props;
        const pickupDateInputId = `pickupDate_${this.uniqueInstanceIdentifier}`;
        const pickupTimeInputId = `pickupTime_${this.uniqueInstanceIdentifier}`;
        return(
            <Form
            ref = {(formEl) => {
                this._form = formEl;
            }}
            onChange = {onChange}
            onSubmit = {onSubmit}
            name = {name}
            value = {value}
            revalidateOn = "changed"
            >
                <Grid>
                    <ColHalf>
                    <Field name="pickupDate" label="Fecha de recogida" labelFor={pickupDateInputId} isRequired>
                    <TextInput
                        id={pickupDateInputId}
                        name="pickupDate"
                        placeholder={"Fecha"}
                        type={"date"}
                        onChange = {(input) => console.log(input)}
                        // isReadOnly={isSaving || isReadOnly}
                    />
                    </Field>
                    </ColHalf>
                    <ColHalf>
                    <Field name="pickupTime" label="Hora de recogida" labelFor={pickupTimeInputId} isRequired>
                    <TextInput
                        id={pickupTimeInputId}
                        name="pickupTime"
                        placeholder={"Hora"}
                        type={"time"}
                        // isReadOnly={isSaving || isReadOnly}
                    />
                    </Field>
                    </ColHalf>
                </Grid>
            </Form>
        );
    }
}
export default withComponents(PickupForm);