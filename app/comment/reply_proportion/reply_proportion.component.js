'use strict';

angular.
  module('comment').
  component('replyProportionPie', {
    templateUrl: 'comment/reply_proportion/reply_proportion.template.html',
    controller: function commentNetworkController($http, $scope) {
      //var self = this;

      var chart = echarts.init(document.getElementById('chart'));

      var option = {
        title: [{
          //text: 'Number of Comments by Number of Replies',
          left: 'center'
        }],
        tooltip: {
          formatter: '{b} <br> Comments Number : {c} ({d}%)',
          position: 'inside'
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
          top: 'bottom',
          //orient: 'vertical',
          data: ['0 reply','1 reply','2 replies','3 replies','4 replies','5 replies','6-10 replies','>10 replies']
        },
        series: [{
          name: 'Number of Replies',
          type: 'pie',
          //radius: '60%',
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

        chart.setOption({
          series: [{
            name: 'Number of Replies',
            type: 'pie',
            data: data
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

    }
  });