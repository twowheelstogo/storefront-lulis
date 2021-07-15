import React from "react";
import withAddressBook from "containers/address/withAddressBook";
import inject from "hocs/inject";
import relayConnectionToArray from "lib/utils/relayConnectionToArray";
import { addressToString, CustomPropTypes } from "@reactioncommerce/components/utils";
import { withComponents } from "@reactioncommerce/components-context";
class ShippingAddressCheckoutAction extends React.Component{
    renderAddressList(){
        const {
            authStore:{account:{addressBook}},
            components:{AddressList}
        } = this.props;
        // Use relayConnectionToArray to remove edges / nodes levels from addressBook object
    const addresses = (addressBook && relayConnectionToArray(addressBook)) || [];

    // Create data object to pass to AddressBook component
    const accountAddressBook = {
      addressBook: addresses
    };
        return(
            <AddressList account={accountAddressBook}/>
        );
    }
    render(){
        const {
            authStore:{account:{addressBook}},
        } = this.props;
        
        return(
            <React.Fragment>
              {addressBook && this.renderAddressList()}  
            </React.Fragment>
        );
    }
}
export default withAddressBook(inject("authStore")(withComponents(ShippingAddressCheckoutAction)));