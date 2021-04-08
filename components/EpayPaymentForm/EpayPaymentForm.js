import React,{forwardRef,useImperativeHandle,useRef,useState} from "react";
import PropTypes from "prop-types";
import {useReactoForm} from "reacto-form";
import {uniqueId} from "lodash";
import {withComponents} from "@reactioncommerce/components-context";
import {CustomPropTypes,applyTheme } from "@reactioncommerce/components/utils";
import { Field,Form } from "react-final-form";
import { formatCVC,formatCreditCardNumber,formatExpirationDate } from "../utils/index";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
  root:{

  },
  textInput:{
    width:'100%',
    border: '1px solid #95d2de',
    height:'25px'
  }
}))
import styled from "styled-components";
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColFull = styled.div`
  flex: 1 1 100%;
  padding:2px;
`;

const ColHalf = styled.div`
  flex: 1 1 100%;
  padding:2px;
  @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
    flex: 0 1 calc(50% - 9px);
  }
`;
function EpayPaymentForm(props,ref){
    const lastDocRef = useRef();
  const isReadyRef = useRef();
  const classes = useStyles();

  const [uniqueInstanceIdentifier, setUniqueInstanceIdentifier] = useState();
  if (!uniqueInstanceIdentifier) {
    setUniqueInstanceIdentifier(uniqueId("EpayPaymentForm"));
  }
  function buildResult({ cardNumber = null, cardExpiry = null,cardCVV=null,postalCode=null }) {
    return {
      data: { cardNumber, cardExpiry,cardCVV,postalCode },
      displayName: 'Test displayName for ePay'
    };
   }
  const {
    className,
    components: {
      ErrorsBlock,
      // Field,
      TextInput
    },
    isSaving,
    onChange,
    onReadyForSaveChange,
    onSubmit
  } = props;
  const {
    getErrors,
    getInputProps,
    submitForm
  } = useReactoForm({
    isReadOnly: isSaving,
    onChange(formData) {
      const resultDoc = buildResult(formData);
      const stringDoc = JSON.stringify(resultDoc);
      if (stringDoc !== lastDocRef.current) {
        onChange(resultDoc);
      }
      lastDocRef.current = stringDoc;

      const isReady = !!formData.cardNumber;
      if (isReady !== isReadyRef.current) {
        onReadyForSaveChange(isReady);
      }
      isReadyRef.current = isReady;
    },
    onSubmit: (formData) => onSubmit(buildResult(formData))
  });
  const handleChange = formData => {
    const resultDoc = buildResult(formData);
    const stringDoc = JSON.stringify(resultDoc);
    if (stringDoc !== lastDocRef.current) {
      onChange(resultDoc);
    }
    lastDocRef.current = stringDoc;

    const isReady = !!formData.cardNumber;
    if (isReady !== isReadyRef.current) {
      onReadyForSaveChange(isReady);
    }
    isReadyRef.current = isReady;
  }
  useImperativeHandle(ref, () => ({
    submit() {
      submitForm();
    }
  }));
    return(
      <Form
      onSubmit={submitForm}
      
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        active
      })=>{
        handleChange(values);
        return (
        <div onSubmit={handleSubmit}>
          <form className={className}>
          <Grid>
          <ColFull>
              <Field
              className={classes.textInput}
                name="cardNumber"
                component="input"
                type="text"
                pattern="[\d| ]{16,22}"
                placeholder="Número de tarjeta"
                format={formatCreditCardNumber}
              />
            </ColFull>
            <ColFull>
              <Field
              className={classes.textInput}
                name="postalCode"
                component="input"
                type="text"
                placeholder="Nombre de la tarjeta"
              />
            </ColFull>
              <ColHalf>
              <Field
              className={classes.textInput}
                name="cardExpiry"
                component="input"
                type="text"
                pattern="\d\d/\d\d"
                placeholder="Fecha de expiración"
                format={formatExpirationDate}
              />
              </ColHalf>
              <ColHalf>
              <Field
              className={classes.textInput}
                name="cardCVV"
                component="input"
                type="text"
                pattern="\d{3,4}"
                placeholder="CVV/CVC"
                format={formatCVC}
              />
              </ColHalf>
            </Grid> 
        </form>
        </div>
        );
      }}
      />
    );
}
EpayPaymentForm = withComponents(forwardRef(EpayPaymentForm));
EpayPaymentForm.propTypes = {
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      /**
       * Pass either the Reaction ErrorsBlock component or your own component that
       * accepts compatible props.
       */
      ErrorsBlock: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction Field component or your own component that
       * accepts compatible props.
       */
      Field: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction TextInput component or your own component that
       * accepts compatible props.
       */
      TextInput: CustomPropTypes.component.isRequired
    }),
    /**
     * Pass true while the input data is in the process of being saved.
     * While true, the form fields are disabled.
     */
    isSaving: PropTypes.bool,
    /**
     * Called as the form fields are changed
     */
    onChange: PropTypes.func,
    /**
     * When this action's input data switches between being
     * ready for saving and not ready for saving, this will
     * be called with `true` (ready) or `false`
     */
    onReadyForSaveChange: PropTypes.func,
    /**
     * Called with an object value when this component's `submit`
     * method is called. The object may have `data`, `displayName`,
     * and `amount` properties.
     */
    onSubmit: PropTypes.func
  };
  
  EpayPaymentForm.defaultProps = {
    isSaving: false,
    onChange() {},
    onReadyForSaveChange() {},
    onSubmit() {}
  };
export default EpayPaymentForm;