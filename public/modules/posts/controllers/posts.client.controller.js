'use strict';

angular.module('posts').controller('PostsController', PostsController);
PostsController.$inject = ['$location', 'Posts', '$stateParams'];

function PostsController($location, Posts, $stateParams) {
    var vm = this;

    vm.currentPage = 1;
    vm.pageSize = 10;
    vm.offset = 0;

    vm.pageChanged = function() {
        vm.offset = (vm.currentPage - 1) * vm.pageSize;
    };

    // Create new Post
    vm.create = function() {
        // Create new Post object
        var post = new Posts({
            title: vm.title,
            content: vm.content,
            updated: new Date()
        });

        // Redirect after save
        post.$save(function(response) {
            $location.path('/posts');
            // Clear form fields
            vm.title = '';
        }, function(errorResponse) {
            vm.error = errorResponse.data.message;
        });
    };

    // Find a list of Posts
    vm.find = function() {
        vm.posts = Posts.query().$promise.then(function(result) {
            vm.posts = result;
        });
    };

    // Update a exisitng
    vm.edit = function() {
        vm.post.updated = new Date();
        vm.post.$update(function() {
            $location.path('/posts');
        }, function(errorResponse) {
            vm.error = errorResponse.data.message;
        });
    };

    vm.delete = function(post) {
        vm.post.$remove({
            postId: vm.post._id
        });
        $location.path('/posts');
    };

    // Find existing Post
    vm.findOne = function() {
        vm.error = '';
        Posts.get({
            postId: $stateParams.postId
        }, function(data) {
            vm.post = data;
        }, function(error) {
            vm.error = error.data.message;
        });
    };

    // Search for a Post
    vm.postSearch = function(post) {
        $location.path('posts/' + post._id);
    };
};
