'use strict';

angular.module('quotes').directive('quote', [
	function() {
		return {
			bindToController: true,
			scope: {
				returnState: "="
			},
			restrict: 'EA',
			controller: 'QuotesController as quote',
			templateUrl: 'modules/quotes/views/index.client.view.html'
		};
	}
]);
