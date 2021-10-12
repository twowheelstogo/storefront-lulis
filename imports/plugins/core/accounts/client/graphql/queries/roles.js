import gql from "graphql-tag";

export default gql`
  query ($shopId: ID!) {
    roles(shopId: $shopId, first: 100) {
      nodes {
        name
      }
    }
  }
`;
