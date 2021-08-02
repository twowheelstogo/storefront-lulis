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

    static defaultProps = {
    	placeholderProps: "Ingrese...",
    	isOnDarkBackground: false,
    	nitBillingLabelText: "Nit",
    	nameBillingLabelText: "Nombre",
    	addresBillingLabelText: "Dirección"
    }

    uniqueInstanceIdentifier = uniqueId("BillingForm_");

    render() {

    	const {
    		components: { Field, TextInput },
    		isReadOnly,
    		isSaving,
    		placeholderProps,
    		isOnDarkBackground,
    		nameBillingLabelText,
    		nitBillingLabelText,
    		addresBillingLabelText,
    		classes
    	} = this.props;

    	const nitbillingForm = `nitbilling_${this.uniqueInstanceIdentifier}`;
    	const namebillingForm = `namebiiling_${this.uniqueInstanceIdentifier}`;
    	const addresbillingForm = `addresbilling_${this.uniqueInstanceIdentifier}`;

    	return (
    		<Grid>
    			<ColHalf>
    				<Field name="nit" label={nitBillingLabelText} labelFor={nitbillingForm} isOptional>
    					<TextInput
    						className={classes.input}
    						id={nitbillingForm}
    						name='nit'
    						placeholder={placeholderProps}
    						isOnDarkBackground={isOnDarkBackground}
    						isReadOnly={isSaving || isReadOnly}
    					/>
    				</Field>
    			</ColHalf>
    			<ColHalf>
    				<Field name="name" label={nameBillingLabelText} labelFor={namebillingForm} isOptional>
    					<TextInput
    						className={classes.input}
    						id={namebillingForm}
    						name='name'
    						placeholder={placeholderProps}
    						isOnDarkBackground={isOnDarkBackground}
    						isReadOnly={isSaving || isReadOnly}
    					/>
    				</Field>
    			</ColHalf>
    			<ColFull>
    				<Field name="addres" label={addresBillingLabelText} labelFor={addresbillingForm} isOptional>
    					<TextInput
    						id={addresbillingForm}
    						name='address'
    						placeholder={placeholderProps}
    						isOnDarkBackground={isOnDarkBackground}
    						isReadOnly={isSaving || isReadOnly}
    					/>
    				</Field>
    			</ColFull>
    		</Grid>
    	);
    }
}
export default withStyles(styles)(withComponents(BillingFormAction));