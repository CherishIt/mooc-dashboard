'use strict';

angular.module('sentiment_analysis')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courses/:course_code/run/:run/sentiment_analysis', {
    template: '<sentiment-analysis></sentiment-analysis>'
  });
}]);