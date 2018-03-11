import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { graphql } from 'react-apollo';
import FlightsTable from './Components/FlighsTable'
import GET_FLIGHTS from './Queries/GetFLights'
import SearchInput from './Components/SearchInput'

const INIT_STATE = {
    from: 'PRG',
    to: 'BCN',
    date: '2018-03-29'
  }

class App extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { ...INIT_STATE }
  }

  componentDidMount(){

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
            props({data : { loading, error, allFlights, fetchMore, cursor }}){
              return {
                
                loading,
                error,
                allFlights,
                nextPage: () => {
                  console.log(cursor)
                  return fetchMore({
                    variables: {
                      from: "PRG",
                      to: "BCN",
                      date: "2018-03-16"
                    },
                    updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
                      //console.log(previousResult)
                      //console.log(fetchMoreResult.allFlights)
                      const newCursor = fetchMoreResult.allFlights.edges.cursor;
                      return {
                        ...fetchMoreResult

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
