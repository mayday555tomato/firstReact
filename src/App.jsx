
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

//import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter} from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p> Page Not Found </p>;

const RoutedApp = () => (
    <Router>
        <Switch>
            <Redirect exact from='/' to='/issues' />
            <Route exact path='/issues' component={IssueList} />
            <Route exact path='/issues/:id' component={IssueEdit} />
            <Route component={NoMatch}/>
        </Switch>
    </Router>
  );
  // <Route exact path="/" component={IssueList} />
  
ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
    module.hot.accept();
}
