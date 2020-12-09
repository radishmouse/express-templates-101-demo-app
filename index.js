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

const topics = [
    { node: 'Node.js is JavaScipt for the command line. Good for building servers.'},
    { express: 'A helper library for writing HTTP servers in Node.js'},
    { AWS: `Amazon's cloud service`},
    { postgres: 'A SQL datbase engine'},
    { sequelize: 'A JavaScript library for working with SQL databases' }
];


// const topics = {
//     node: 'node is...',
//     express: 'expres is...',
// }

// convert { node: 'node is...""}, {express: '...""}
// to ['node', 'express', etc.]

// can I convert one?
function extractTopicName(topicObj) {
    const keys = Object.keys(topicObj);
    console.log(keys);
    const oneKey = keys[0];
    console.log(`oneKey is ${oneKey}`);
    console.log('----------------------------');
    return oneKey;

}
//extractTopicName(topics[0]);

app.get('/topics', (req, res) => {
    const topicNames = topics.map(extractTopicName);

    // res.render does the following:
    // 1. It reads the template file
    // 2. It runs any of the JS
    // 3. It sends the HTML string in the response
    res.render('list', {
        locals: {
            topics: topicNames
        },
        partials: {
            header: '/partials/header',
            footer: '/partials/footer',
        }
    });
});

app.get('/', (req, res) => {
    res.render('home', {
        partials: {
            header: '/partials/header',
            footer: '/partials/footer',
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
