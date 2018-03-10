import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, MenuItem  } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Autosuggest from 'react-bootstrap-autosuggest'
import { graphql } from 'react-apollo';
import GET_LOCATIONS from '../Queries/GetLLocations'



class SearchInput extends Component {

    constructor(props){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
        return false;
     }

    render() {
        const InputFrom = 
            graphql(GET_LOCATIONS)( ({data}) => {
                const options = data.loading || data.error ? 
                    []:
                    Array.from(new Set(data.allLocations.edges.map(
                        edge =>  edge.node.name    
                    )))
                
                return (
                    <FieldGroups options={options} {...this.props} />
                )
            });
        return(
            <InputFrom/>
        )
    }
}

function FieldGroup({ id, label, ...props }) {
    console.log(props.options)
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

function FieldGroups(props) {
    
    return(
        <form>
             <FieldGroup
                id="formControlsSrc"
                type="text"
                label="From:"
                placeholder="Enter an airport or city"
                onChange={(e) => props.handleChange('from', e)}
                value={props.search.from}
                options={props.options}
            />
            <FieldGroup
                id="formControlsDst"
                placeholder="Enter an airport or city"
                label="To:"
                type="text"
                onChange={(e) => props.handleChange('to', e)}
                value={props.search.to}
                options={props.options}
            />
            <FieldGroup
                id="formControlsDate"
                placeholder="YYYY-MM-DD"
                label="Date:"
                type="text"
                onChange={(e) => props.handleChange('date', e)}
                value={props.search.date}
                options={props.options}
            />              
        </form>
    )
}



export default SearchInput;