import React, { Component, Fragment } from "react";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import { Form } from "reacto-form";
import uniqueId from "lodash.uniqueid";
import { getRequiredValidator, applyTheme } from "@reactioncommerce/components/utils";
// import MyLocation from "@material-ui/icons/MyLocation";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColFull = styled.div`
  flex: 1 1 100%;
`;
const FieldTitle = styled.div`
  font-size: 14px;
  color: #242356;
  font-weight: 700;
  @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
    font-size: 18px;
  }
`;

class AddressForm extends Component {
  uniqueInstanceIdentifier = uniqueId("AddressForm_");
  _form = null;
  static defaultProps = {
    onSubmit: () => {},
    onChange: () => {},
    value: {
      address: "",
      description: "",
      reference: "",
      receiver: "",
      phone: ""
    },
    validator: getRequiredValidator("address", "description"),
  };
  submit = () => {
    this._form.submit();
  };
  getValue = () => this._form.getValue();
  render() {
    const {
      components: { Field, TextInput, ErrorsBlock },
      onSubmit,
      value,
      onChange,
      validator,
      // searchBoxProps,
      // googleMapProps,
      // onCurrentPosition,
      // handleSearchAddress,
    } = this.props;
    const addressInputId = `addressInput_${this.uniqueInstanceIdentifier}`;
    const referenceInputId = `referenceInput_${this.uniqueInstanceIdentifier}`;
    const descriptionInputId = `descriptionInput_${this.uniqueInstanceIdentifier}`;
    const receiverInputId = `receiverInput_${this.uniqueInstanceIdentifier}`;
    const phoneInputId = `phoneInput_${this.uniqueInstanceIdentifier}`;

    return (
      <Fragment>
        <Form
          ref={(formEl) => (this._form = formEl)}
          onSubmit={onSubmit}
          value={value}
          revalidateOn="changed"
          onChange={onChange}
          validator={validator}
        >
          <Grid className="address-form">
            {/* <ColFull>
              <span>Utilizar mi direcci??n actual:</span>
              <MyLocation onClick={() => onCurrentPosition()} style={{ cursor: "pointer" }} />
            </ColFull> */}
            <ColFull>
              <FieldTitle>{"Direcci??n Completa"}</FieldTitle>
              <Field name="address" label="Obligatorio" labelFor={addressInputId} isRequired>
                <TextInput
                  id={addressInputId}
                  name="address"
                  placeholder="ej. 5av 5-55 Edificio Europlaza, Guatemala ciudad"
                  // onChange={handleSearchAddress}
                />
              </Field>
              <ErrorsBlock names={["address"]} />
            </ColFull>
            <ColFull>
              <FieldTitle>{"Detalles de la direcci??n"}</FieldTitle>
              <Field name="reference" labelFor={referenceInputId} isOptional>
                <TextInput
                  id={referenceInputId}
                  name="reference"
                  placeholder="No de casa, apto, nivel, referencia sobre como llegar, etc."
                />
              </Field>
            </ColFull>
            <ColFull>
              <FieldTitle>{"Descripci??n"}</FieldTitle>
              <Field name="description" label="Obligatorio" labelFor={descriptionInputId} isRequired>
                <TextInput id={descriptionInputId} name="description" placeholder="ej. Casa, Trabajo." />
                <ErrorsBlock names={["description"]} />
              </Field>
            </ColFull>
            <ColFull>
              <FieldTitle>{"??Qui??n recibe la orden?"}</FieldTitle>
              <Field name="receiver" label="Obligatorio" labelFor={receiverInputId} isRequired>
                <TextInput id={receiverInputId} name="receiver" placeholder="Escribe aqu??" />
                <ErrorsBlock names={["receiver"]} />
              </Field>
            </ColFull>
            <ColFull>
              <FieldTitle>{"Tel??fono de qui??n recibe"}</FieldTitle>
              <Field name="phone" label="Obligatorio" labelFor={phoneInputId} isRequired>
                <TextInput id={phoneInputId} name="phone" placeholder="Escribe aqu??" />
                <ErrorsBlock names={["phone"]} />
              </Field>
            </ColFull>
          </Grid>
        </Form>
      </Fragment>
    );
  }
}
export default withComponents(AddressForm);
