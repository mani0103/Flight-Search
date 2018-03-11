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

        return(
            <form>
                <FieldGroup
                    id="formControlsSrc"
                    type="text"
                    label="From:"
                    placeholder="Enter an airport or city"
                    statename="from"
                    value={this.props.search.from}
                    suggestions={true}
                    {...this.props}
                />
                <FieldGroup
                    id="formControlsDst"
                    placeholder="Enter an airport or city"
                    label="To:"
                    type="text"
                    statename="to"
                    value={this.props.search.to}
                    suggestions={true}
                    {...this.props}
                />
                <FieldGroup
                    id="formControlsDate"
                    placeholder="YYYY-MM-DD"
                    label="Date:"
                    type="text"
                    statename="date"
                    value={this.props.search.date}
                    suggestions={false}
                    {...this.props}
                />              
            </form>
        )
    }
}


class FieldGroup extends Component {
    constructor(props){
        super(props);
        this.onLocationSearch = this.onLocationSearch.bind(this)
        this.state = {
            suggestions: ['No Suggestions']
        }   
    }
    
    onLocationSearch(search, page, prev){
        this.props.client.query({
           query:  GET_LOCATIONS,
           variables: {search: search}
        })
        .then(({data}) => {
            const options = data.loading || data.error ? 
                    []:
                    Array.from(new Set(data.allLocations.edges.map(
                        edge =>  edge.node.name    
                    )));
            this.setState({suggestions: options});
            this.props.handleChange(this.props.statename, search);
        })
        .catch(error => console.error(error));
        
    }

            

    render(){
        //console.log(this.props)
        return(
            <FormGroup controlId={this.props.id}>
                <ControlLabel>{this.props.label}</ControlLabel>
                {!this.props.suggestions && <Autosuggest    
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(val) => this.props.handleChange(this.props.statename, val)}
                />}
                {this.props.suggestions && <Autosuggest    
                    datalist={this.state.suggestions}
                    placeholder={this.props.placeholder}
                    onSearch={this.onLocationSearch}
                    value={this.props.value}
                    onChange={(val) => this.props.handleChange(this.props.statename, val)}
                />}
            </FormGroup>
        )
    }
}



export default SearchInput;