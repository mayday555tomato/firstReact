import React from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';
import {Button, Glyphicon, Table, Panel } from 'react-bootstrap';
import IssueFilter from './IssueFilter.jsx';
import Toast from './Toast.jsx';


export default class IssueList extends React.Component {
    constructor(){
        super();
        this.state = {
            issues : [],
            toastVisible: false,
            toastMessage: '',
            toastType: 'success',
        };
        this.setFilter = this.setFilter.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
        this.showError = this.showError.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
    }

    componentDidMount(){
        this.loadData();  
    }

    componentDidUpdate(prevProps){
        const oldQuery = qs.parse(prevProps.location.search.substring(1));
        const newQuery = qs.parse(this.props.location.search.substring(1));
        if(oldQuery.status === newQuery.status &&
            oldQuery.effort_gte === newQuery.effort_gte &&
            oldQuery.effort_lte === newQuery.effort_lte) {
                return;
            }
        this.loadData();         
    }

    showError(message){
        this.setState({
            toastVisible: true, toastMessage: message, toastType: 'danger'
        });
    }

    showSuccess(message){
        this.setState({
            toastVisible: true, toastMessage: message, toastType: 'info'
        })
    }

    dismissToast(){
        this.setState({toastVisible: false});
    }

    loadData(){
        fetch(`/api/issues${this.props.location.search}`).then(response =>{
            if(response.ok){
                response.json().then(data =>{
                    console.log("Total count of records:" + data._metadata.total_count);
                    data.records.forEach(issue => {
                        issue.created = new Date(issue.created);
                        if(issue.completionDate)
                            issue.completionDate = new Date(issue.created);
                       
                    });
                    this.setState({issues: data.records});
                });
            }else {
                response.json().then(error =>{
                    this.showError(`Failed to fetch issues ${error.message}` );
                });
            }
        }).catch(err =>{
            this.showError(`Error in fetching data from server ${err}`);
        });
    }
/*
    createIssue(newIssue){
        fetch('/api/issues', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newIssue), //pass 'newIssue' (created from the form) to req.body in json format to SERVER side. 
            //Here is client side.
        }).then(response => 
        {
            if(response.ok){
                response.json().then(
                    updatedIssue => {
                        updatedIssue.created = new Date(updatedIssue.created); //JSON date format is not regular date, so we need to convert it.
                        if(updatedIssue.completionDate)
                            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                        const newIssues = this.state.issues.concat(updatedIssue); //javascript: array.concat: combine two arrays together, doesnt modify original array, returns a new combined array.
                        this.setState({issues : newIssues});
                        this.showSuccess('Created successfully.');
                    }
                );
            }else{
                response.json().then(err => {
                    this.showError(`Failed to add issue: ${err.message}`);
                });
            }
        });
    }
*/
    deleteIssue(id){
        fetch(`/api/issues/${id}`, {method: 'DELETE'}).then(response => {
            if(!response.ok) alert('Failed to delete issue');
            else {
                this.loadData();
                this.showSuccess('Delete Succeeded.');
            }
        });
    }

    setFilter(query){
        this.props.history.push({pathname: this.props.location.pathname, search: qs.stringify(query)});
    }
    render(){
        return (
            <div>            
                <Panel bsStyle="success">
                    <Panel.Heading>
                        <Panel.Title toggle>Filter</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible> 
                    <IssueFilter setFilter = {this.setFilter} initFilter={qs.parse(this.props.location.search.substring(1))} />
                    </Panel.Body>
                </Panel>
                <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue}/>
                <Toast showing={this.state.toastVisible} message={this.state.toastMessage} onDismiss={this.dismissToast} bsStyle={this.state.toastType} />
            </div>
        );
    }
}


IssueList.propTypes = {
    location: PropTypes.object.isRequired,
    router: PropTypes.object,
};

function IssueTable(props){
    const issueRows  = props.issues.map(issue =><IssueRow key = { issue._id } issue = {issue} deleteIssue={props.deleteIssue}/>);
    return (
        <Table bordered condensed hover responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion Date</th>
                    <th>Title</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {issueRows}
            </tbody>
        </Table>
    );
}

IssueTable.propTypes = {
    issues: PropTypes.array.isRequired,
    deleteIssue: PropTypes.func.isRequired,
}

const IssueRow = (props) =>{
    function onDeleteClick(){
        props.deleteIssue(props.issue._id);
    }
    return (
        <tr>
        <td><Link to={`/issues/${props.issue._id}`}>{props.issue._id}</Link></td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate? props.issue.completionDate.toDateString() : ''}</td>
        <td>{props.issue.title}</td>
        <td><Button bsSize='xsmall' onClick={onDeleteClick}><Glyphicon glyph='trash' /></Button></td>
    </tr>
    )
}

IssueRow.propTypes = {
    issue: PropTypes.object.isRequired,
    deleteIssue: PropTypes.func.isRequired,
}
