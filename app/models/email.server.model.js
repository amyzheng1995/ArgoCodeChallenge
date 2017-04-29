'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Email Schema
 */
var EmailSchema = new Schema({
	// Email model fields

	// In order to keep track of email system, it is designed so that the documents
	// have unique emailAddress. All the contents in array form will be grouped with the emailAddress
	emailAddress: {
		type: String,
		default: '',
		trim: true,
		unique: true,
		required: 'email cannot be blank'
	},
	emails: {
		type: Array,
		default: [],
	}
});

mongoose.model('Email', EmailSchema);
