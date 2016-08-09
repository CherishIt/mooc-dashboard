'use strict';

angular.
  module('courses').
  component('courses', {
    templateUrl: 'components/courses/courses.template.html',
    controller: function coursesController($http, $scope,API_BASE_URL) {
      var self = this;
      $http.get(API_BASE_URL+'courses').then(function(response) {

        $scope.courses = response.data;
      });
    }
  });