import gql from 'graphql-tag';

const GET_LOCATIONS = gql`
query{
    allLocations{
      edges{
        node{
          name
        }
      }
    }
  }
`;

export default GET_LOCATIONS;