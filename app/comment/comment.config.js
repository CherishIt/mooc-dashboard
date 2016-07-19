'use strict';

angular.module('stepActivity')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/comments', {
    templateUrl: 'comment/comment.template.html'
  });
}]);