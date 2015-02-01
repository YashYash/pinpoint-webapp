var dashboardApp = angular.module('dashboardApp', ['ngRoute', 'ngAnimate', 'ngStorage']);
'use strict';
dashboardApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/dashboard/views/scrapers.html',
    controller: 'scrapersController'
  });
  $routeProvider.when('/ads', {
    templateUrl: '/dashboard/views/ads.html',
    controller: 'adsController'
  });
  $routeProvider.when('/register', {
    templateUrl: '/dashboard/views/register.html',
    controller: 'registerController'
  });
}]);
