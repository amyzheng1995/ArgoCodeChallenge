'use strict';

var request = require('request'),
    email = require('./emails.server.controller'),
    logger = require('./logger.server.controller').logger();

/**
 * Get a Quote
 */
exports.getQuote = function(req, res) {
    logger.info('Requesting for a quote...');
    var URL = 'https://j950rrlta9.execute-api.us-east-2.amazonaws.com/v1/ArgoChallenge';
    var API_KEY = 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p';
    var headers = {
        'content-type': 'application/json',
        'x-api-key': API_KEY
    }
    var options = {
        json: req.body,
        headers: headers
    }
    request.post(URL, options,
        function(error, response, body) {
            // Assume the API only returns 401, 200 and others...
            // If the error is 401, default to 400
            if (!error) {
                if (response.statusCode === 401 || (response.statusCode === 200 && !response.body.ok)) {
                  response.statusCode === 401 ? res.status(400).json(response.body) : res.status(response.statusCode).json(response.body);
                  var reasons = [];
                  for (var i = 0; i < response.body.errors.length; i++) {
                    for (var j = 0; j < response.body.errors[i].reasons.length; j++) {
                      response.statusCode === 401 ? reasons.push(response.body.errors[i].reasons[j].reason) :
                        reasons.push(response.body.errors[i].reasons[j]);
                    }
                  }
                  logger.info(`quote status = failure, reason = ${reasons.join('& ')}`);
                } else {
                  res.status(response.statusCode).json(response.body);
                  logger.info(`quote status = success, price = ${response.body.data.annual_premium}`);
                  email.addToQueue(response.body);
                }
            } else {
                res.status(error.statusCode);
                logger.info(`quote status = failure with status code ${error.statusCode}`);
            }
        }
    );
};
