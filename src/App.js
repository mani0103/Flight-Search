import React, { Component } from 'react';
import './App.css';
import { graphql } from 'react-apollo';

import FlightsTable from './Components/FlighsTable'
import GET_FLIGHTS from './Queries/GetFLights'
import SearchInput from './Components/SearchInput'

const INIT_STATE = {
    from: 'PRG',
    to: 'BCN',
    date: '2018-03-16'
  }

class App extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { ...INIT_STATE }
  }

  handleChange(propertyName, value) {
    this.setState({
        [propertyName]: value,
    })
  }

  validateInput(){
    return this.state.from && this.state.to && this.state.date.match(/^\d\d\d\d-\d\d-\d\d$/g)
  }

  render() {
    const isInputValid = this.validateInput();
    const MyComponentWithData = isInputValid && (
      graphql(GET_FLIGHTS, 
        {
          options: 
            { 
              variables: 
                {
                  from: this.state.from,
                  to: this.state.to,
                  date: this.state.date,
                } 
            },
            props: ({ data: { loading, error, allFlights, fetchMore, variables, prevCursor } }) => {
              //console.log(cursor)
              return {                
                loading: loading,
                error: error,
                allFlights: allFlights,
                nextPage: () => {
                  return fetchMore({
                    variables: {
                      from: variables.from,
                      to: variables.to,
                      date: variables.date,
                      cursor: allFlights.pageInfo.endCursor
                    },
                    updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
                      return {
                        ...previousResult,
                        allFlights: {
                          ...fetchMoreResult.allFlights,
                          pageInfo: fetchMoreResult.allFlights.pageInfo,
                          edges: [...previousResult.allFlights.edges, ...fetchMoreResult.allFlights.edges]
                        }
                      }
                    }
                  })
                }
              }
            }
        }
      )(FlightsTable)
    )
    return (
      <div className='main-container'>
        <SearchInput handleChange={this.handleChange} search={this.state} client={this.props.client}/>
        {isInputValid && <MyComponentWithData />}
      </div>
    );
  }
}



export default App;
