/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('express-error-handler'),
    morgan = require('morgan'),
    http = require('http'),
    routes = require('./app/js/main'),
    path = require('path');

var app = module.exports = express();
app.engine('html', require('ejs').renderFile);

/**
 * Configuration
 */
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/dist');
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, '/app/dist/')));
app.use(errorHandler());


/**
 * Routes
 */
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});