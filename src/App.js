import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Modal, OverlayTrigger, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

import { graphql } from 'react-apollo';
import FlightsTable from './Components/FlighsTable'
import GET_FLIGHTS from './Queries/GetFLights'


class App extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      from: '',
      to: '',
      date: ''
    }
  }

  componentDidMount(){

  }

  handleChange(propertyName, value) {
    this.setState({
        [propertyName]: value,
    })
  }

  render() {
    const MyComponentWithData = graphql(GET_FLIGHTS, {
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
    return (
      <div>
        <form>
          <FieldGroup
              id="formControlsSrc"
              type="text"
              label="From:"
              placeholder="Enter an airport or city"
              onChange={(e) => this.handleChange('from', e.target.value)}
              value={this.state.from}
          />
          <FieldGroup
              id="formControlsDst"
              placeholder="Enter an airport or city"
              label="To:"
              type="text"
              onChange={(e) => this.handleChange('to', e.target.value)}
              value={this.state.to}
          />
          <FieldGroup
              id="formControlsDate"
              placeholder="YYYY-MM-DD"
              label="Date:"
              type="text"
              onChange={(e) => this.handleChange('date', e.target.value)}
              value={this.state.date}
          />
        </form>
        <MyComponentWithData />
      </div>
    );
  }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
      <FormGroup controlId={id} validationState={props.validationState}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
          <FormControl.Feedback />
          {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
  );
}

export default App;
