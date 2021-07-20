import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withComponents } from "@reactioncommerce/components-context";
import { CustomPropTypes } from "@reactioncommerce/components/utils";
import styled from "styled-components";

const InputContent = styled.div`
    padding-top: 15px;
`;
class PaymentMethodCheckoutAction extends Component{
    constructor(props){
        super(props);
        let selectedPaymentMethodName = null;
        const {paymentMethods} = props;
        if(Array.isArray(paymentMethods)){
            const [method] = paymentMethods;
            if(method){
                selectedPaymentMethodName = method.name;
            }
        }
        this.state = {
            selectedPaymentMethodName
        }
    }
    static propTypes = {
        paymentMethods: PropTypes.array,
        components: PropTypes.shape({
            CardItems: CustomPropTypes.component.isRequired
        })
    }
    setSelectedPaymentMethodName = (method) => {
        const {onReset} = this.props;
        onReset();
        this.setState({
            selectedPaymentMethodName: method.name
        })
    }
    renderPaymentMethods(){
        const {
            paymentMethods,
            components:{CardItems},
        } = this.props;
        const {
            selectedPaymentMethodName
        } = this.state;
        return(
            <CardItems
                items = {paymentMethods}
                onSelect = {this.setSelectedPaymentMethodName}
                itemSelected = {paymentMethods.find((item)=>item.name == selectedPaymentMethodName)}
            />
        );
    }
    render(){
        const {
            paymentMethods,
            components:{CardItems}
        } = this.props;
        const {
            selectedPaymentMethodName
        } = this.state;
        const selectedPaymentMethod = paymentMethods.find((item)=>item.name == selectedPaymentMethodName);
        return(
            <Fragment>
               {this.renderPaymentMethods()}
               {!!selectedPaymentMethod && selectedPaymentMethod.InputComponent
               && (
                   <InputContent>
                   <selectedPaymentMethod.InputComponent {...this.props}/>
                   </InputContent>
               )}
            </Fragment>
        );
    }
}
export default withComponents(PaymentMethodCheckoutAction);