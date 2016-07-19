'use strict';

angular.
  module('comment').
  component('learnerGraph', {
    templateUrl: 'social_network/learner_graph/learner_graph.template.html',
    controller: function commentNetworkController($http, $scope) {
      //var self = this;




      var chart = echarts.init(document.getElementById('chart'));

      var option = {
        title: [{
          text: 'Learners\' Network',
          left: 'center'
        }],
        tooltip: {},
        legend: {
          data:['comment', 'reply']
        },
        series: [{
          name: 'Likes',
          type: 'graph',
          layout: 'force',
          roam: true,
          nodes: [
            {name:"hh",category:0,value:1, symbolSize:10},
            {name:"a",category:0,value:20,symbolSize:20},
            {name:"bh",category:1,value:2},
            {name:"1",category:1,value:2},
            {name:"h",category:0,value:2},
            {name:"f",category:1,value:3}
          ],
          links: [{source:'h',target:'f'}],
          categories: ['comment','reply'],
          zlevel: 2
          /*,
          force: {
            repulsion: 100
          }*/
        }]
      };
      chart.setOption(option);

      chart.showLoading();
      var results = [];
      var data = [];
      var weeks = [];
      $scope.steps = [];
      $scope.step = "1.1";
      $scope.num = 0;
      $scope.stepNum = 0;
      $scope.unlinkedNum = 0;
      $scope.linkedNum = 0;

      $http.get('http://localhost:3000/comment/learner_network').then(function(response) {

        results = response.data;
        var nodes = []
        results.nodes.forEach(function(n){
          //if (nodes.length< 1000)
          var size = n.count===0 ? 3 : 3 + n.count * 0.2;
          nodes.push({name:n.target, symbolSize: size});
        })
        var links = []
        results.links.forEach(function(n){
          //if (links.length< 1500)
            links.push(n);
        })

        /*var ele = [];
        results.nodes.forEach(function(n){
          ele.push({data:{id:n}});
        })
        results.links.forEach(function(l){
          ele.push({data:{source:l.source, target:l.target}})
        })

        var cy = cytoscape({
          container: document.getElementById('cy'),
          elements:ele,
          style: [{
            selector: 'node',
            style: {
              shape: 'hexagon',
              'background-color': 'red'
            }
          }],
          layout: {
            name: 'cose'
          }
        })*/
        
        chart.setOption({
          series: [{
            name: 'Learner',
            type: 'graph',
            layout: 'force',
            roam: true,
            nodes: nodes,
            links: links,
            tooltip: {
              formatter: '<strong>{b}</strong> <br> {a} : {c}'
            },
            focusNodeAdjacency: true,
            draggable: true
          }]
        })

        chart.hideLoading();
        //console.log($scope.steps)
        
      });

    }
  });