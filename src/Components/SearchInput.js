import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, MenuItem  } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Autosuggest from 'react-bootstrap-autosuggest'
import GET_LOCATIONS from '../Queries/GetLLocations'
import { graphql } from 'react-apollo';


class SearchInput extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <form>
                <FormWithSuggestions
                    id="formControlsSrc"
                    type="text"
                    label="From:"
                    placeholder="Enter an airport or city"
                    onChange={(e) => this.props.handleChange('from', e)}
                    value={this.props.search.from}
                />
                <FormWithSuggestions
                    id="formControlsDst"
                    placeholder="Enter an airport or city"
                    label="To:"
                    type="text"
                    onChange={(e) => this.props.handleChange('to', e)}
                    value={this.props.search.to}
                />
                <FieldGroup
                    id="formControlsDate"
                    placeholder="YYYY-MM-DD"
                    label="Date:"
                    type="text"
                    onChange={(e) => this.props.handleChange('date', e)}
                    value={this.props.search.date}
                    options = {[]}
                />              
            </form>
        )
    }
}

function FieldGroup({ id, label, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <Autosuggest    
                datalist={props.options}
                placeholder={props.placeholder}
                {...props}
            />
        </FormGroup>
    );
}

class FormWithSuggestions extends Component{
    constructor(props){
        super(props);
        this.state = {
            options: ''
        }
    }

    render() {
        const FormWithData = 
            graphql(GET_LOCATIONS, {options: {variables: { search: this.props.value }}})( ({data}) => {
                
                data.loading || data.error 
                const options = data.loading || data.error ? [] :data.allLocations.edges.map(
                        edge =>  edge.node.name    
                    )
                //console.log(data.allLocations.edges.map(edge => { name: edge.node.name }));
                return (
                    <FieldGroup options={options}  {...this.props} />
                )
            });
        return(
            <FormWithData />
        )
    }
}

export default SearchInput;