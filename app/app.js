'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'enrolment',
  'stepActivity',
  'comment',
  'socialNetwork',
  'courses',
  'ui.bootstrap'
])
.controller('RouteController', function($scope, $routeParams){

  $scope.course_code = $routeParams.course_code;
  $scope.run = 1;
})
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  google.charts.load('current', {'packages':['corechart', 'controls']});
  //$routeProvider.otherwise({redirectTo: '/enrolment'});
}]);
