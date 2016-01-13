'use strict';

angular.module('zekiApp.directives', []).
    directive('appVersion', function (version) {
        return {
            restrict: 'E',
            templateUrl: 'fmDeliverTo.html',
            scope: {},
            controller: function FmDeliverToController($scope, customer) {
                $scope.customer = customer;
            }
        };
    })