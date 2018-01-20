const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component{
    render(){
        return (
            <div>This is a placeholder for the issue filter.</div>
        );
    }
}

function IssueTable(props){
    const issueRows  = props.issues.map(issue =><IssueRow key={issue.id} issue = {issue} />);
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion Date</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {issueRows}
            </tbody>
        </table>
    );
}

function IssueRow(props){
    return (
        <tr>
        <td>{props.issue.id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate? props.issue.completionDate.toDateString() : ''}</td>
        <td>{props.issue.title}</td>
    </tr>
    )
}
/*
const IssueRow = (props) => (
    <tr>
        <td>{props.issue.id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate? props.issue.completionDate.toDateString() : ''}</td>
        <td>{props.issue.title}</td>
    </tr>
)*/

class IssueAdd extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //when add button is clicked, form onSubmit event is called.
    handleSubmit(e){
        e.preventDefault();
        var form = document.forms.issueAdd;
        //parent: createIssue method in parent is called with the entered info from the form.
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            created: new Date(),
        });
    }

    render(){
        return (
            <div>
                <form name='issueAdd' onSubmit={this.handleSubmit}>
                    <input type='text' name ='owner' placeholder = 'Owner' />
                    <input type = 'text' name = 'title' placeholder = 'Title' />
                    <button>Add</button>
                </form>
            </div>
        );
    }
}
class IssueList extends React.Component {
    constructor(){
        super();
        this.state = {issues : [], };
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        fetch('/api/issues').then(response => response.json())
                            .then(data => {
                                console.log("Total count of records:", data._metadata.total_count);
                                data.records.forEach(issue => {
                                    issue.created = new Date(issue.created);
                                    if (issue.completionDate)
                                        issue.completionDate = new Date(issue.completionDate);
                                });
                                this.setState({issues: data.records});
                            })
                            .catch(err => {
                                console.log(err);
                            });
    }

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
                    }
                );
            }else{
                response.json().then(err => {
                    alert("Failed to add issue: " + err.message)
                });
            }
        });
    }

    render(){
        return (
            <div>
                <h1>Issue List</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </div>
        );
    }
}



ReactDOM.render(<IssueList />, contentNode);