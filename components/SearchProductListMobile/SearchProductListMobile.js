import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import {withComponents} from "@reactioncommerce/components-context";
import styled from "styled-components";

const CustomText2= styled.div`
    font-size: 24px;
    color: #B8BCCA;
`;
class SearchProductListMobile extends Component{
    render(){
        const {
            items,
            uiStore,
            components:{CustomProductCard}
        } = this.props;
        return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <CustomText2>{`${items.length} coincidencia${items.length==1?"":"s"}`}</CustomText2>
            
                </Grid>
                {items.map((product)=>(
                    <Grid item xs={6} md={4}>
                    <CustomProductCard
                        product={product}
                        uiStore={uiStore}
                    />
                    </Grid>
                ))}
            </Grid>
        );
    }
}
export default withComponents(SearchProductListMobile);