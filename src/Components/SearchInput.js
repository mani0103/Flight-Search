import React, { Component } from 'react';
import { Modal, OverlayTrigger, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';


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
                    onChange={(e) => this.props.handleChange('from', e.target.value)}
                    value={this.props.search.from}
                />
                <FieldGroup
                    id="formControlsDst"
                    placeholder="Enter an airport or city"
                    label="To:"
                    type="text"
                    onChange={(e) => this.props.handleChange('to', e.target.value)}
                    value={this.props.search.to}
                />
                <FieldGroup
                    id="formControlsDate"
                    placeholder="YYYY-MM-DD"
                    label="Date:"
                    type="text"
                    onChange={(e) => this.props.handleChange('date', e.target.value)}
                    value={this.props.search.date}
                />
            </form>
        )
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

export default SearchInput;