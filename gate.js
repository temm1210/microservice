var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var connectToKeeper = require('./clients/connect-to-keeper');
var GateInfo = require('./server-info/server-info').Gate;
var axios = require('axios');
var path = require('path');

var nodes = []
var app = express();

//conect to keeper have MicroBookServerInfo and save all MicroService
connectToKeeper(GateInfo, (microNodes) => {
    nodes = microNodes;
    console.log('############## receive message ############## \n',nodes );
    console.log('############## ############## ############## \n');
});

//var bookRoute = require('./routes/book.route');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.resolve(__dirname,'dist','micro-angular')));

app.use('/', onRequest);

app.listen(GateInfo.port, 'localhost', () => {
    console.log(`express server open on ${GateInfo.port} port`)
})
function onRequest(req, res) {
    request(req, res,callback)  
}

//********************************** request handle **********************//
function callback(response, res) {
    console.log('Wow Good!!', response.data);
    res.json(response.data);   
}

function request(req, res, callback) {
    let basePath = requestPath(req.path);
    let microNode = findMicroService(basePath);
    console.log('http://localhost:${microNode.port}${req.url}:',`http//localhost:${microNode.port}${req.url}`)

    let config = {
        method:req.method,
        url:`http://localhost:${microNode.port}${req.url}`     
    }

    if(req.method === "POST" || req.method === "PUT")
        config.data = req.body;

    axios(config).then( response => process.nextTick(callback, response, res))
}


//*********************************** util function **************************** */
function requestPath(url) {
    let splitToken = '/';
    let urls = url.split( splitToken );
    let path = splitToken + urls[1];
    return path;
}

function findMicroService(path) {
    return nodes.find((node) => node.server.path === path).server;
}