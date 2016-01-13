(function () {
    'use strict';
    angular.module('zekiApp', [
        'zekiApp.MainCtrl',
        'zekiApp.BubbleCtrl',
        'zekiApp.WordCloudCtrl',
        'zekiApp.BarChartCtrl',
        'zekiApp.directives',
        'zekiApp.filters',
        'ngRoute'
    ])
        .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'partials/main.html',
                    controller: 'mainCtrl'
                })
                .when('/partials/bubble-chart', {
                    templateUrl: 'partials/bubble-chart.html',
                    controller: 'bubbleCtrl'
                })
                .when('/partials/word-cloud', {
                    templateUrl: 'partials/word-cloud.html',
                    controller: 'wordCloudCtrl'
                })
                .when('/partials/bar-chart', {
                    templateUrl: 'partials/bar-chart.html',
                    controller: 'barChartCtrl'
                })
                .otherwise({
                    redirectTo : '/'
                });
            //$locationProvider.html5Mode(true);
        }])
})();
