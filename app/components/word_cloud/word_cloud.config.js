'use strict';

angular.module('word_cloud')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courses/:course_code/run/:run/word_cloud', {
    template: '<word-cloud></word-cloud>'
  });
}]);