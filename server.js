'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	emailModel = require('./app/models/email.server.model'),
	chalk = require('chalk'),
	bodyParser = require('body-parser'),
	schedule = require('node-schedule'),
	Email = mongoose.model('Email'),
	email = require('./app/controllers/emails.server.controller');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

var j = schedule.scheduleJob('0 * * * *', function(){
	console.log('Time to send Emails to customers!');
	email.sendEmail();
});

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);
