var express = require('express');
var morgan = require('morgan');
var config = require('./config');

var app = express();


app.use(morgan('tiny'));
app.use(express.static(__dirname + '/app/static'));

app.get('*.json',function (req, res) {
    console.log(req.originalUrl);
    res.sendFile('app'+req.originalUrl, {root: __dirname})
});

app.get('/sw.js',function (req, res) {
   res.sendfile('app/sw.js', {root: __dirname});
});

app.get('/my-sw.js',function (req, res) {
    res.sendfile('app/my-sw.js', {root: __dirname});
});

app.get('*',function(req, res){
	res.sendFile('app/index.html', {root: __dirname});
});

const port = config.SERVER.PORT;
app.listen(port);