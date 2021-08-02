import React,{Component,Fragment} from "react";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";

const InputContent = styled.div`
    padding-top: 15px;
`;
class DeliveryOptionsCheckoutAction extends Component{
	constructor(props){
		super(props);
		let selectedDeliveryMethodName = null;
		const {deliveryMethods} = props;
		if(Array.isArray(deliveryMethods)){
			const [method] = deliveryMethods;
			if(method){
				selectedDeliveryMethodName = method.name;
			}
		}
		this.state = {
			selectedDeliveryMethodName
		};
	}
    setSelectedDeliveryMethodName = (method) => {
    	this.setState({
    		selectedDeliveryMethodName: method.name
    	});
    }
    renderDeliveryMethods(){
    	const {deliveryMethods,components:{CardItems}} = this.props;
    	const {selectedDeliveryMethodName} = this.state;
    	return <CardItems
    		items={deliveryMethods.filter((method)=>method.enabled)}
    		onSelect = {this.setSelectedDeliveryMethodName}
    		itemSelected={deliveryMethods.find((item)=>item.name==selectedDeliveryMethodName)}/>;
    }
    render(){
    	const {deliveryMethods} = this.props;
    	const {selectedDeliveryMethodName} = this.state;
    	const selectedDeliveryMethod = deliveryMethods.find((item)=>item.name==selectedDeliveryMethodName);
    	return(
    		<Fragment>
    			{this.renderDeliveryMethods()}
    			{!!selectedDeliveryMethod && !!selectedDeliveryMethod.InputComponent
                && (
                	<InputContent>
                		<selectedDeliveryMethod.InputComponent {...this.props}/>
                	</InputContent>
                )}
    		</Fragment>
    	);
    }
}

export default withComponents(DeliveryOptionsCheckoutAction);