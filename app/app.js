'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'enrolment',
  'stepActivity',
  'comment',
  'socialNetwork'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  google.charts.load('current', {'packages':['corechart', 'controls']});
  $routeProvider.otherwise({redirectTo: '/enrolment'});
}]);
