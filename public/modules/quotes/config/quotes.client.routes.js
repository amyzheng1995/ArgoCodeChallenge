'use strict';

//Setting up route
angular.module('quotes').config(['$stateProvider',
	function($stateProvider) {
		// Quotes state routing
		$stateProvider.
		state('quotes', {
			url: '/quotes',
			template: '<quote></quote>'
		});
	}
]);
