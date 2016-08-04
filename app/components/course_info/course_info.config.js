'use strict';

angular.module('course_info')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courses/:course_code', {
    template: '<course_info></course_info>'
  });
}]);