import gql from 'graphql-tag';

const GET_LOCATIONS = gql`
query GET_LOCATIONS( $search: String ) {
    allLocations(search: $search, first: 10){
      edges{
        node{
          name
        }
      }
    }
  }
`;

export default GET_LOCATIONS;