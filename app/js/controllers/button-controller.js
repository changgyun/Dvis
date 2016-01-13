'use strict';

angular.module('zekiApp.ButtonCtrl', ['hljs']).
    controller('buttonCtrl',['$scope','$http',function($scope,$http) {

        $scope.toggle = function() {
            alert('2323')
        };

}])



