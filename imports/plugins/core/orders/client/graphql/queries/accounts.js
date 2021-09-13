import gql from "graphql-tag";

export default gql`
query accounts(
    $groupIds: [ID],
    $first: ConnectionLimitInt,
    $last:  ConnectionLimitInt,
    $before: ConnectionCursor,
    $after: ConnectionCursor,
    $offset: Int,
    $sortBy: AccountSortByField,
    $sortOrder: SortOrder,
    $query: String
  ) {
    accounts(
      groupIds: $groupIds,
      first: $first,
      last: $last,
      before: $before,
      after: $after,
      offset: $offset,
      sortBy: $sortBy,
      sortOrder: $sortOrder,
      query: $query
    ) {
      nodes {
        _id
        addressBook{
          edges{
            node{
            	_id
              address
              reference
              description
              geolocation{
                latitude
                longitude
              }
              metaddress{
                administrative_area_level_1
                administrative_area_level_2
                neighborhood
                sublocality
                street_address
                distance{
                  value
                  text
                }
              }
            }
          }
        }
        firstName
        lastName
        name
        username
        primaryEmailAddress
        emailRecords {
          address
          verified
        }
        groups {
          nodes {
            _id
            name
          }
        }
        name
      }
      totalCount
    }
  }
`;