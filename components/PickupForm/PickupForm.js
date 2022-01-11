import React, { Component, Fragment } from "react";
import { Form } from "reacto-form";
import { withComponents } from "@reactioncommerce/components-context";
import { CustomPropTypes, applyTheme, getRequiredValidator } from "@reactioncommerce/components/utils";
import PropTypes from "prop-types";
import styled from "styled-components";
import SelectBranch from "components/Branches/SelectBranch";
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

function join(t, a, s) {
  function format(m) {
    let f = new Intl.DateTimeFormat("en", m);
    const isMinor = Boolean(Number(f.format(t)) < 10);
    return isMinor ? `0${f.format(t)}` : f.format(t);
  }
  return a.map(format).join(s);
}

class PickupForm extends Component {
  static propTypes = {
    components: PropTypes.shape({
      Field: CustomPropTypes.component.isRequired,
      TextInput: CustomPropTypes.component.isRequired,
    }),
  };

  _form = null;

  uniqueInstanceIdentifier = uniqueId("AddressForm_");
  submit = () => {
    this._form.submit();
  };
  static defaultProps = {
    name: "pickup",
    onChange: () => {},
    onSubmit: () => {},
    value: {
      pickupDate: "",
      pickupTime: "",
      branchId: "",
      branchName: "",
    },
    validator: getRequiredValidator("pickupDate", "pickupTime"),
  };
  state = {
    branch: this.props.value ? this.props.value.branchName : "",
    branchId: this.props.value ? this.props.value.branchId : "",
  };
  render() {
    const {
      components: { Field, TextInput, ErrorsBlock },
      value,
      onChange,
      onSubmit,
      name,
      validator,
    } = this.props;
    const pickupBranchSelectInputId = `pickupSelectBranchId_${this.uniqueInstanceIdentifier}`;
    const pickupBranchInputId = `pickupBranchId_${this.uniqueInstanceIdentifier}`;
    const pickupBranchInput = `pickupBranch_${this.uniqueInstanceIdentifier}`;
    const pickupDateInputId = `pickupDate_${this.uniqueInstanceIdentifier}`;
    const pickupTimeInputId = `pickupTime_${this.uniqueInstanceIdentifier}`;
    const options = [{ year: "numeric" }, { month: "numeric" }, { day: "numeric" }];
    const today = new Date();
    const minDate = join(today, options, "-");
    const maxDate = join(new Date(today.setHours(24)), options, "-");

    const minTime = today;
    minTime.setHours(-1);
    minTime.setMinutes(today.getMinutes() + 20);
    const formatMinTime = minTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const hookChange = (val) => {
      this.setState({
        branch: val.generalData.name,
        branchId: val._id,
      });
    };
    return (
      <Form
        ref={(formEl) => {
          this._form = formEl;
        }}
        onChange={onChange}
        onSubmit={onSubmit}
        name={name}
        value={value}
        revalidateOn="changed"
        validator={validator}
      >
        <Grid>
          <div style={{ display: "none" }}>
            <ColHalf>
              <Field name="pickupBranch" label="Sucursal" labelFor={pickupBranchSelectInputId} isRequired>
                <SelectBranch hookChange={hookChange} defaultId={this.state.branchId} />
              </Field>
              <Field name="branchName" label="Nombre de la sucursal" labelFor={pickupBranchInput}>
                <TextInput id={pickupBranchInput} name="branchName" value={this.state.branch} />
              </Field>
              <Field name="branchId" label="Id de la sucursal" labelFor={pickupBranchInputId}>
                <TextInput id={pickupBranchInputId} name="branchId" value={this.state.branchId} />
              </Field>
            </ColHalf>
          </div>
          <ColHalf>
            <Field name="pickupDate" label="Fecha de pickup" labelFor={pickupDateInputId} isRequired>
              <TextInput
                id={pickupDateInputId}
                name="pickupDate"
                placeholder={"Fecha"}
                type={"date"}
                min={minDate}
                max={maxDate}
              />
              <ErrorsBlock names={["pickupDate"]} />
            </Field>
          </ColHalf>
          <ColHalf>
            <Field name="pickupTime" label="Hora de pickup" labelFor={pickupTimeInputId} isRequired>
              <TextInput
                id={pickupTimeInputId}
                name="pickupTime"
                placeholder={"Hora"}
                type="time"
                min={"12:00"}
                step="600"
              />
              <ErrorsBlock names={["pickupTime"]} />
            </Field>
          </ColHalf>
        </Grid>
      </Form>
    );
  }
}
export default withComponents(PickupForm);
