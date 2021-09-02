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



class GiftFormAction extends Component {

	
	componentDidMount() {
		this._isMounted = true;
	}
  
	componentWillUnmount() {
		this._isMounted = false;
	}
   

    static defaultProps = {
    	placeholderProps: "Ingrese...",
    	isOnDarkBackground: false,
    	giftofLabelText: "De",
    	giftForLabelText: "Para",
    	giftMessageLabelText: "Mensaje",
    	messageGitplaceholder: "Escriba aquí..."
    }

    uniqueInstanceIdentifier = uniqueId("GiftForm_");
	handleOnChange (key, value = ""){
		if (value == undefined){
			return;
		}
		const {onChange} = this.props;
		let _json = {};
		_json[key] = value;
		onChange(_json);
	}
    render() {
		if (!this._isMounted){
			return (<p>cargando...</p>)
		}
    	const {
    		components: { Field, TextInput, InlineAlert },
    		isReadOnly,
    		isSaving,
    		placeholderProps,
    		messageGitplaceholder,
    		isOnDarkBackground,
    		giftForLabelText,
    		giftofLabelText,
    		giftMessageLabelText,
    		classes,
			senderValue,
			receiverValue,
			messageValue,
			alert
    	} = this.props;
    	const giftofForm = `sendergift_${this.uniqueInstanceIdentifier}`;
    	const gitftForForm = `recievergift_${this.uniqueInstanceIdentifier}`;
    	const gitfMessageForm = `messagegift_${this.uniqueInstanceIdentifier}`;

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
								onChange={(val) => this.handleOnChange('sender',val)}
								value={senderValue}
    						/>
    					</Field>
    				</ColHalf>
    				<ColHalf>
    					<Field name="Para" label={giftForLabelText} labelFor={gitftForForm} isOptional>
    						<TextInput
    							className={classes.input}
    							id={gitftForForm}
    							name='Para'
    							placeholder={placeholderProps}
    							isOnDarkBackground={isOnDarkBackground}
    							isReadOnly={isSaving || isReadOnly}
								onChange={(val) => this.handleOnChange('receiver',val)}
								value={receiverValue}
    						/>
    					</Field>
    				</ColHalf>
    				<ColFull>
    					<Field name="Mensaje" label={giftMessageLabelText} labelFor={gitfMessageForm} isOptional>
    						<TextInput
    							id={gitfMessageForm}
    							name='Mensaje'
    							placeholder={messageGitplaceholder}
    							isOnDarkBackground={isOnDarkBackground}
    							isReadOnly={isSaving || isReadOnly}
    							shouldAllowLineBreaks
								onChange={(val) => this.handleOnChange('message',val)}
								value={messageValue}
    						/>
    					</Field>
    				</ColFull>
    			</Grid>
				{alert ? <InlineAlert {...alert}/>:""}
    		</Fragment>
    	);
    }
}
export default withStyles(styles)(withComponents(GiftFormAction));