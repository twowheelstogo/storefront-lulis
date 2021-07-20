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
      handleSubmit=async({id})=>{
        const { fulfillmentGroup: { availableFulfillmentOptions } } = this.props;
    // We get the ID, but we want to pass the whole fulfillment option to onSubmit
        const selectedFulfillmentOption = availableFulfillmentOptions.find((option) => option.fulfillmentMethod._id === id);

        const { onSubmit } = this.props;
        await onSubmit({ selectedFulfillmentOption });
        }
    renderfulfillmentList(){
        const {components:{FulfillmentList},
        fulfillmentGroup:{
         availableFulfillmentOptions,
         selectedFulfillmentOption:{fulfillmentMethod}
        },
    } = this.props;
        return <FulfillmentList 
        handleChange={this.handleSubmit}
        selectedItem = {fulfillmentMethod}    
        items={this.mapFulfillmentOptions(availableFulfillmentOptions)}/>
    }

    render(){
        return <React.Fragment>
            {this.renderfulfillmentList()}
        </React.Fragment>
    }
}
export default withComponents(ShippingMethodCheckoutAction);