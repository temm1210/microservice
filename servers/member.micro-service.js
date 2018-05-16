process.env["NODE_CONFIG_DIR"] = "../config/";

var express = require('express');
var bodyParser = require('body-parser');
var MicroMemberInfo = require('../server-info/server-info').MicroMember;
var connectToKeeper = require('../clients/connect-to-keeper');
var config = require('config');
var morgan = require('morgan');
var passport = require('passport');
var memberRoute = require('../routes/member.route');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('DBMember'));
const db = mongoose.connection;
db.once('open', () => {
    console.log(`MongoDB ${config.get('DBMember')} is Open`)
})
var app = express();

connectToKeeper(MicroMemberInfo, (microNodesInfo) => {
    console.log('##############  RECEIVE MESSAGE ############## \n', microNodesInfo); 
})

app.use(passport.initialize());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({urlencoded:false}));

app.use('/member', memberRoute);

app.listen(MicroMemberInfo.port, 'localhost', () => {
    console.log(`\n************MicroBook PORT:${MicroMemberInfo.port} ************ \n`);    
})
