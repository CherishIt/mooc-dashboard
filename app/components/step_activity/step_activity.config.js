'use strict';

angular.module('stepActivity')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/step_activity', {
    template: '<step-activity></step-activity>'
  });
}]);