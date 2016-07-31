'use strict';

angular.
  module('courses').
  component('courses', {
    templateUrl: 'components/courses/courses.template.html',
    controller: function coursesController($http, $scope) {
      var self = this;
      $http.get('http://localhost:3000/courses').then(function(response) {

        $scope.courses = response.data;
      });
    }
  });