'use strict';

angular.module('stepActivity')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/comments', {
    templateUrl: 'components/comment/comment.template.html'
  });
}]);