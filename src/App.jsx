
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

//import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p> Page Not Found </p>;

const RoutedApp = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={IssueList}/>
            <Route path="/ddd" component={IssueEdit}/>
            <Route path="*" component={NoMatch}/>
        </Switch>
    </Router>
  );
  
ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
    module.hot.accept();
}
