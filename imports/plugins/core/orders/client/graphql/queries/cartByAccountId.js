import gql from "graphql-tag";
import { CartQueryFragment } from "../fragments/cartFragments";
export default gql`
query accountCartByAccountIdQuery($accountId: ID!, $shopId: ID!, $itemsAfterCursor: ConnectionCursor) {
  cart: accountCartByAccountId(accountId: $accountId, shopId: $shopId) {
    ...${CartQueryFragment}
  }
}
`;