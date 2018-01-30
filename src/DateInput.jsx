import React from 'react';
import PropTypes from 'prop-types';

export default class DateInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : this.editFormat(props.value),  //props.value : a Date Object
            focused: false,
            valid: true
        };
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(newProps.value !== this.props.value){
            this.setState({ value: this.editFormat(newProps.value)});
        }
    }

    onFocus(){
        this.setState({focused: true});
    }

    onBlur(e){
        const value = this.unformat(this.state.value);
        const valid = this.state.value === '' || value != null;
        if (valid !== this.state.valid && this.props.onValidityChange){
            this.props.onValidityChange(e, valid);
        }
        this.setState({focused: false, valid});
        if(valid) this.props.onChange(e, value);
    }
    onChange(e){
        if(e.target.value.match(/^[\d-]*$/)) {
            this.setState({ value: e.target.value});
        }
    }
    displayFormat(date){
        return (date != null) ? date.toDateString() : '';
    }
    editFormat(date) {
        const tmp = (date != null) ? date.toISOString().substr(0, 10) : ''; //returns an ISO date string
        return tmp;
    }
    unformat(str){
        const val = new Date(str);
        return isNaN(val.getTime())? null : val;
    }
    render(){        
        const value = (this.state.focused || !this.state.valid) ? this.state.value : this.displayFormat(this.props.value);
        const childProps = Object.assign({}, this.props);
        delete childProps.onValidityChange;
        return (
            <input type='text' {...childProps} value={value}
                placeholder={this.state.focused ? 'yyyy-mm-dd' : null}
                onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} />
        )
    }
}

DateInput.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onValidityChange: PropTypes.func,
    name: PropTypes.string.isRequired,
}