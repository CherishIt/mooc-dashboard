'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'enrolment',
  'stepActivity',
  'comment',
  'word_analysis',
  'sentiment_analysis',
  'socialNetwork',
  'courses',
  'course_info',
  'demographics',
  'quiz_result',
  'ui.bootstrap'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  //$locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  //google.charts.load('current', {'packages':['corechart', 'controls']});
  //$routeProvider.otherwise({redirectTo: '/enrolment'});
}])
.controller('RouteController', function($scope, $route, $routeParams){
  $scope.$on('$routeChangeSuccess', function() {
    // $routeParams should be populated here
    if ($routeParams.course_code) {
      //  return;
      console.log($routeParams)
      $scope.course_code = $routeParams.course_code;
      $scope.run = $routeParams.run;
      console.log($scope.course_code);
      console.log($scope.run);
    }
    if (!$scope.run) {
      if ($scope.course_code)
        $scope.run = 1;
      //console.log($scope.course_code);
      //console.log($scope.run);
    }
  });
  
});
