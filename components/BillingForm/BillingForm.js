import React,{Component,Fragment} from "react";
import uniqueId from "lodash.uniqueid";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import { applyTheme, CustomPropTypes, getRequiredValidator } from "@reactioncommerce/components/utils";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColHalf = styled.div`
    flex: 1 1 100%;
    @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
        flex: 0 1 calc(50% - 9px);
    }
`;

const ColFull = styled.div`
  flex: 1 1 100%;
`;



class BillingFormAction extends Component{

    static defaultProps = {
        placeholderProps:"Ingrese...",
        isOnDarkBackground: false,
        nitBillingLabelText: 'Nit',
        nameBillingLabelText: 'Nombre de la facturación',
        addresBillingLabelText: 'Dirección de facturación'
    }

    uniqueInstanceIdentifier = uniqueId("BillingForm_");

    render(){

        const  {
            components: {Field,TextInput},
            isReadOnly,
            isSaving,
            placeholderProps,
            isOnDarkBackground,
            nameBillingLabelText,
            nitBillingLabelText,
            addresBillingLabelText
        } = this.props;

        const nitbillingForm = `nitbilling_${this.uniqueInstanceIdentifier}`;
        const namebillingForm = `namebiiling_${this.uniqueInstanceIdentifier}`;
        const addresbillingForm = `addresbilling_${this.uniqueInstanceIdentifier}`

        return(
            <Fragment>
                <Grid>
                    <ColHalf>
                        <Field name = "nit" label = {nitBillingLabelText} labelFor = {nitbillingForm} isOptional>
                            <TextInput
                                id = {nitbillingForm}
                                name = 'nit'
                                placeholder = {placeholderProps}
                                isOnDarkBackground = {isOnDarkBackground}
                                isReadOnly ={isSaving || isReadOnly}
                            />
                        </Field>
                    </ColHalf>
                    <ColHalf>
                        <Field name = "name" label = {nameBillingLabelText} labelFor = {namebillingForm} isOptional>
                            <TextInput
                                id = {namebillingForm}
                                name = 'name'
                                placeholder = {placeholderProps}
                                isOnDarkBackground = {isOnDarkBackground}
                                isReadOnly ={isSaving || isReadOnly}
                            />
                        </Field>
                    </ColHalf>
                    <ColFull>
                        <Field name = "addres" label = {addresBillingLabelText} labelFor = {addresbillingForm} isOptional>
                            <TextInput
                                id = {addresbillingForm}
                                name = 'address'
                                placeholder = {placeholderProps}
                                isOnDarkBackground = {isOnDarkBackground}
                                isReadOnly ={isSaving || isReadOnly}
                            />
                        </Field>
                    </ColFull>
                </Grid>
            </Fragment>
        );
    }
}
export default withComponents(BillingFormAction);