'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Post Schema
 */
var PostSchema = new Schema({
    // Post model fields
    // ...
    // the property name
    title: {
        type: String,
        default: '',
        trim: true,
        unique: true,
        required: 'name cannot be blank'
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    }
});

mongoose.model('Post', PostSchema);
