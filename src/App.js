import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { graphql } from 'react-apollo';
import FlightsTable from './Components/FlighsTable'
import GET_FLIGHTS from './Queries/GetFLights'
import GET_LOCATIONS from './Queries/GetLLocations'
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
      graphql(GET_FLIGHTS, {
        options: 
          { 
            variables: 
              {
                from: this.state.from,
                to: this.state.to,
                date: this.state.date,
              } 
          }
      })(FlightsTable)
    )
    const SearchInputWithData = 
      graphql(GET_LOCATIONS, {options: {variables: { search: this.props.value }}})( ({data}) => {
          const options = data.loading || data.error ? [] :data.allLocations.edges.map(
                  edge =>  edge.node.name    
              )
          return (
            <SearchInput handleChange={this.handleChange} search={this.state} options={options}/>
          )
      });
    return (
      <div className='main-container'>
        <SearchInputWithData/>
        {isInputValid && <MyComponentWithData />}
      </div>
    );
  }
}



export default App;
