var express = require('express');
var morgan = require('morgan');
var config = require('./config');

var app = express();


app.use(morgan('tiny'));
app.use(express.static('app'));
app.use(express.static(__dirname + '/node_modules'));


const port = config.SERVER.PORT;
app.listen(port);