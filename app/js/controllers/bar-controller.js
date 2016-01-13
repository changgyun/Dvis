'use strict';

angular.module('zekiApp.BarChartCtrl', []).
    controller("barChartCtrl",['$scope','$http',function($scope,$http) {

        $scope.myData = [10,20,30,40,60, 80, 20, 50];

}])


