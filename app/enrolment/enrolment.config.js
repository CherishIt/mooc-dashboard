'use strict';

angular.module('enrolment')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/enrolment', {
    template: '<time-line></time-line>'
  });
}]);