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
                <FieldGroupWithData
                    id="formControlsSrc"
                    type="text"
                    label="From:"
                    placeholder="Enter an airport or city"
                    onChange={(e) => this.props.handleChange('from', e)}
                    value={this.props.search.from}
                />
                <FieldGroupWithData
                    id="formControlsDst"
                    placeholder="Enter an airport or city"
                    label="To:"
                    type="text"
                    onChange={(e) => this.props.handleChange('to', e)}
                    value={this.props.search.to}
                />
                <FieldGroupWithData
                    id="formControlsDate"
                    placeholder="YYYY-MM-DD"
                    label="Date:"
                    type="text"
                    onChange={(e) => this.props.handleChange('date', e)}
                    value={this.props.search.date}
                />              
            </form>
        )
    }
}

class FieldGroupWithData extends Component{

    constructor(props){
        super(props);
    }
    
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }
     
    render() {
        const InputFrom = 
            graphql(GET_LOCATIONS,{options:{variables:{search: this.props.value}}})( ({data}) => {
                const options = data.loading || data.error ? 
                    []:
                    Array.from(new Set(data.allLocations.edges.map(
                        edge =>  edge.node.name    
                    )))
                //console.log(options)
                return (
                    <FieldGroup options={options} {...this.props} data={data}/>
                )
            });
        return (
            <InputFrom/>
        );
    }
}

class FieldGroup extends Component {
    constructor(props){
        super(props);
        this.onLocationSearch = this.onLocationSearch.bind(this)   
    }
    
    onLocationSearch(search, page, prev){
        console.log(search)
        this.props.data.refetch({search: search});
    }

    moveCaretAtEnd(el) {
        if (typeof el.selectionStart == "number") {
            el.selectionStart = el.selectionEnd = el.value.length;
        } else if (typeof el.createTextRange != "undefined") {
            el.focus();
            var range = el.createTextRange();
            range.collapse(false);
            range.select();
        }
    }
            

    render(){
        //console.log(this.props)
        return(
            <FormGroup controlId={this.props.id}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <Autosuggest    
                    datalist={this.props.options}
                    placeholder={this.props.placeholder}
                    {...this.props}
                    onSearch={this.onLocationSearch}
                    autoFocus
                    datalistPartial
                    onFocus={this.moveCaretAtEnd}
                />
            </FormGroup>
        )
    }
}



export default SearchInput;