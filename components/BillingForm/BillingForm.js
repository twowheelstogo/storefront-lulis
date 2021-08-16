import React, { Component } from "react";
import uniqueId from "lodash.uniqueid";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import { applyTheme } from "@reactioncommerce/components/utils";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	input: {
		width: "100%"
	}
});
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColHalf = styled.div`
    flex: 0 1 calc(50% - 2px);
    padding:2px;
    @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
    flex: 0 1 calc(50% - 9px);
    }
`;

const ColFull = styled.div`
  flex: 1 1 100%;
`;



class BillingFormAction extends Component {
	constructor(props){
		super(props);
	}
    static defaultProps = {
    	placeholderProps: "Ingrese...",
    	isOnDarkBackground: false,
    	nitBillingLabelText: "Nit",
    	nameBillingLabelText: "Nombre",
    	addresBillingLabelText: "Dirección",
		cfBillingLabelText: "Consumido final"
    }

    uniqueInstanceIdentifier = uniqueId("BillingForm_");
	componentDidMount() {
		this._isMounted = true;
	}
  
	componentWillUnmount() {
		this._isMounted = false;
	}
   
	handleOnChange (key, value = ""){
		if (value == undefined){
			return;
		}
		const {onChange} = this.props;
		let _json = {};
		if(key === "isCf"){
			if(value === true){
				_json = {
					nit:"",
					name:"CF",
					address:"guatemala"
				};
			}else{
				_json = {
					nit:"",
					name:"",
					address:"guatemala"
				};
			}
		}
		_json[key] = value;
		onChange(_json);
	}
    render() {
		if(!this._isMounted){
			return (<p>Cargando...</p>);
		}
    	const {
    		components: { Field, TextInput, Checkbox, InlineAlert },
    		isReadOnly,
    		isSaving,
    		placeholderProps,
    		isOnDarkBackground,
    		nameBillingLabelText,
    		nitBillingLabelText,
    		addresBillingLabelText,
			cfBillingLabelText,
    		classes,
			isCf,
			nitValue,
			nameValue,
			addressValue,
			alert
    	} = this.props;
    	const nitbillingForm = `nitbilling_${this.uniqueInstanceIdentifier}`;
    	const namebillingForm = `namebiiling_${this.uniqueInstanceIdentifier}`;
    	const addresbillingForm = `addresbilling_${this.uniqueInstanceIdentifier}`;
    	return (
			<div>
				{alert ? <InlineAlert {...alert}/>:""}
				<Grid>
					<ColFull>
						<Checkbox label={cfBillingLabelText} name="isCf" value={isCf} onChange={(val)=>{this.handleOnChange("isCf", val)}} />
					</ColFull>
					<ColHalf>
						<Field name="nit" label={nitBillingLabelText} labelFor={nitbillingForm}>
							<TextInput
								className={classes.input}
								id={nitbillingForm}
								name='nit'
								placeholder={placeholderProps}
								isOnDarkBackground={isOnDarkBackground}
								isReadOnly={isCf || isSaving || isReadOnly}
								onChange={(val) => this.handleOnChange('nit',val)}
								type="number"
								value={nitValue}
							/>
						</Field>
					</ColHalf>
					<ColHalf>
						<Field name="name" label={nameBillingLabelText} labelFor={namebillingForm}>
							<TextInput
								className={classes.input}
								id={namebillingForm}
								name='name'
								placeholder={placeholderProps}
								isOnDarkBackground={isOnDarkBackground}
								isReadOnly={isCf || isSaving || isReadOnly}
								onChange={(val) => this.handleOnChange('name',val)}
								value={nameValue}
							/>
						</Field>
					</ColHalf>
					<ColFull>
						<Field name="address" label={addresBillingLabelText} labelFor={addresbillingForm} isOptional>
							<TextInput
								id={addresbillingForm}
								name='address'
								placeholder={placeholderProps}
								isOnDarkBackground={isOnDarkBackground}
								isReadOnly={isCf || isSaving || isReadOnly}
								onChange={(val) => this.handleOnChange('address',val)}
								value={addressValue}
							/>
						</Field>
					</ColFull>
				</Grid>
			</div>
    	);
    }
}
export default withStyles(styles)(withComponents(BillingFormAction));