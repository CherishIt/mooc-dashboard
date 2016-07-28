'use strict';

angular.module('socialNetwork')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/comment_network', {
    templateUrl: 'social_network/social_network.template.html'
  });
  $routeProvider.when('/learner_network', {
    template: '<learner-graph></learner-graph>'
  });
}]);