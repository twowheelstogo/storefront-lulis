import React,{Component,Fragment} from "react";
import { withComponents } from "@reactioncommerce/components-context";
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
        }
    }
    renderDeliveryMethods(){
        const {deliveryMethods,components:{CardItems}} = this.props;
        const {selectedDeliveryMethodName} = this.state;
        return <CardItems
               items={deliveryMethods}
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
                && <selectedDeliveryMethod.InputComponent {...this.props}/>}
            </Fragment>
        );
    }
}

export default withComponents(DeliveryOptionsCheckoutAction);