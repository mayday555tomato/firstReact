import React from 'react';
import {Form, FormControl, Button} from 'react-bootstrap';

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
                <Form inline name='issueAdd' onSubmit={this.handleSubmit}>
                    <FormControl name='owner' placeholder='Owner' />
                    {' '}
                    <FormControl name='title' placeholder='Title' />
                    {' '}
                    <Button type='submit' bsStyle='success'>Add</Button>
                </Form>
            </div>
        );
    }
}