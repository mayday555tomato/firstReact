
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter,browserHistory} from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import IssueAddNavItem from './IssueAddNavItem.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p> Page Not Found </p>;

const Header = () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                Issue Tracker YAY
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <LinkContainer to='/issues'>
                <NavItem>Issues</NavItem>
            </LinkContainer>
            <LinkContainer to='/reports'>
                <NavItem>Reports</NavItem>
            </LinkContainer>
        </Nav>
        <Nav pullRight>
            <IssueAddNavItem />
            <NavDropdown title={<Glyphicon glyph='option-horizontal' />} noCaret id="user-dropdown">
                <MenuItem>Configuration</MenuItem>
                <MenuItem divider />
                <MenuItem>Logout</MenuItem>
            </NavDropdown>
        </Nav>
    </Navbar>
);

const RoutedApp = () => (
    <Router history={browserHistory}>
        <div className='container-fluid'>
            <Header />
            <Switch>
                <Redirect exact from='/' to='/issues' />            
                <Route exact path='/issues' component={IssueList} />
                <Route exact path='/issues/:id' component={IssueEdit} />
                <Route component={NoMatch}/>
            </Switch>
            <div className='footer'>
                Created by TOMATO
            </div>
        </div>
    </Router>
  );
  
ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
    console.log('Hot Module Replacement is happenning!!!');
    module.hot.accept();
}
