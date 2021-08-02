import React from "react";
import withAddressBook from "containers/address/withAddressBook";
import inject from "hocs/inject";
import relayConnectionToArray from "lib/utils/relayConnectionToArray";
import { addressToString, CustomPropTypes } from "@reactioncommerce/components/utils";
import { withComponents } from "@reactioncommerce/components-context";
class ShippingAddressCheckoutAction extends React.Component{
    handleDeleteAddress = async (id) => { 
        const {onAddressDeleted} = this.props;
        await onAddressDeleted(id);
    }
    renderAddressList(){
        const {
            authStore:{account:{addressBook}},
            components:{AddressList},
            onSubmit,
            fulfillmentGroup:{shippingAddress}
        } = this.props;
        // Use relayConnectionToArray to remove edges / nodes levels from addressBook object
    const addresses = (addressBook && relayConnectionToArray(addressBook)) || [];
    // Create data object to pass to AddressBook component
    const accountAddressBook = {
      addressBook: addresses
    };
        return(
            <AddressList
            onAddressDeleted={this.handleDeleteAddress}
            account={accountAddressBook}
            onSelect={onSubmit}
            currentAddress={shippingAddress}
             />
        );
    }
    render(){
        return(
            <React.Fragment>
              {this.renderAddressList()}  
            </React.Fragment>
        );
    }
}
export default withAddressBook(inject("authStore")(withComponents(ShippingAddressCheckoutAction)));