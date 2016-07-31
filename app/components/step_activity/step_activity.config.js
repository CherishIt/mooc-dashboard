'use strict';

angular.module('stepActivity')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courses/:course_code/run/:run/step_activity', {
    template: '<step-activity></step-activity>'
  });
}]);