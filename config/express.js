var  config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');

module.exports = function() {
	var app = express();


	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));		// logger
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());		//compress it on production
	}
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(session({
			saveUninitialized: true,
			resave: true,
			secret: config.sessionSecret
		})
	);

	app.set('views', './app/views'); // defining view folder
	app.set('view engine', 'ejs'); // setting template engine

	app.use(express.static('./public')); 

	require('../app/routes/index.server.routes.js')(app);
	return app;
};