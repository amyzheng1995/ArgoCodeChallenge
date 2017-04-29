'use strict';

angular.module('quotes').controller('QuotesController', QuotesController);
QuotesController.$inject = ['$location', 'Quotes'];

function QuotesController($location, Quotes) {
    // Controller Logic
    var vm = this;

    var STATES = {
        INPUTS: 'INPUTS',
        RESULT: 'RESULT'
    };
    vm.currentState = STATES.INPUTS;
    vm.templatePaths = {
        INPUTS: 'modules/quotes/views/inputs.client.view.html',
        RESULT: 'modules/quotes/views/result.client.view.html'
    };
    vm.showLoading = false;

    vm.calculate = function() {
        vm.showLoading = true;
        var options = {
            owner_name: vm.name,
            model: vm.model,
            seat_capacity: vm.capacity,
            manufactured_date: vm.date,
            purchase_price: vm.price,
            broker_email: vm.email
        };
        vm.success = false;
        Quotes.calculate(options)
            .then(function(res) {
                if (res.data.ok) {
                    vm.success = true;
                    vm.data = res.data.data;
                } else {
                    vm.data = res.data;
                }
                vm.currentState = STATES.RESULT;
            }).catch(function(error) {
                vm.data = error.data;
                vm.currentState = STATES.RESULT;
            });
    };
};
