process.env["NODE_CONFIG_DIR"] = "../config/";

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var connectToKeeper = require('../clients/connect-to-keeper');
var config = require('config');
var boardRoute = require('../routes/board.route');
var MicroBoardInfo = require('../server-info/server-info').MicroBoard;
var passport = require('passport');
require('../passport-jwt/passport')(passport);


var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.get('DBBoard'));
const db = mongoose.connection;
db.once('open', () => {
    console.log(`MongoDB ${config.get('DBBoard')} is Open`)
})

connectToKeeper(MicroBoardInfo, (microNodesInfo) => {
    console.log('##############  RECEIVE MESSAGE ############## \n', microNodesInfo); 
})

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/board',boardRoute);


app.listen(MicroBoardInfo.port, 'localhost', () => {
    console.log(`\n************MicroBook PORT:${MicroBoardInfo.port} ************ \n`);    
})
