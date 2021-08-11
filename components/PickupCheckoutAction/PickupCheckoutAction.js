import React,{Fragment,Component} from "react";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
class PickupCheckoutAction extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoadingDetails: false
		}
	}
	renderPickupLocations(){
		return(
			<div>PickupLocations</div>
		);
	}
	_form = null

	handleSubmit = async (value) => {
		const { submits: { onSubmitPickupDetails } } = this.props;
		const datetime = value.pickupDate.concat(" ",value.pickupTime);
		this.setState({
			isLoadingDetails: true
		})

		await onSubmitPickupDetails({datetime});

		this.setState({
			isLoadingDetails: false
		})
	}

	renderForm(){
		const {components:{PickupForm}, fulfillmentGroup: {data} } = this.props;
		const values = data.pickupDetails && data.pickupDetails.datetime.split(" ");
		return (
			<PickupForm
				ref={(formEl)=>this._form = formEl}
				onSubmit = {this.handleSubmit}
				value = {data.pickupDetails && {
					pickupDate: values[0],
					pickupTime: values[1]
				}}
			/>
		);
	}
	render(){
		const { components: { Button } } = this.props;
		return(
			<Fragment>
				<Grid>
					{this.renderForm()}
					<Button
					 title="secondary"
					 actionType="secondary"
					 isShortHeight
					 isWaiting={this.state.isLoadingDetails}
					 onClick = {() => this._form.submit()}
					>{"Guardar fecha"}</Button>
					{/* {this.renderPickupLocations()} */}
				</Grid>
			</Fragment>
		);
	}
}
export default withComponents(PickupCheckoutAction);