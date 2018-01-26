'use strict';

require('babel-polyfill');

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _issue = require('./issue.js');

var _issue2 = _interopRequireDefault(_issue);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sourceMapSupport2.default.install();

const app = (0, _express2.default)();

app.use(_express2.default.static('static'));
app.use(_bodyParser2.default.json());
/*
const issues = [
    {
        id: 1, status: 'Open', owner: 'Ravan',
        created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
        title: 'Error in console when clicking Add'
    },
    {
        id: 2, status: 'Assigned', owner: 'Eddie',
        created: new Date('2016-08-16'), effort: 12, completionDate: new Date('2016-08-30'),
        title: 'Missing bottom border on panel'
    }
];
*/

let db;
_mongodb.MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
    db = connection.db('issuetracker'); // need
    app.listen(3000, () => {
        console.log('App started on port 3000');
    });
}).catch(error => {
    console.log('ERROR:', error);
});

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.get('/api/issues', (req, res) => {
    const filter = {};
    console.log('req.query: ' + _qs2.default.stringify(req.query));
    if (req.query.status) filter.status = req.query.status;

    db.collection('issues').find(filter).toArray().then(issues => {
        const metadata = { total_count: issues.length };
        res.json({ _metadata: metadata, records: issues });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
    console.log('Get /api/issues is called...');
});

app.post('/api/issues', (req, res) => {
    console.log('Post /api/issues is called...');
    const newIssue = req.body; // from List createIssue fetch 'body: JSON.stringify(newIssue)'
    newIssue.created = new Date();
    if (!newIssue.status) newIssue.status = 'New';
    const err = _issue2.default.validateIssue(newIssue);
    if (err) {
        res.status(422).json({ message: `Invalid requrest: ${err}` });
        return;
    }
    db.collection('issues').insertOne(newIssue).then(result => db.collection('issues').find({ _id: result.insertedId }).limit(1).next()).then(tmp => {
        res.json(tmp);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('*', (req, res) => {
    res.sendFile(_path2.default.resolve('./static/index.html'));
});
/* Not necessary for me.
if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../webpack.config');
    
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(bundler, { log: console.log }));
}
*/
//# sourceMappingURL=server.js.map