import gql from "graphql-tag";
import { CartQueryFragment } from "../fragments/cartFragments";
export default gql`
query anonymousCartByCartIdQuery($cartId: ID!, $cartToken: String!, $itemsAfterCursor: ConnectionCursor) {
  cart: anonymousCartByCartId(cartId: $cartId, cartToken: $cartToken) {
    ...CartQueryFragment
  }
}
${CartQueryFragment}
`;