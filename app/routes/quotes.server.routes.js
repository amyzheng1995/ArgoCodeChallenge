'use strict';

module.exports = function(app) {
	// Routing logic
  var quotes = require('../../app/controllers/quotes.server.controller');
  app.route('/quotes')
    .post(quotes.getQuote);
};
