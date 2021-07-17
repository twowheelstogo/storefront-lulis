import React from "react";
import { withComponents } from "@reactioncommerce/components-context";
class ShippingMethodCheckoutAction extends React.Component{
    mapFulfillmentOptions = (availableFulfillmentOptions) => availableFulfillmentOptions
    .filter(option=>option.price.amount>0)
    .map((option) => ({
        id: option.fulfillmentMethod._id,
        label: option.fulfillmentMethod.displayName,
        detail: option.price.displayAmount,
        value: option.fulfillmentMethod._id
      }));
    renderfulfillmentList(){
        const {components:{FulfillmentList},
        fulfillmentGroup:{availableFulfillmentOptions}} = this.props;
        return <FulfillmentList items={this.mapFulfillmentOptions(availableFulfillmentOptions)}/>
    }

    render(){
        return <React.Fragment>
            {this.renderfulfillmentList()}
        </React.Fragment>
    }
}
export default withComponents(ShippingMethodCheckoutAction);