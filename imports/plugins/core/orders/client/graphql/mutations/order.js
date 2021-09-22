import gql from "graphql-tag";
import { OrderQueryFragment } from "../fragments/orderFragments";

export const placeOrderMutation = gql`
    mutation placeOrderMutation($input: PlaceOrderFromDraftOrderInput!, $language: String! = "en") {
  placeOrderFromDraftOrder(input: $input) {
    orders {
      ...OrderQueryFragment
    },
    token
  }
  }
  ${OrderQueryFragment}
`;