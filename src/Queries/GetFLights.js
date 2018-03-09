import gql from 'graphql-tag';

const GET_FLIGHTS = gql`
query GET_FLIGHTS( $from: String, $to: String, $date: Date ){
  allFlights(search:{from: {location: $from}, to: {location: $to}, date: {exact: $date}}){
    edges {
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
          arrival {
            time
            localTime
          },
          departure {
            time
            localTime
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