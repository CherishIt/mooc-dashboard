'use strict';

angular.
module('sentiment_analysis').
component('sentimentAnalysis', {
  templateUrl: 'components/sentiment_analysis/sentiment_analysis.template.html',
  controller: function sentimentAnalysisController($http, $routeParams, $scope) {

    $scope.by = 'step';
    $scope.keyword = '';
    $scope.posFilter = 'All';
    var posIgnore = 0;
    $scope.negFilter = 'All';
    var negIgnore = 0;
    $scope.cloudOptions = [];
    var data = {};
    var charts = {};

    var chart_sentiment = echarts.init(document.getElementById('sentiment'));
    charts.sentiment = chart_sentiment;
    var chart_score = echarts.init(document.getElementById('score'));
    charts.score = chart_score;
    var chart_pos_wordcloud = echarts.init(document.getElementById('pos_wordcloud'));
    charts.pos_wordcloud = chart_pos_wordcloud;
    var chart_neg_wordcloud = echarts.init(document.getElementById('neg_wordcloud'));
    charts.neg_wordcloud = chart_neg_wordcloud;

    $('#pos_ignore').slider('setValue',0)
      .on('slideStop', function(e){
        posIgnore = e.value;
        $scope.drawPos();
      });

    $('#neg_ignore').slider('setValue',0)
      .on('slideStop', function(e){
        negIgnore = e.value;
        $scope.drawNeg();
      });

    getData($scope.by, $scope.keyword, draw);

    $scope.redraw = function() {
      getData($scope.by, $scope.keyword, draw);
    }

    function getData(by, keyword, callback) {
      chart_sentiment.showLoading();
      chart_score.showLoading();
      chart_pos_wordcloud.showLoading();
      chart_neg_wordcloud.showLoading();
      $scope.negFilter = 'All';
      $scope.posFilter = 'All';
      var url = 'http://localhost:3000/courses/' +
      $routeParams.course_code + '/run/' + $routeParams.run + '/sentiment_analysis?by=' + by;
      if (keyword)
        url += '&keyword=' + keyword;
      $http.get(url).then(function(response){
        data = response.data;
        $scope.cloudOptions = Object.keys(data.metrics);
        $scope.cloudOptions.unshift('All');
        callback(response.data);
      })
    }

    $scope.drawPos =  function(){
      if ($scope.posFilter === 'All')
        var d = data.pos_list;
      else
        var d = data.metrics[$scope.posFilter].pos_list;
      var data_pos = [];
      d = _.sortBy(_.toPairs(d),1);
      if (posIgnore >= d.length)
        d = [];
      else
        d = d.slice(0, d.length - posIgnore);
      var option_pos = {
        tooltip: {
        },
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
          sizeRange: [10,50],
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
          data: d.map(function(n){return {
            name: n[0],
            value: n[1]
          }})
        }]
      };
      chart_pos_wordcloud.setOption(option_pos);
      chart_pos_wordcloud.hideLoading();
    }

    $scope.drawNeg =  function(){
      if ($scope.negFilter === 'All')
        var d = data.neg_list;
      else
        var d = data.metrics[$scope.negFilter].neg_list;
      var data_neg = [];
      d = _.sortBy(_.toPairs(d),1);
      if (negIgnore >= d.length)
        d = [];
      else
        d = d.slice(0, d.length - negIgnore);
      var option_neg = {
        tooltip: {
        },
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
          sizeRange: [10,50],
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
          data: d.map(function(n){return {
            name: n[0],
            value: n[1]
          }})
        }]
      };      
      chart_neg_wordcloud.setOption(option_neg);
      chart_neg_wordcloud.hideLoading();
    }

    function draw(data) { 
      var x = {
        pos:[],
        neg:[],
        neutral:[],
        pos_ratio:[],
        neg_ratio:[],
        neut_ratio:[]
      };
      _.forEach(data.metrics,function(value){
        x.pos.push(value.positive);
        x.neg.push(value.negative);
        x.neutral.push(value.neutral);
        //x.ratio.push(((value.positive?value.positive:1)/(value.negative?value.negative:1)).toFixed(2));
        x.pos_ratio.push((value.positive/value.total).toFixed(2));
        x.neg_ratio.push((value.negative/value.total).toFixed(2));
        x.neut_ratio.push((value.neutral/value.total).toFixed(2));
      });

      var option = {
        tooltip :{
          trigger : 'axis'
        },
        legend : {
          data : ['Positive','Neutral','Negative','Pos Proportion', 'Neut Proportion', 'Neg Proportion']
        },
        toolbox :{
          //show : true,
          feature : {
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
        dataZoom:{
          show: true,
          realtime: true,
          start: 0,
          end: 100
          //xAxisIndex: [0, 1]
        },
        xAxis : {
          name: $scope.by,
          nameLocation: 'middle',
          nameGap: 25,
          type: 'category',
          data: Object.keys(data.metrics)
        },
        yAxis : [{
          name: 'Number',
          type: 'value'
        },{
          name: 'Ratio',
          type: 'value'
        }],
        series : [{
          name : 'Positive',
          type : 'bar',
          stack : 'Total',
          data : x.pos
        },{
          name : 'Neutral',
          type : 'bar',
          stack : 'Total',
          data : x.neutral
        },{
          name : 'Negative',
          type : 'bar',
          stack : 'Total',
          data : x.neg
        },{
          name : 'Pos Proportion',
          type : 'line',
          yAxisIndex : 1,
          data : x.pos_ratio
        },{
          name : 'Neut Proportion',
          type : 'line',
          yAxisIndex : 1,
          data : x.neut_ratio
        },{
          name : 'Neg Proportion',
          type : 'line',
          yAxisIndex : 1,
          data : x.neg_ratio
        }]
      };

      chart_sentiment.setOption(option);
      chart_sentiment.hideLoading();

      var x_score = {
        average:[],
        comment_number:[],
        total_score:[]
      };
      _.forEach(data.metrics,function(value){
        x_score.average.push((value.score/value.total).toFixed(2));
        x_score.comment_number.push(value.total);
        x_score.total_score.push(value.score);
      });
      var option_score = {
        tooltip :{
          trigger : 'axis'
        },
        legend : {
          data : ['Average Score Per Comment','Total Score','Comment Number']
        },
        toolbox :{
          //show : true,
          feature : {
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
        dataZoom:{
          show: true,
          realtime: true,
          start: 0,
          end: 100
          //xAxisIndex: [0, 1]
        },
        xAxis : {
          name: $scope.by,
          nameLocation: 'middle',
          nameGap: 25,
          type: 'category',
          data: Object.keys(data.metrics)
        },
        yAxis : [{
          name: 'Average',
          type: 'value'
        },{
          name: 'Total',
          type: 'value'
        }],
        series : [{
          name : 'Average Score Per Comment',
          type : 'bar',
          data : x_score.average
        },{
          name : 'Total Score',
          type : 'line',
          yAxisIndex: 1,
          data : x_score.total_score
        },{
          name : 'Comment Number',
          type : 'line',
          stack : 'Total',
          yAxisIndex: 1,
          data : x_score.comment_number
        }]
      };

      chart_score.setOption(option_score);
      chart_score.hideLoading();

      $scope.drawPos();

      $scope.drawNeg();
    }

    // $http.get('http://localhost:3000/courses/' +
    //   $routeParams.course_code + '/run/' + $routeParams.run + '/sentiment_analysis?by=' + $scope.by).then(function(response) {
    //   var data = response.data;
    // });
    
    $scope.resize = function(name) {
      console.log(charts[name])
      charts[name].resize();
    };

  }
});