'use strict';

angular.module('quiz_result')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courses/:course_code/run/:run/quiz_result', {
    template: '<quiz-result></quiz-result>'
  });
}]);