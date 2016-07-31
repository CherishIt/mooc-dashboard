'use strict';

angular.module('stepActivity')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courses/:course_code/run/:run/comment', {
    templateUrl: 'components/comment/comment.template.html'
  });
}]);