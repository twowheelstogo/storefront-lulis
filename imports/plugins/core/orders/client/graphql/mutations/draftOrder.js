import gql from "graphql-tag";

export const createDraftOrderCartMutation = gql`
    mutation createDraftOrderCartMutation($input: CreateDraftOrderCartInput!) {
  createDraftOrderCart(input: $input) {
    draftOrder {
      _id
      cartId
      cartToken
      accountId
      shopId
    }
  }
}
`;

export const addDraftOrderAccountMutation = gql`
    mutation addDraftOrderAccountMutation($input: AddDraftOrderAccountInput!) {
  addDraftOrderAccount(input:$input) {
    draftOrder {
      _id
      cartId
      cartToken
      accountId
      shopId
    }
  }
}
`;

export const placeDraftOrderMutation = gql`
    mutation placeDraftOrderMutation($input: PlaceDraftOrderInput!) {
  placeDraftOrder(input: $input) {
    draftOrder {
      _id
      cartId
      cartToken
      accountId
      shopId
    }
  }
}
`;