import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, MenuItem  } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Autosuggest from 'react-bootstrap-autosuggest'
import { graphql } from 'react-apollo';


class SearchInput extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <form>
                <FieldGroup
                    id="formControlsSrc"
                    type="text"
                    label="From:"
                    placeholder="Enter an airport or city"
                    onChange={(e) => this.props.handleChange('from', e)}
                    value={this.props.search.from}
                    {...this.props}
                />
                <FieldGroup
                    id="formControlsDst"
                    placeholder="Enter an airport or city"
                    label="To:"
                    type="text"
                    onChange={(e) => this.props.handleChange('to', e)}
                    value={this.props.search.to}
                    {...this.props}
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



export default SearchInput;