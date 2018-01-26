
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import qs from 'qs';
import Issue from './issue.js';
import path from 'path';

SourceMapSupport.install();

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());
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
MongoClient.connect('mongodb://localhost/issuetracker')
    .then((connection) => {
        db = connection.db('issuetracker'); // need
        app.listen(3000, () => {
            console.log('App started on port 3000');
        });
    }).catch((error) => {
        console.log('ERROR:', error);
    });


app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.get('/api/issues', (req, res) => {
    const filter = {};
    console.log('req.query: |' + qs.stringify(req.query));
    console.log('test changes');
    if(req.query.status) filter.status = req.query.status;
    if(req.query.effort_lte || req.query.effort_gte) filter.effort = {};
    if (req.query.effort_lte) {
        console.log('gte value:' + parseInt(req.query.effort_gte, 10));
        filter.effort.$lte = parseInt(req.query.effort_lte, 10);
    }
    if (req.query.effort_gte){
        console.log('lte value:' + parseInt(req.query.effort_lte, 10));
        filter.effort.$gte = parseInt(req.query.effort_gte, 10); 
    }
    db.collection('issues').find(filter).toArray()
        .then((issues) => {
            const metadata = { total_count: issues.length };
            res.json({ _metadata: metadata, records: issues });
        })
        .catch((error) => {
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
    const err = Issue.validateIssue(newIssue);
    if (err) {
        res.status(422).json({ message: `Invalid requrest: ${err}` });
        return;
    }
    db.collection('issues').insertOne(newIssue).then(result =>
        db.collection('issues').find({ _id: result.insertedId }).limit(1).next()).then((tmp) => {
        res.json(tmp);
    })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
});


app.get('*', (req, res) => {
    res.sendFile(path.resolve('./static/index.html'));
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