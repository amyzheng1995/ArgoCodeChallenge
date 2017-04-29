'use strict';

//Setting up route
angular.module('posts').config(['$stateProvider',
	function($stateProvider) {
		// Posts state routing
		$stateProvider.
		state('create-post', {
			url: '/posts/create',
			templateUrl: 'modules/posts/views/create-post.client.view.html'
		}).
		state('posts', {
			url: '/posts',
			templateUrl: 'modules/posts/views/posts.client.view.html'
		}).
		state('view-post', {
			url: '/posts/:postId',
			templateUrl: 'modules/posts/views/view-post.client.view.html',
			reloadOnSearch: false
		}).
		state('edit-post', {
			url: '/posts/:postId/edit',
			templateUrl: 'modules/posts/views/edit-post.client.view.html'
		});
	}
]);
