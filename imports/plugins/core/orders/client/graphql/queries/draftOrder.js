import gql from "graphql-tag";

export default gql`
    query draftOrder($draftOrderId: ID!) {
  draftOrder(draftOrderId: $draftOrderId) {
    _id
    cartId
    accountId
    cartToken
    shopId
  }
}
`;