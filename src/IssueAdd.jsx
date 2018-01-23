import React from 'react';

export default class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // when add button is clicked, form onSubmit event is called.
    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        // parent: createIssue method in parent is called with the entered info from the form.
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            created: new Date(),
        });
    }

    render() {
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