import React from "react";
import { Form } from "reacto-form";
import PropTypes from "prop-types";
import styled from "styled-components";
import { applyTheme } from "@reactioncommerce/components/utils";
import { withComponents } from "@reactioncommerce/components-context";
import uniqueId from "lodash.uniqueid";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const ColMax = styled.div`
  flex: 1 1 100%;
  @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
    flex: 1 1 auto;
  }
`;

const ColMin = styled.div`
  flex: 1 1 100%;
  @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
    flex: 0 1 calc(20% - 9px);
  }
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
class DiscountCodeForm extends React.Component {

    static propTypes = {
        value: PropTypes.shape({
            code: PropTypes.string
        }),
        onSubmit: PropTypes.func
    };

    static defaultProps = {
        value: {
            code: ""
        },
        onSubmit() { }
    };

    _form = null;

    uniqueInstanceIdentifier = uniqueId("AddressForm_");

    submit = () => {
        this._form.submit();
    }

    render() {
        const { onSubmit, components: { Field, TextInput, Button } } = this.props;

        const codeInputId = `code_${this.uniqueInstanceIdentifier}`;

        return (
            <React.Fragment>
                <Form
                    ref={(formEl) => {
                        this._form = formEl;
                    }}
                    onSubmit={onSubmit}
                >
                    <Grid>
                        <ColMax>
                            <TextInput
                                id={codeInputId}
                                name="code"
                                placeholder={"Ingrese el código aquí"}
                            />
                        </ColMax>
                        <ColMin>
                            <Button
                                title="secondary"
                                actionType="secondary"
                                isShortHeight
                                onClick={this.submit}>Canjear</Button>
                        </ColMin>
                    </Grid>
                </Form>
            </React.Fragment>
        );
    }
}

export default withComponents(DiscountCodeForm);
