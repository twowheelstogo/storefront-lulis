import React, { Component, Fragment } from "react";
import { Form } from "reacto-form";
import { withComponents } from "@reactioncommerce/components-context";
import { CustomPropTypes, applyTheme, getRequiredValidator } from "@reactioncommerce/components/utils";
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
class PickupForm extends Component {
	static propTypes = {
		components: PropTypes.shape({
			Field: CustomPropTypes.component.isRequired,
			TextInput: CustomPropTypes.component.isRequired
		})
	}

	_form = null;

	uniqueInstanceIdentifier = uniqueId("AddressForm_");
	submit = () => {
		this._form.submit();
	}
	static defaultProps = {
		name: "pickup",
		onChange: () => { },
		onSubmit: () => { },
		value: {
			pickupDate: "",
			pickupTime: ""
		},
		validator: getRequiredValidator("pickupDate", "pickupTime")
	}
	render() {
		const {
			components: {
				Field,
				TextInput,
				ErrorsBlock
			},
			value,
			onChange,
			onSubmit,
			name,
			validator
		} = this.props;
		const pickupDateInputId = `pickupDate_${this.uniqueInstanceIdentifier}`;
		const pickupTimeInputId = `pickupTime_${this.uniqueInstanceIdentifier}`;
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
					<ColHalf>
						<Field name="pickupDate" label="Fecha de pickup" labelFor={pickupDateInputId} isRequired>
							<TextInput
								id={pickupDateInputId}
								name="pickupDate"
								placeholder={"Fecha"}
								type={"date"}
								onChange={(input) => console.log(input)}
							// isReadOnly={isSaving || isReadOnly}
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
								type={"time"}
							// isReadOnly={isSaving || isReadOnly}
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