import React,{Fragment,Component} from "react";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
class PickupCheckoutAction extends Component{
    renderPickupLocations(){
        return(
            <div>PickupLocations</div>
        );
    }
    render(){
        const {components:{PickupForm}} = this.props;
        return(
            <Fragment>
                <Grid>
                <PickupForm/>
                {this.renderPickupLocations()}
                </Grid>
            </Fragment>
        );
    }
}
export default withComponents(PickupCheckoutAction);