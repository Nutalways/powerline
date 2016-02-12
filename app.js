// include packages
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./config');

var db = require('./module/models')(config);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));
//config cookieParser
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// include routes
var routes = require('./module/routes')(app, db, config);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.writeHead(404, {
    "Content-Type": "text/plain"
  });
  res.write("404 Not Found\n");
  res.end();
});
// create and run web application on port 8080
var http = require('http').Server(app);
http.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});
