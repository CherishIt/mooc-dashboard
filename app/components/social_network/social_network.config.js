'use strict';

angular.module('socialNetwork')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courses/:course_code/run/:run/comment_network', {
    template: '<comment-graph></comment-graph>'
  });
  $routeProvider.when('/courses/:course_code/run/:run/learner_network', {
    template: '<learner-graph></learner-graph>'
  });
}]);