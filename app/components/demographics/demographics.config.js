'use strict';

angular.module('demographics')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courses/:course_code/run/:run/demographics', {
    template: '<demographics></demographics>'
  });
}]);