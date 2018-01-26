webpackJsonp(["app"],{

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(173);


/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(113);

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(149);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(57);

var _IssueList = __webpack_require__(407);

var _IssueList2 = _interopRequireDefault(_IssueList);

var _IssueEdit = __webpack_require__(412);

var _IssueEdit2 = _interopRequireDefault(_IssueEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentNode = document.getElementById('contents');

//import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

var NoMatch = function NoMatch() {
    return _react2.default.createElement(
        'p',
        null,
        ' Page Not Found '
    );
};

var RoutedApp = function RoutedApp() {
    return _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        { history: _reactRouterDom.browserHistory },
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                { className: 'header' },
                _react2.default.createElement(
                    'h1',
                    null,
                    'Issue Trackereeee'
                )
            ),
            _react2.default.createElement(
                _reactRouterDom.Switch,
                null,
                _react2.default.createElement(_reactRouterDom.Redirect, { exact: true, from: '/', to: '/issues' }),
                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/issues', component: _IssueList2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/issues/:id', component: _IssueEdit2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { component: NoMatch })
            ),
            _react2.default.createElement(
                'div',
                { className: 'footer' },
                'Created by YZ test link ',
                _react2.default.createElement(
                    'a',
                    { href: 'www.google.com' },
                    'click it'
                )
            )
        )
    );
};

_reactDom2.default.render(_react2.default.createElement(RoutedApp, null), contentNode);

if (false) {
    console.log('hottt');
    module.hot.accept(function () {
        console.log('It\'s soooo HOOOOOT!!!');
    });
}

/***/ }),

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(168);

var _reactRouterDom = __webpack_require__(57);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _qs = __webpack_require__(169);

var _qs2 = _interopRequireDefault(_qs);

var _IssueAdd = __webpack_require__(410);

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

var _IssueFilter = __webpack_require__(411);

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueList = function (_React$Component) {
    _inherits(IssueList, _React$Component);

    function IssueList() {
        _classCallCheck(this, IssueList);

        var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

        _this.state = { issues: [] };
        _this.createIssue = _this.createIssue.bind(_this);
        _this.setFilter = _this.setFilter.bind(_this);
        return _this;
    }

    _createClass(IssueList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var oldQuery = _qs2.default.parse(prevProps.location.search.substring(1));
            var newQuery = _qs2.default.parse(this.props.location.search.substring(1));
            if (oldQuery.status === newQuery.status) return;
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this2 = this;

            fetch('/api/issues' + this.props.location.search).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log("Total count of records:" + data._metadata.total_count);
                        data.records.forEach(function (issue) {
                            issue.created = new Date(issue.created);
                            if (issue.completionDate) issue.completionDate = new Date(issue.created);
                        });
                        _this2.setState({ issues: data.records });
                    });
                } else {
                    response.json().then(function (error) {
                        alert("Failed to fetch issues:" + error.message);
                    });
                }
            }).catch(function (err) {
                alert("Error in fetching data from server:", err);
            });
        }
    }, {
        key: 'createIssue',
        value: function createIssue(newIssue) {
            var _this3 = this;

            fetch('/api/issues', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newIssue) //pass 'newIssue' (created from the form) to req.body in json format to SERVER side. 
                //Here is client side.
            }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (updatedIssue) {
                        updatedIssue.created = new Date(updatedIssue.created); //JSON date format is not regular date, so we need to convert it.
                        if (updatedIssue.completionDate) updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                        var newIssues = _this3.state.issues.concat(updatedIssue); //javascript: array.concat: combine two arrays together, doesnt modify original array, returns a new combined array.
                        _this3.setState({ issues: newIssues });
                    });
                } else {
                    response.json().then(function (err) {
                        alert("Failed to add issue: " + err.message);
                    });
                }
            });
        }
    }, {
        key: 'setFilter',
        value: function setFilter(query) {
            this.props.history.push({ pathname: this.props.location.pathname, search: _qs2.default.stringify(query) });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_IssueFilter2.default, { setFilter: this.setFilter }),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(IssueTable, { issues: this.state.issues }),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(_IssueAdd2.default, { createIssue: this.createIssue })
            );
        }
    }]);

    return IssueList;
}(_react2.default.Component);

exports.default = IssueList;


IssueList.propTypes = {
    location: _propTypes2.default.object.isRequired,
    router: _propTypes2.default.object
};

function IssueTable(props) {
    var issueRows = props.issues.map(function (issue) {
        return _react2.default.createElement(IssueRow, { key: issue._id, issue: issue });
    });
    return _react2.default.createElement(
        'table',
        { className: 'bordered-table' },
        _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'th',
                    null,
                    'Id'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Status'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Owner'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Created'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Effort'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Completion Date'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Title'
                )
            )
        ),
        _react2.default.createElement(
            'tbody',
            null,
            issueRows
        )
    );
}

function IssueRow(props) {
    return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/issues/' + props.issue._id },
                props.issue._id
            )
        ),
        _react2.default.createElement(
            'td',
            null,
            props.issue.status
        ),
        _react2.default.createElement(
            'td',
            null,
            props.issue.owner
        ),
        _react2.default.createElement(
            'td',
            null,
            props.issue.created.toDateString()
        ),
        _react2.default.createElement(
            'td',
            null,
            props.issue.effort
        ),
        _react2.default.createElement(
            'td',
            null,
            props.issue.completionDate ? props.issue.completionDate.toDateString() : ''
        ),
        _react2.default.createElement(
            'td',
            null,
            props.issue.title
        )
    );
}

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueAdd = function (_React$Component) {
    _inherits(IssueAdd, _React$Component);

    function IssueAdd() {
        _classCallCheck(this, IssueAdd);

        var _this = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    // when add button is clicked, form onSubmit event is called.


    _createClass(IssueAdd, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var form = document.forms.issueAdd;
            // parent: createIssue method in parent is called with the entered info from the form.
            this.props.createIssue({
                owner: form.owner.value,
                title: form.title.value,
                created: new Date()
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'form',
                    { name: 'issueAdd', onSubmit: this.handleSubmit },
                    _react2.default.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
                    _react2.default.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
                    _react2.default.createElement(
                        'button',
                        null,
                        'Add'
                    )
                )
            );
        }
    }]);

    return IssueAdd;
}(_react2.default.Component);

exports.default = IssueAdd;

/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(57);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueFilter = function (_React$Component) {
    _inherits(IssueFilter, _React$Component);

    function IssueFilter() {
        _classCallCheck(this, IssueFilter);

        var _this = _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).call(this));

        _this.clearFilter = _this.clearFilter.bind(_this);
        _this.setFilterOpen = _this.setFilterOpen.bind(_this);
        _this.setFilterAssigned = _this.setFilterAssigned.bind(_this);
        return _this;
    }

    _createClass(IssueFilter, [{
        key: 'setFilterOpen',
        value: function setFilterOpen(e) {
            e.preventDefault();
            this.props.setFilter({ status: 'Open' });
        }
    }, {
        key: 'setFilterAssigned',
        value: function setFilterAssigned(e) {
            e.preventDefault();
            this.props.setFilter({ status: 'Assigned' });
        }
    }, {
        key: 'clearFilter',
        value: function clearFilter(e) {
            e.preventDefault();
            this.props.setFilter({});
        }
    }, {
        key: 'render',
        value: function render() {
            var Separator = function Separator() {
                return _react2.default.createElement(
                    'span',
                    null,
                    ' | '
                );
            };
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'a',
                    { href: '#', onClick: this.clearFilter },
                    'All Issues'
                ),
                _react2.default.createElement(Separator, null),
                _react2.default.createElement(
                    'a',
                    { href: '#', onClick: this.setFilterOpen },
                    'Open Issues'
                ),
                _react2.default.createElement(Separator, null),
                _react2.default.createElement(
                    'a',
                    { href: '#', onClick: this.setFilterAssigned },
                    'Assigned Issues'
                )
            );
        }
    }]);

    return IssueFilter;
}(_react2.default.Component);

/*
<div>
                <Link to="/issues">All Issues</Link>
                <Separator />
                <Link to="/issues?status=Open">Open Issues</Link>
                <Separator />
                <Link to="/issues?status=Assigned">Assigned Issues</Link>
            </div>
            */


exports.default = IssueFilter;

/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(57);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueEdit = function (_React$Component) {
    _inherits(IssueEdit, _React$Component);

    function IssueEdit() {
        _classCallCheck(this, IssueEdit);

        return _possibleConstructorReturn(this, (IssueEdit.__proto__ || Object.getPrototypeOf(IssueEdit)).apply(this, arguments));
    }

    _createClass(IssueEdit, [{
        key: 'render',
        value: function render() {
            var id = this.props.match.params.id;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'This is a placeholder for editing issue: ',
                    this.props.match.params.id
                ),
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/issues' },
                    'Back to issue list'
                )
            );
        }
    }]);

    return IssueEdit;
}(_react2.default.Component);

exports.default = IssueEdit;


IssueEdit.propTypes = {
    params: _propTypes2.default.object
};

/***/ })

},[172]);
//# sourceMappingURL=app.bundle.js.map