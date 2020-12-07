const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const PORT = 3000;
const HOST = '0.0.0.0';

const topics = {
    node: 'Node.js is JavaScipt for the command line. Good for building servers.',
    express: 'A helper library for writing HTTP servers in Node.js',
    AWS: `Amazon's cloud service`,
    postgres: 'A SQL datbase engine',
    sequelize: 'A JavaScript library for working with SQL databases'
};

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/topics', (req, res) => {
    res.render('list', {
        locals: {
            topics: Object.keys(topics)
        }
    });
});

app.get('/topics/:topicName', (req, res) => {
    const topic = req.params.topicName
    res.render('details', {
        locals: {
            topic,
            definition: topics[topic]            
        }
    })
});

server.listen(PORT, HOST, () => {
    console.log(`Running at http://${HOST}:${PORT}`);
});
