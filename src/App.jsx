
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter,browserHistory} from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p> Page Not Found </p>;

const RoutedApp = () => (
    <Router history={browserHistory}>
        <div>
            <div className='header'>
                <h1>Issue Tracker YAY</h1>
            </div>        
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
