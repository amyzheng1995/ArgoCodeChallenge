'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose').set('debug', true),
    errorHandler = require('./errors.server.controller'),
    Post = mongoose.model('Post'),
    _ = require('lodash');

/**
 * Create a Post
 */
exports.create = function(req, res) {
    console.log(req.body);
    var post = new Post(req.body);

    post.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).json(post);
        }
    });
};

/**
 * Show the current Post
 */
exports.read = function(req, res) {
    Post.findById(req.params.postId).exec(function(err, Post) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!Post) {
                return res.status(404).send({
                    message: 'Post not found'
                });
            }
            res.json(Post);
        }
    });
};
/**
 * Update a Post
 */
exports.update = function(req, res) {
    Post.update({
        _id: req.params.postId
    }, req.body, {
        upsert: true
    }, function(err, Post) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(Post);
        }
    });
};

/**
 * Delete an Post
 */
exports.delete = function(req, res) {
    // var post = req.post;
    Post.remove({
        '_id': req.param('postId')
    }, function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            // res.json(post);
            res.status(201);
        }
    });
};

/**
 * List of Posts
 */
exports.list = function(req, res) {
    Post.find().exec(function(err, posts) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(posts);
        }
    });
};
