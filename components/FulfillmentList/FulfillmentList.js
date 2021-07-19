import React from "react";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import PropTypes from "prop-types";
import {CustomPropTypes } from "@reactioncommerce/components/utils";

const Items = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: flex-start;
    align-items: flex-end;
`;
const ItemSubtitle = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #565656;
    display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
`;
class FulfillmentList extends React.Component{
    static propTypes = {
        items: PropTypes.object.isRequired,
        components:PropTypes.shape({
            RadioButtonItem: CustomPropTypes.component.isRequired
        })
    }
    render(){
        const {components:{RadioButtonItem},items} = this.props;
        return(
            <Items>
                {(items).map(({label,detail})=>(
                    <RadioButtonItem
                    description={label}
                    isSelected={false}
                    handleChange={()=>{}}
                    trailing={<ItemSubtitle>{detail}</ItemSubtitle>}
                    />
                ))}
            </Items>
        );
    }
}
export default withComponents(FulfillmentList);