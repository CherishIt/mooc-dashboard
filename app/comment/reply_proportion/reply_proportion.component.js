'use strict';

angular.
  module('comment').
  component('replyProportionPie', {
    templateUrl: 'comment/reply_proportion/reply_proportion.template.html',
    controller: function commentNetworkController($http, $scope) {
      //var self = this;

      var chart = echarts.init(document.getElementById('chart'));
      var dist = echarts.init(document.getElementById('dist'));

      var option = {
        xAxis: {
          type: 'value',
          name: 'Replies'
        },
        yAxis: {
          type: 'value',
          name: 'Comments'
        },
        grid:{
          top:50,
          right: 100
        },
        title: [{
          //text: 'Number of Comments by Number of Replies',
          left: 'center'
        }],
        tooltip: [{
          formatter: '{b} <br> Comments Number : {c}',
          position: 'inside',
          //show: false
        }],
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
        dataZoom: [{},
        {
            show: true,
            realtime: true,
            start: 0,
            end: 100
            //xAxisIndex: [0, 1]
        }
    ],
        legend: {
          left: 'right',
          top: 50,
          orient: 'vertical',
          data: ['0 reply','1 reply','2 replies','3 replies','4 replies','5 replies','6-10 replies','>10 replies']
        },
        series: [{
          name: 'Number of Replies',
          type: 'pie',
          radius: '40%',
          center: ['60%', '40%'],
          label: {
            normal:{
              position: 'outside',
              show: true,
              formatter: '{b}:{c}({d}%)'
            }
          },
          data: [
            {name:'a', value:1},
            {name:'b', value:2}
          ],
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

      $http.get('http://localhost:3000/comment/withreply').then(function(response) {

        results = response.data;

        var legendRange = [1,2,3,4,5,10];
        var data = [];
        var zero = results.pop();
        data.push({name:'0 reply', value:zero.count});
        data.push(mergeReply(results,1,1,'1 reply'));
        data.push(mergeReply(results,2,2,'2 replies'));
        data.push(mergeReply(results,3,3,'3 replies'));
        data.push(mergeReply(results,4,4,'4 replies'));
        data.push(mergeReply(results,5,5,'5 replies'));
        data.push(mergeReply(results,6,10,'6-10 replies'));
        data.push(mergeReply(results,11,null, '>10 replies'));

        var d2 = [];
        d2.push([0,zero.count]);
        results.forEach(function(n){
          d2.push([n.count,n.number])
        });

        chart.setOption({
          series: [{
            name: 'Number of Replies',
            type: 'pie',
            data: data
          },{
            name: 'Number of Replies',
            type: 'line',
            //radius: '60%',
            data: d2
          }]
        })

        chart.hideLoading();
        //console.log($scope.steps)
      });

      function mergeReply(data, min, max, name) {
        var entry = {name:name, value:0};
        data.forEach(function(d){
          if ((!min || d.count >= min) && (!max || d.count <= max))
            entry.value += d.number;
        })
        return entry;
      }

      function drawDist(data){
        var d_option = {
          xAxis: {
            type: 'value',
            name: 'Replies'
          },
          yAxis: {
            type: 'value',
            name: 'Comments'
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
          legend: {
            //left: 'right',
          },
          series: [{
            name: 'Number of Replies',
            type: 'line',
            //radius: '60%',
            data: data
          }]
        };
        dist.setOption(d_option);
      }

    }
  });