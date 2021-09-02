import React from "react";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import PropTypes from "prop-types";
import { CustomPropTypes } from "@reactioncommerce/components/utils";

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
class FulfillmentList extends React.Component {
    static propTypes = {
    	items: PropTypes.object.isRequired,
    	components: PropTypes.shape({
    		RadioButtonItem: CustomPropTypes.component.isRequired
    	})
    }
    render() {
    	const { components: { RadioButtonItem }, items, selectedItem, handleChange } = this.props;
		let tmpItems = (items) ? items : [];
		if(selectedItem){
			tmpItems = tmpItems.filter((el) => el.id == selectedItem._id);
		}else if (selectedItem == null){
			tmpItems = [];
		}
		return (
    		<Items>
    			{(tmpItems).map(({ label, detail, id }) => (
    				<RadioButtonItem
    					description={label}
    					value={{ label, detail, id }}
    					isSelected={selectedItem && selectedItem._id == id}
    					handleChange={handleChange}
    					trailing={<ItemSubtitle>{detail}</ItemSubtitle>}
    				/>
    			))}
    		</Items>
    	);
    }
}
export default withComponents(FulfillmentList);