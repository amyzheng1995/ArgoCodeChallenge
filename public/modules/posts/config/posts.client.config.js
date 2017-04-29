'use strict';

// Posts module config
angular.module('posts').run(['Menus',
	function(Menus) {
		// Config logic
		// ...
		Menus.addMenuItem('topbar', 'Posts', 'posts', 'dropdown', '/posts(/create)?');
		Menus.addSubMenuItem('topbar', 'posts', 'List Posts', 'posts');
		Menus.addSubMenuItem('topbar', 'posts', 'New Post', 'posts/create');
	}
]);
