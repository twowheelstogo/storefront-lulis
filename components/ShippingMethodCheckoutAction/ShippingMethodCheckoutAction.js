import React from "react";
import { withComponents } from "@reactioncommerce/components-context";
class ShippingMethodCheckoutAction extends React.Component{
    renderfulfillmentList(){
        const {components:{FulfillmentList}} = this.props;
        return <FulfillmentList items={[{},{},{}]}/>
    }
    render(){
        return <React.Fragment>
            {this.renderfulfillmentList()}
        </React.Fragment>
    }
}
export default withComponents(ShippingMethodCheckoutAction);