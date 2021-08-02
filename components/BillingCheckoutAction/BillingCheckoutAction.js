import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import isEqual from "lodash.isequal";
import { withComponents } from "@reactioncommerce/components-context";
import { addTypographyStyles, CustomPropTypes } from "@reactioncommerce/components/utils";
import AddressBook from "components/AddressBook";
import relayConnectionToArray from "lib/utils/relayConnectionToArray";


class BillingCheckoutAction extends Component{
    static propTypes = {
    	billingValidationResults : PropTypes.object,
    	alert: CustomPropTypes.alert,
    	authStore: PropTypes.shape({
    		account: PropTypes.object.isRequired
    	}),
    	components: PropTypes.shape({
    		InlineAlert: CustomPropTypes.component.isRequired,
    		BillingForm:CustomPropTypes.component.isRequired
    	}).isRequired,
    	isSaving: PropTypes.bool,
    	label: PropTypes.string.isRequired,
    	onReadyForSaveChange: PropTypes.func,
    	onSubmit: PropTypes.func,
    	stepNumber: PropTypes.number.isRequired,
    }
    render(){
    	const {components:{BillingForm}} = this.props;
    	return(
    		<Fragment>
    			<BillingForm {...this.props}/>
    		</Fragment>
    	);
    }
}
export default withComponents(BillingCheckoutAction);