'use strict';

angular.
module('comment').
component('replyProportionPie', {
  templateUrl: 'components/comment/reply_proportion/reply_proportion.template.html',
  controller: function commentNetworkController($http, $scope, $routeParams) {
    //var self = this;

    var chart_comment_distribution = echarts.init(document.getElementById('comment_distribution'));

    chart_comment_distribution.showLoading();
    var results = [];
    var data = [];
    var weeks = [];
    // $scope.steps = [];
    // $scope.step = "1.1";
    // $scope.num = 0;
    // $scope.stepNum = 0;
    // $scope.unlinkedNum = 0;
    // $scope.linkedNum = 0;

    $http.get('http://localhost:3000/courses/' + $routeParams.course_code +
      '/run/' + $routeParams.run + '/comment_dist').then(function(response) {

      results = response.data;

      var data = [];
      var d2 = [];
      if (results.length) {
        data.push(mergeReply(results, 0, 0, '0 reply'));
        data.push(mergeReply(results, 1, 1, '1 reply'));
        data.push(mergeReply(results, 2, 2, '2 replies'));
        data.push(mergeReply(results, 3, 3, '3 replies'));
        data.push(mergeReply(results, 4, 4, '4 replies'));
        data.push(mergeReply(results, 5, 5, '5 replies'));
        data.push(mergeReply(results, 6, 10, '6-10 replies'));
        data.push(mergeReply(results, 11, null, '>10 replies'));

        results.forEach(function(n) {
          d2.push([n._id, n.count])
        });
      }

      var option = {
      xAxis: {
        type: 'value',
        name: 'Replies'
      },
      yAxis: {
        type: 'value',
        name: 'Comments'
      },
      grid: {
        top: 50,
        right: 100
      },
      tooltip: [{
        formatter: '{b} <br> Comments Number : {c}',
        position: 'inside',
        trigger : 'axis'
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
      dataZoom: [{}, {
        show: true,
        realtime: true,
        start: 0,
        end: 100
          //xAxisIndex: [0, 1]
      }],
      legend: {
        left: 'right',
        top: 50,
        orient: 'vertical',
        data: ['0 reply', '1 reply', '2 replies', '3 replies', '4 replies', '5 replies', '6-10 replies', '>10 replies']
      },
      series: [{
        name: 'Number of Replies',
        type: 'pie',
        radius: '40%',
        center: ['60%', '40%'],
        label: {
          normal: {
            position: 'outside',
            show: true,
            formatter: '{b}:{c}({d}%)'
          }
        },
        data: data,
      },{
        name: 'Number of Replies',
        type: 'line',
        //radius: '60%',
        data: d2
      }]
    };

      chart_comment_distribution.setOption(option);

      chart_comment_distribution.hideLoading();
      //console.log($scope.steps)
    });

    function mergeReply(data, min, max, name) {
      var entry = {
        name: name,
        value: 0
      };
      data.forEach(function(d) {
        if ((!min || d._id >= min) && (!max || d._id <= max))
          entry.value += d.count;
      })
      return entry;
    }

  }
});