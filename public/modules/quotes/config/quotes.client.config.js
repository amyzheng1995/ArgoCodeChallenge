'use strict';

// Quotes module config
angular.module('quotes').run(['Menus',
	function(Menus) {
		// Config logic
		// ...
		Menus.addMenuItem('topbar', 'Quotes', 'quotes', 'item', '/quotes', true);
	}
]);
