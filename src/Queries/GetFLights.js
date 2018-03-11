import gql from 'graphql-tag';

const GET_FLIGHTS = gql`
query GET_FLIGHTS( $from: String, $to: String, $date: Date , $cursor: String){
  allFlights(search:{from: {location: $from}, to: {location: $to}, date: {exact: $date}}, first: 10, after: $cursor){
    pageInfo{
      hasNextPage,
      hasPreviousPage,
      startCursor,
      endCursor
    }
    edges {
      cursor,
      node {
        id,
        airlines {
          name
          code
          logoUrl
          isLowCost
        },
        departure {
          time
          localTime
          airport{
            name,
            city{
              name
            }
          }
        },
        arrival {
          time
          localTime,
          airport{
            name,
            city{
              name
            }
          }
        },
        duration,
        legs {
          id,
          departure {
            time
            airport{
              city{
                name
              }
            }
          },
          arrival {
            time,
            airport{
              city{
                name
              }
            }
          },
          duration,
          flightNumber,
          recheckRequired
        },
        price {
          amount
          currency
        }
      }
    }
  }
}
`;

export default GET_FLIGHTS;