var express = require('express');

var app = express.createServer();

app.configure(function (){
});

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(8422);
