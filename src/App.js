import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Query } from 'react-apollo';
import FlightsTable from './Components/FlighsTable'


const GET_FLIGHTS = gql`
  query {
    allFlights(search:{from: {location: "PRG"}, to: {location: "BCN"}, date:{exact:"2018-04-01"}}){
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

const MyComponentWithData = graphql(GET_FLIGHTS)(props => 
    <ul> 
      {
        props.data.allFlights.edges.map((edge) => 
          <li key={edge.id.toString()}>{edge.duration}</li>
        )
      }
    </ul>
  );

class App extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

  }


  render() {
    return (
      <div>
      <Query query={GET_FLIGHTS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;
          console.log(data.allFlights.edges[0])
          return (
            <FlightsTable data={data}/>
          )
        }}
      </Query>
      </div>
    );
  }
}

export default App;
