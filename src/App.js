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

class App extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

  }


  render() {
    const MyComponentWithData = graphql(GET_FLIGHTS)(FlightsTable)
    return (
      <MyComponentWithData />
    );
  }
}

export default App;
