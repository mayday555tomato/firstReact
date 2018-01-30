import React from 'react';
import {withRouter} from 'react-router';
import {NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolBar, ButtonToolbar} from 'react-bootstrap';
import PropTypes from 'prop-types';

import Toast from './Toast.jsx';

class IssueAddNavItem extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            aaa: false,
            toastVisible: false,
            toastMessage: '',
            toastType: 'success',
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submit = this.submit.bind(this);
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
        this.test = this.test.bind(this);
    }
    test(){
        console.log('test is called.');
    }

    handleShow(){
        this.setState({ aaa: true});
        console.log('handleShow is triggered.');
    }

    handleClose(){
        this.setState({ aaa: false });
        console.log('handleClose is triggered.');
    }

    showError(message){
        this.setState({
            toastVisible: true, toastMessage: message, toastType: 'danger',
        });
    }

    dismissToast(){
        this.setState({toastVisible: false});
    }

    submit(e){
        e.preventDefault();
        this.handleClose();
        const form = document.forms.issueAdd;
        const newIssue = {
            owner: form.owner.value, title: form.title.value, status: 'New', created: new Date(),
        };
        fetch('/api/issues', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newIssue),
        }).then(response =>{
            if(response.ok) {
                response.json().then(updatedIssue => {
                    this.props.router.push(`/issues/${updatedIssue._id}`);
                });
            }else{
                response.json().then(error=>{
                    this.showError(`Failed to add issue: ${error.message}`);
                });
            }
        }).catch(err => {
            this.showError(`Error in sending data to server: ${err.message}`);
        });
    }
//onClick={this.handleShow}
    render(){
        return (
            <NavItem onSelect={this.handleShow} eventKey='aaa'><Glyphicon glyph='plus' />  Create Issue 
                <Modal keyboard show={this.state.aaa} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Issue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form name='issueAdd'>
                            <FormGroup>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl name='title' autoFocus />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Owner</ControlLabel>
                                <FormControl name='owner' />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonToolbar>
                            <Button type='button' bsStyle='primary' onClick={this.submit}>Submit</Button>
                            <Button bsStyle='link' onClick={this.handleClose}>Cancel</Button>
                            <Button type='button' bsStyle='success' onClick={this.test}>Test</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
                <Toast showing={this.state.toastVisible} message={this.state.toastMessage} onDismiss={this.dismissToast} bsStyle={this.state.toastType} />
            </NavItem>
        )
    }
}

IssueAddNavItem.propTypes = {
    router: PropTypes.object,
}

export default withRouter(IssueAddNavItem);