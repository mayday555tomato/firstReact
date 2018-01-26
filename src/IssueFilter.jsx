import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class IssueFilter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            status: props.initFilter.status || '',
            effort_gte: props.initFilter.effort_gte || '',
            effort_lte: props.initFilter.effort_lte || '',
            chagne: false
        };
        this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
        this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            status: newProps.initFilter.status || '',
            effort_gte: newProps.initFilter.effort_gte || '',
            effort_lte: newProps.initFilter.effort_lte || '',
            changed: false,
        })
    }
    
    render() {
        const Separator = () => <span> | </span>;
        return (
            <div>
                Status: &nbsp;&nbsp;
                <select value = {this.state.status} onChange={this.onChangeStatus}>
                    <option value="">(Any)</option>
                    <option value='New'>New</option>
                    <option value='Open'>Open</option>
                    <option value='Assigned'>Assigned</option>
                    <option value='Fixed'>Fixed</option>
                    <option value='Verified'>Verified</option>
                    <option value='Closed'>Closed</option>
                </select>
                <Separator />
                    Effort between:&nbsp;&nbsp; 
                    <input size={5} defaultValue='' onChange={this.onChangeEffortGte} />&nbsp;--&nbsp;
                    <input size={5} defaultValue='' onChange={this.onChangeEffortLte} />
                    <Separator />
                    <button onClick={this.applyFilter}>Apply</button>
                    <Separator />
                    <button onClick={this.resetFilter}>Reset</button>
                    <Separator />
                    <button onClick={this.clearFilter}>Clear</button>
            </div>
        );
    }
    //value={this.state.effort_gte}
    onChangeStatus(e){
        this.setState({status: e.target.value, changed: true});
    }

    onChangeEffortGte(e){
        const effortString = e.target.value;
        if(effortString.match(/[0-9]+/)) {
            this.setState({effort_gte: e.target.value, chagned: true});
        }        
    }

    onChangeEffortLte(e) {
        const effortString = e.target.value;
        if(effortString.match(/[0-9]+/)) {
            this.setState({effort_lte: e.target.value, chagned: true});
        }    
    }

    applyFilter(){
        const newFilter = {};
        if(this.state.status) newFilter.status = this.state.status;
        if(this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
        if(this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
        this.props.setFilter(newFilter);
    }

    clearFilter(){
        this.props.setFilter({});
    }

    resetFilter(){
        this.setState({
            status: this.props.initFilter.status || '',
            effort_lte: this.props.initFilter.effort_lte || '',
            effort_gte: this.props.initFilter.effort_gte || '',
            change: false,
        })
    }
}

IssueFilter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    initFilter: PropTypes.object.isRequired
}