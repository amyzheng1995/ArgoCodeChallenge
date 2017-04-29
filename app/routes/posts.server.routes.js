'use strict';

module.exports = function(app) {
    // Routing logic
    var posts = require('../../app/controllers/posts.server.controller'),
        users = require('../../app/controllers/users.server.controller');

    /**
      Users is required to be logged in before performing any actions on posts
    */
    app.route('/posts')
        .get(users.requiresLogin, posts.list)
        .post(users.requiresLogin, posts.create);


    // the postId param is added to the params object for the request
    app.route('/posts/:postId')
        .get(users.requiresLogin, posts.read)
        .put(users.requiresLogin, posts.update)
        .delete(users.requiresLogin, posts.delete);
};
