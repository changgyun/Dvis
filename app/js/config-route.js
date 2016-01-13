(function () {
    'use strict';
    angular.module('zekiApp', [
        'zekiApp.MainController',
        'zekiApp.ButtonCtrl',
        'zekiApp.IconCtrl',
        'zekiApp.filters',
        'hljs',
        'ngRoute'
    ]).config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'partials/main.html',
                    controller: 'mainCtrl'
                })
                .when('/partials/button', {
                    templateUrl: 'partials/button.html',
                    controller: 'buttonCtrl'
                })
                .when('/partials/icons', {
                    templateUrl: 'partials/icons.html',
                    controller: 'iconCtrl'
                })
                .when('/partials/guide', {
                    templateUrl: 'docs/index.html',
                    controller: 'buttonCtrl'
                })
                .otherwise({
                    redirectTo : '/'
                });
            //$locationProvider.html5Mode(true);
        }])
})();