'use strict';

angular.module('posts').factory('Posts', Posts);
Posts.$inject = ['$resource'];

function Posts($resource) {
    return $resource('posts/:postId', {
        postId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        remove: {
            method: 'DELETE',
        }

    });
};
