'use strict';

angular.
  module('comment').
  component('commentGraph', {
    templateUrl: 'social_network/comment_graph/comment_graph.template.html',
    controller: function commentNetworkController($http, $scope) {
      //var self = this;

      var myChart = echarts.init(document.getElementById('chart_div'));

      //original chart before load data
      var option = {
        title: [{
          text: 'Comments\' Network',
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
      myChart.setOption(option);

      myChart.showLoading();
      var results = [];
      var data = [];
      var weeks = [];
      $scope.steps = [];
      $scope.step = "1.1";
      $scope.num = 0;
      $scope.stepNum = 0;
      $scope.unlinkedNum = 0;
      $scope.linkedNum = 0;


      //http get data source
      $http.get('http://localhost:3000/comment/comment_network').then(function(response) {

        results = response.data;
        results.forEach(function(n){
          weeks.push(n.week);
          data = data.concat(n.values);
        });

        data.forEach(function(n){
          $scope.num ++;
          if ($scope.steps.indexOf(n.step) <0) {
            $scope.steps.push(n.step);
          }
        });
        //console.log($scope.steps)
        $scope.selectData(data, $scope.step);

        
      });

      // Filter data by step
      $scope.selectData = function() {
        myChart.showLoading();
        var linked = [];
        var nodes = [];
        var links = [];
        var nodeNum = 0;

        //filter specific step only and reply only
        data.forEach(function(n){
          if (n.step == $scope.step)
            $scope.stepNum ++;
          if (n.parent_id && n.step == $scope.step) {
            linked.push(n.parent_id);
            linked.push(n.id);
          }
        });
        $scope.linkedNum = (new Set(linked)).size;
        $scope.unlinkedNum = $scope.stepNum - $scope.linkedNum;
        
        // build nodes and links data for viz
        data.forEach(function(n){
          if (linked.indexOf(n.id) >= 0) {
            // catogory: reply / non-reply
            var category = n.parent_id ? 1 : 0;
            // define node size
            var size = n.likes === 0 ? 3 : 0.8 * n.likes + 5;

            nodes.push({day:n.day,week:n.week, name: n.id.toString(), category: category, value: n.likes, symbolSize: size});

            if (n.parent_id){
              links.push({source: n.id.toString(), target: n.parent_id.toString()});
            }
          }
        });

        // build options for Echarts Timeline
        var options = [];
        for (var i = 1; i <= 7; i++) {
          options.push({
            title: {
              text: 'Week 1 Day ' + i
            },
            series: [{
              nodes: filterWeekDay(nodes, weeks[0], i),
              links: links
            }]
          }) 
        };
        for (var i = 1; i < weeks.length; i++) {
          options.push({
            title: {
              text: 'Week ' + (i+2)
            },
            series: [{
              nodes: filterWeek(nodes, weeks[i]),
              links: links
            }]
          }) 
        }

        // setoption to update chart
        myChart.setOption({
          baseOption: {
            timeline: {
              data: timelineData()
            },
            calculable: false,
            tooltip: {
              formatter: '<strong>{b}</strong> <br> {a} : {c}'
            },
            toolbox: {
              show: true,
              feature: {
                dataView: {
                  title: "Data View",
                  readOnly: true
                },
                saveAsImage: {
                  title: "Save as Image"
                }
              }
            },
            series: [{
              name: 'likes',
              type: 'graph',
              layout: 'force',
              draggable: 'true'
            }]
          },
          options: options/*
          series: [{
            name: 'comment',
            type: 'graph',
            layout: 'force',
            roam: true,
            nodes: nodes,
            links: links,
            categories: ['comment', 'reply'],
            focusNodeAdjacency: false,
          }]*/
        });
        myChart.hideLoading();
      }

      //prepare Labels shown on Echarts Timeline
      function timelineData() {
        var array = [];
        var date = new Date(results[0].values[0].timestamp);
        for (var i = 0; i < 7; i++) {
          array.push({value:date, tooltip:{showContent: false}});
          date = new Date(date.getTime() + 86400000);
        }
        for (var i = 2; i < weeks.length; i++) {
          var date = new Date(results[i].values[0].timestamp);

          array.push({value:date, tooltip:{showContent: false}});
          if (i == weeks.length-1) {
            //** use last item temporarily, might not be the latest time
            var last = results[i].values.length-1
            console.log(last);
            console.log(results[i].values[last])
            var date = new Date(results[i].values[last].timestamp);

            array.push({value:date, tooltip:{showContent: false}});
          }
        }
        //console.log(array)
        return array;
      }

      // filter data for echarts timeline first several days
      function filterWeekDay(nodes, week, day) {
        var array = [];
        nodes.forEach(function(n){
          if (n.week == week && n.day <= day) {
            array.push(n);
          }
        });
        //console.log(array)
        return array;
      }

      //filter data by week for echarts timeline
      function filterWeek(nodes, week) {
        var array = [];
        nodes.forEach(function(n){
          if (n.week <= week)
            array.push(n);
        })
        return array;
      }

      
      
    }
  });