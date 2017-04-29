'use strict';

angular.module('quotes').factory('Quotes', Quotes);
Quotes.$inject = ['$q', '$http']

function Quotes($q, $http) {
    // Quotes service logic
    var API_KEY = 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p';

    var calculate = function(options) {
        options.purchase_price = Math.round(options.purchase_price);
        var URL = '/quotes';
        return $http.post(URL, options);
    };
    return {
        calculate: calculate
    };
};
