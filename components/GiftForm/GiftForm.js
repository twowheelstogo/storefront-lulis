import React, { Component, Fragment } from "react";
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
    	giftofLabelText: "De",
    	giftForLabelText: "Para",
    	giftMessageLabelText: "Mensaje",
    	messageGitplaceholder: "Escriba aquí..."
    }

    uniqueInstanceIdentifier = uniqueId("GiftForm_");

    render() {

    	const {
    		components: { Field, TextInput },
    		isReadOnly,
    		isSaving,
    		placeholderProps,
    		messageGitplaceholder,
    		isOnDarkBackground,
    		giftForLabelText,
    		giftofLabelText,
    		giftMessageLabelText,
    		classes
    	} = this.props;

    	const giftofForm = `nitbilling_${this.uniqueInstanceIdentifier}`;
    	const gitftForForm = `namebiiling_${this.uniqueInstanceIdentifier}`;
    	const gitfMessageForm = `addresbilling_${this.uniqueInstanceIdentifier}`;

    	return (
    		<Fragment>
    			<Grid>
    				<ColHalf>
    					<Field name="De" label={giftofLabelText} labelFor={giftofForm} isOptional>
    						<TextInput
    							className={classes.input}
    							id={giftofForm}
    							name='De'
    							placeholder={placeholderProps}
    							isOnDarkBackground={isOnDarkBackground}
    							isReadOnly={isSaving || isReadOnly}
    						/>
    					</Field>
    				</ColHalf>
    				<ColHalf>
    					<Field name="Para" label={giftForLabelText} labelFor={giftForLabelText} isOptional>
    						<TextInput
    							className={classes.input}
    							id={giftForLabelText}
    							name='Para'
    							placeholder={placeholderProps}
    							isOnDarkBackground={isOnDarkBackground}
    							isReadOnly={isSaving || isReadOnly}
    						/>
    					</Field>
    				</ColHalf>
    				<ColFull>
    					<Field name="Mensaje" label={giftMessageLabelText} labelFor={messageGitplaceholder} isOptional>
    						<TextInput
    							id={messageGitplaceholder}
    							name='Mensaje'
    							placeholder={messageGitplaceholder}
    							isOnDarkBackground={isOnDarkBackground}
    							isReadOnly={isSaving || isReadOnly}
    							shouldAllowLineBreaks
    						/>
    					</Field>
    				</ColFull>
    			</Grid>
    		</Fragment>
    	);
    }
}
export default withStyles(styles)(withComponents(BillingFormAction));