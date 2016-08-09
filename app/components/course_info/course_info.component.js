'use strict';

angular.
  module('course_info').
  component('courseInfo', {
    templateUrl: 'components/course_info/course_info.template.html',
    controller: function coursesController($http, $scope, $routeParams,API_BASE_URL) {
      var self = this;
      $http.get(API_BASE_URL+'courses/' + $routeParams.course_code).then(function(response) {

        $scope.stats = response.data;
        $scope.stats.overview = {};
        $scope.stats.overview.runs = $scope.stats.runs.length;
        $scope.stats.overview.enrolled = $scope.stats.enrolment.reduce(function(total,e){
          return total + e.enrolled;
        },0);
        $scope.stats.overview.fully_participated = $scope.stats.enrolment.reduce(function(total,e){
          return total + e.fully_participated;
        },0);
        $scope.stats.overview.purchased_statement = $scope.stats.enrolment.reduce(function(total,e){
          return total + e.purchased_statement;
        },0);
        $scope.stats.overview.comments = $scope.stats.comment.reduce(function(total,e){
          return total + e.comments;
        },0);
      });
    }
  });