import React, { useState } from "react";
import BundleItems from "components/BundleItems";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

const Items = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
`;

const ItemGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ItemTitle = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #000025;
`;

function ItemGroups(props) {
    const { groups, handleChange, currencyCode, selectedItems } = props;

    return (
        <Items>
            {(groups || []).map((group) => {
                const items = group.items.map((item) => {
                    const selected = selectedItems.find((selected) => selected._id == item._id);
                    if (selected) return selected;

                    return {
                        ...item,
                        quantity: 0
                    };
                });

                const total = (items || []).reduce((total, element) => total + element.quantity, 0);

                console.log(items, total);

                return (
                    <ItemGroup>
                        <ItemTitle>{group.title}</ItemTitle>
                        <BundleItems
                            items={items || []}
                            currencyCode={currencyCode}
                            handleChange={handleChange}
                            disabled = {total == group.limit}
                        />
                    </ItemGroup>
                );
            })}
        </Items>
    );
}

ItemGroups.propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object)
};

ItemGroups.defaultProps = {

};

export default ItemGroups;
