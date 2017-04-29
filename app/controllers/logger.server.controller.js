'use strict';

var winston = require('winston'),
    _ = require('lodash');


exports.logger = function() {
    return new winston.Logger({
      transports: [
        new winston.transports.File({
          colorize: false,
          filename: "./server.log",
          handleExceptions: true,
          json: false,
          level: "info",
          maxFiles: 5,
          maxsize: 5242880, // 5MB
          timestamp: true,
        }),
        new winston.transports.Console({
          colorize: true,
          handleExceptions: true,
          json: false,
          level: "debug",
          timestamp: true,
        }),
      ],
      exitOnError: false,
    });
};
