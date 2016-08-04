'use strict';

angular.module('courses')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courses', {
    template: '<courses></courses>'
  });
  $routeProvider.when('/', {
    template: '<courses></courses>'
  });
}]);