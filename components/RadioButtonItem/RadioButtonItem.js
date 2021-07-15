import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {CustomPropTypes } from "@reactioncommerce/components/utils";
import Radio from '@material-ui/core/Radio';
const Item = styled.div`
    background: #F4F1F1;
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    padding: 10px;
    min-height: 65px;
    width: 100%;
    border-radius: 14px;
`;
const ItemLeading = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const ItemContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 0 auto;
`;
const ItemTrailing = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
`;
const ItemTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: black;
`;
const ItemSubtitle = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: #565656;
`;
class RadioButtonItem extends React.Component{
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        trailing: CustomPropTypes.component.isRequired,
        isSelected: PropTypes.bool,
        handleChange:PropTypes.func.isRequired
    }
    render(){
        const {
            title,
            description,
            trailing,
            handleChange,
            id,
            isSelected
        } = this.props
        return(
            <Item>
                <ItemLeading>
                    <Radio
                    checked={isSelected}
                    onChange={handleChange}
                    value="a"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                />
                </ItemLeading>
                <ItemContent>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemSubtitle>{description}</ItemSubtitle>
                </ItemContent>
                <ItemTrailing>
                    {React.cloneElement(trailing,{...this.props})}
                </ItemTrailing>
            </Item>
        );
    }
}
export default RadioButtonItem;