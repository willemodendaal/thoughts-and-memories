var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ThoughtRouter = require('./src/routes/thoughtRouter');
    //MemoryRouter = require('./src/routes/memoryRouter');

var db = mongoose.connect('mongodb://localhost/thoughts_and_memories');
var app = express();
var port = process.env.PORT || 3311;

//Convert json in body to request.body
app.use(bodyParser.json());

//Middleware that parses urlEncoded bodies. Returned as key/value pairs on the request.body
//  extended:false ensures that only strings or arrays can be passed.
app.use(bodyParser.urlencoded({extended:false}));


//Set routes.
app.use('/api/thoughts', ThoughtRouter());
//app.use('/api/memories', MemoryRouter());

app.listen(port, function () {
    console.log('API listening on port ' + port);
});