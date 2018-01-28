Chapter 09 - API: update and delete

Update:
- onSubmit event on form
- PUT api
- server side: issues.js: convert issue: convert issue datetime object

Delete:
- delete button: in IssueRow
- delete function: in IssueList, get passed to IssueTable: <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue}/>
- IssueTable: pass deleteIssue to IssueRow: const issueRows  = props.issues.map(issue =><IssueRow key = { issue._id } issue = {issue} deleteIssue={props.deleteIssue}/>);
- IssueRow:  <td><button onClick={onDeleteClick}>Delete</button></td>
function onDeleteClick(){
    props.deleteIssue(props.issue._id);
}

