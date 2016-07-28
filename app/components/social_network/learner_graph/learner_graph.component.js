'use strict';

angular.
  module('comment').
  component('learnerGraph', {
    templateUrl: 'social_network/learner_graph/learner_graph.template.html',
    controller: function commentNetworkController($http, $scope) {
      //var self = this;

      //default chart replacement
      var chart = echarts.init(document.getElementById('chart'));

      var option = {
        tooltip: {},
        series: [{
          name: 'Replies Got',
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
          categories: [{
            name: 'Top ' + $scope.top + ' Learners'
          }, {
            name: 'Other Learners'
          }],
          zlevel: 2
          /*,
          force: {
            repulsion: 100
          }*/
        }]
      };
      chart.setOption(option);
      //chart.showLoading();

      // Init
      var results = [];
      $scope.top = 10;

      $scope.getMetrics = function(){
      };

      //$scope.unlinkedNum = 0;
      //$scope.linkedNum = 0;

      $scope.draw = function(){
        chart.showLoading();
        $http.get('http://localhost:3000/comment/learner_network?top=' + $scope.top).then(function(response) {
          

          results = response.data;
          var nodes = results.nodes.length;
          var links = results.links.length;
          var density = links / (nodes * (nodes-1)/2);
          $scope.metrics =  {
            nodes: nodes,
            links: links,
            density: density
          }

          var nodes = []
          var count = 0;
          results.nodes.forEach(function(n){
            //if (nodes.length< 1000)
            var size = n.count===0 ? 3 : 3 + n.count * 0.2;
            nodes.push({name:n.target, symbolSize: size, category: count<$scope.top ? 0 : 1, value: n.count});
            count ++;
          })
          var links = []
          results.links.forEach(function(n){
            //if (links.length< 1500)
              links.push(n);
          })
          
          chart.setOption({
            legend: {
              selectMode: 'multiple',
              data:['Top '+ $scope.top +' Learners', 'Other Learners']
            },
            tooltip: {
              formatter: '<strong>{b}</strong> <br> {a} : {c}'
            },
            series: [{
              name: 'Replies Got',
              type: 'graph',
              layout: 'force',
              roam: true,
              nodes: nodes,
              links: links,
              categories: [{
                name: 'Top ' + $scope.top + ' Learners'
              }, {
                name: 'Other Learners'
              }],
              focusNodeAdjacency: true,
              draggable: true
            }]
          })
  
          chart.hideLoading();
          
        });
      };

      $scope.draw();


/*$http.get('http://localhost:3000/comment/learner_network/metrics').then(function(response) {

      var d = []
      response.data.density.forEach(function(n){
        var t = new Date(n.date)
        d.push({
          name: t.toString(),
          value: [[t.getFullYear(), t.getMonth() + 1, t.getDate()].join('/'), n.density]
        })
      });
      ///// for density
      var d_chart = echarts.init(document.getElementById('density'));
      var d_options = {
        title: {
            text: 'Network Density of Social Learners'
        },
        toolbox: {
        feature: {
            restore: {
              title: 'restore zoom'
            },
            saveAsImage: {
              title: 'save as image'
            }
          }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            //boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        dataZoom: [
        {
            show: true,
            realtime: true,
            start: 0,
            end: 100
            //xAxisIndex: [0, 1]
        }
    ],
        series: [{
            name: 'density',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: d
        }]
      };
      d_chart.setOption(d_options);

      //for distribution
  var dist = echarts.init(document.getElementById('distribution'));
  var dist_option = {
          title: {
            text: 'Learners Distribution by Connections'
          },
          xAxis: {
            type: 'value',
            name: 'Connections'
          },
          yAxis: {
            type: 'value',
            name: 'Learners'
          },
          grid:{
            right:100
          },
          tooltip: {

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
          dataZoom: [
        {
            show: true,
            realtime: true,
            start: 0,
            end: 100
            //xAxisIndex: [0, 1]
        }
    ],
          legend: {
            //left: 'right',
          },
          series: [{
            name: 'Number of Learners',
            type: 'line',
            //radius: '60%',
            data: response.data.distribution
          }]
        };
        dist.setOption(dist_option);

    });

*/
    }
  });