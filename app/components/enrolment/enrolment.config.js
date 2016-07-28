'use strict';

angular.module('enrolment')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courses/:course_code/run/:run/enrolment', {
    template: '<time-line></time-line>'
  });
}]);