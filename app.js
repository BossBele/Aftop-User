var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//middlewares-configuration
app.use(bodyParser.json()); //body parser
app.set('views', __dirname + '/views'); // rendering view
app.set("view engine", "ejs"); // setting view engine
app.use(express.static(path.join(__dirname, 'public'))); //express to use public folder


// routes 
const indexRoute = require('./routes/index');

var i = require('./public/js/index');

//routes_app
app.use('/', indexRoute);

const server = 8000;
app.listen(server, () => {
    console.log(`Server running ....., On Port ${server}`);
});