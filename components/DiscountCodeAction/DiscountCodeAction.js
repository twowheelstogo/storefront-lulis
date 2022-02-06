import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import DiscountCodeForm from "components/DiscountCodeForm";
import { withComponents } from "@reactioncommerce/components-context";

class DiscountCodeAction extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func
    };

    static defaultProps = {
        onSubmit() { }
    };

    render() {
        const { onSubmit, alert, components: { InlineAlert } } = this.props;

        return (
            <React.Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {alert ? <InlineAlert {...alert} /> : ""}
                    </Grid>

                    <Grid item xs={12}>
                        <DiscountCodeForm onSubmit={onSubmit} />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withComponents(DiscountCodeAction);
