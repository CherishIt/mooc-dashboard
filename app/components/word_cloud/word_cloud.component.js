'use strict';

angular.
module('word_cloud').
component('wordCloud', {
  templateUrl: 'components/word_cloud/word_cloud.template.html',
  controller: function wordAnalysisController($http, $routeParams, $scope,API_BASE_URL) {

    //for resize chart
    var charts = {};
    var all_data = [];
    var current_data = [];
    var max = 200
    $scope.week = 'All';
    $scope.step = 'All';

    $('#max').slider()
      .on('slideStop', function(e){
        max = e.value;
        redraw(current_data);
      });

    $scope.filterWeek = function(){
      if ($scope.week === 'All') {
        redraw(all_data);
        return;
      };
      getData($scope.week,null,function(data){
        redraw(data);
      });
    }

    $scope.filterStep = function(){
      if ($scope.step === 'All') {
        redraw(all_data);
        return;
      };
      getData(null, $scope.step, function(data){
        redraw(data);
      });
    }

    function getData(week, step, callback) {
      chart_wordcloud.showLoading();
      var url = API_BASE_URL + 'courses/' +
      $routeParams.course_code + '/run/' + $routeParams.run + '/comment_analysis';
      if (week)
        url += '?week=' + week;
      if (step)
        url += '?step=' + step;
      $http.get(url).then(function(response){
        callback(response.data.freq);
      })
    }

    var chart_wordcloud = echarts.init(document.getElementById('wordcloud'));
    charts.wordcloud = chart_wordcloud;

    chart_wordcloud.showLoading();

    $http.get(API_BASE_URL+'courses/' +
      $routeParams.course_code + '/run/' + $routeParams.run + '/comment_analysis').then(function(response) {

      all_data = response.data.freq.slice(0,max);
      current_data = all_data;
      $scope.weeks = response.data.weeks;
      $scope.weeks.unshift('All');
      $scope.steps = response.data.steps;
      $scope.steps.unshift('All')

      var option = {
        tooltip: {
        //  trigger: 'axis'
        },
        // legend: {
        //   data: ['Enrolled', 'Unenrolled']
        // },
        toolbox: {
          //show : true,
          feature: {
            dataView: {
              title: "Data View",
              readOnly: true,
              lang: ['DataView', 'Close', 'Refresh']
            },
            saveAsImage: {
              title: "Save as Image"
            }
          }
        },
        series: [{
          name: 'Word Freqency',
          type: 'wordCloud',
          shape: 'circle',
          sizeRange: [10,80],
          rotationRange: [0, 0],
          rotationStep: 90,
          //gridSize: 20,
          textStyle: {
            normal: {
                fontFamily: 'sans-serif',
                //fontWeight: 'bold',
                // Color can be a callback function or a color string
                color: function () {
                    // Random color
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                //shadowBlur: 10,
                //shadowColor: '#333'
            }
          },
          data: all_data.map(function(e) {
            return {name:e[0], value:e[1]}
          })
        }]
      };

      chart_wordcloud.setOption(option);
      chart_wordcloud.hideLoading();
    });
    
    $scope.resize = function(name) {
      console.log(charts[name])
      charts[name].resize();
    };

    function redraw(data) {
      //console.log(data)
      current_data = data;
      data = data.slice(0,max);
      chart_wordcloud.setOption({
        series: [{
          data: data.map(function(e) {
            return {name:e[0], value:e[1]}
          })
        }]
      })
      chart_wordcloud.hideLoading();
    }
    //}

  }
});