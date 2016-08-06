'use strict';

angular.module('word_analysis')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courses/:course_code/run/:run/word_analysis', {
    template: '<word-analysis></word-analysis>'
  });
}]);