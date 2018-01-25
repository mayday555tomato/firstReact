Chapter 08 - Programmatic Navigation

React Router v 4.0 has changed a lot since the book was written.

1. ProTypes has been moved out. npm package 'prop-types' is needed.
syntax:

import PropTypes from 'prop-types';
IssueEdit.propTypes = {
    params : PropTypes.object,
};


2. React Router: 
- Router can only have one child
- it has moved 'query' out. need a npm package 'qs' (or 'query-string' similar) to parse query-string.
push it to histroy, get it from location.search. 
Also need to trim one character which is the question mark in ?status=Open
qs.stringfy
qs.parse

TODO:
when refreshing page, error CANNOT GET/
- client side VS server side
Router - Switch/Route using Exact key word

if dont use key word at all. error message, you are redirecting to the page you are at now.
and Link navigation to IssueEdit will not work.