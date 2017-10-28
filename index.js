var express = require('express');
var morgan = require('morgan');
var config = require('./config');

var app = express();


app.use(morgan('tiny'));
app.use(express.static(__dirname + '/app/static'));
app.use(express.static(__dirname + '/node_modules'));

app.get('*.json',function (req, res) {
    console.log(req.originalUrl);
    res.sendFile('app'+req.originalUrl, {root: __dirname})
});


app.get('/*.js',function (req, res) {
   res.sendfile('app'+req.originalUrl, {root: __dirname});
});

app.get('/*.html',function (req, res) {
   res.sendfile('app'+req.originalUrl.split("?")[0], {root: __dirname});
});

app.get('*',function(req, res){
	res.sendFile('app/index.html', {root: __dirname});
});

const port = config.SERVER.PORT;
app.listen(port);