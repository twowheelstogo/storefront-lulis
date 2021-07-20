import ExampleIOUPaymentForm from "@reactioncommerce/components/ExampleIOUPaymentForm/v1";
// import StripePaymentInput from "@reactioncommerce/components/StripePaymentInput/v1";
import EpayPaymentForm from "../components/EpayPaymentForm"
const cashIcon = "https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2Fpath824.png?alt=media&token=50596dd1-7019-4622-a279-023ff22dc346";
const epayIcon = "https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2Fg3420.png?alt=media&token=d3858828-aa4b-4abe-b0e1-45efcbb91924";
const paymentMethods = [
  {
    displayName: "Tarjeta de Crédito",
    InputComponent: EpayPaymentForm,
    name: "epay_card",
    shouldCollectBillingAddress: true,
    icon: epayIcon
  },
  {
    displayName: "Efectivo",
    InputComponent: ExampleIOUPaymentForm,
    name: "payments_cash",
    shouldCollectBillingAddress: true,
    icon: cashIcon
  }
];

export default paymentMethods;
