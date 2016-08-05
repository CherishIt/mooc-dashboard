'use strict';

angular.
  module('quiz_result').
  component('quizResult', {
    templateUrl: 'components/quiz_result/quiz_result.template.html',
    controller: function enrolmentController($http, $routeParams, $scope) {
      //var self = this;
      //google.charts.load('current', {'packages':['corechart']});
      //google.charts.setOnLoadCallback(drawChart);

      //function drawChart(){

      //for resize chart
      var charts = {};
        $http.get('http://localhost:3000/courses/'
          + $routeParams.course_code+'/run/' + $routeParams.run + '/question_response').then(function(response) {

          var data = response.data;

          var chart_quiz_result = echarts.init(document.getElementById('quiz_result'));
          charts.quiz_result = chart_quiz_result;
          var chart_correct_percentage = echarts.init(document.getElementById('correct_percentage'));
          charts.correct_percentage = chart_correct_percentage;

          var option = {
            tooltip :{
              trigger : 'axis'
            },
            legend : {
              data : ['Correct', 'Wrong','Average Try']
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
              name: 'Question',
              nameLocation: 'middle',
              nameGap: 25,
              type: 'category',
              data: data.all.map(function(e){return e.question_number})
            },
            yAxis : [{
             // name: 'Number',
              type: 'value'
            },{
              //name: 'Unenrolled',
              type: 'value'
            }],
            series : [{
              name : 'Correct',
              type : 'bar',
              stack: 'Total',
              //step : 'middle',
              data : data.all.map(function(e){return e.correct})
            },{
              name : 'Wrong',
              type : 'bar',
              stack : 'Total',
              //yAxisIndex: 1,
              data : data.all.map(function(e){return e.wrong})
            },{
              name : 'Average Try',
              type : 'line',
              //stack : 'Total',
              yAxisIndex: 1,
              data : data.all.map(function(e){return e.average_try})
            }]
          };
          chart_quiz_result.setOption(option);

          var option2 = {
            tooltip :{
              trigger : 'axis'
            },
            legend : {
              data : ['All', 'First Try','Last Try']
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
              name: 'Question',
              nameLocation: 'middle',
              nameGap: 25,
              type: 'category',
              data: data.all.map(function(e){return e.question_number})
            },
            yAxis : [{
             // name: 'Number',
              type: 'value'
            }],
            series : [{
              name : 'All',
              type : 'line',
              data : data.all.map(function(e){return e.correct_rate})
            },{
              name : 'First Try',
              type : 'line',
              data : data.first.map(function(e){return e.correct_rate})
            },{
              name : 'Last Try',
              type : 'line',
              data : data.last.map(function(e){return e.correct_rate})
            }]
          };
          chart_correct_percentage.setOption(option2);

          $scope.resize = function(name){
            charts[name].resize();
          }
          //self.enrolmentData = response.data;
          //google.charts.load('current', {'packages':['corechart']});
          // var data = new google.visualization.DataTable();
          // data.addColumn('date', 'Date');
          // data.addColumn('number', 'Enrolled');
          // data.addColumn('number', 'Unenrolled');
          // response.data.forEach(function(row){
          //   var enrolled_at = new Date(row.enrolled_at);
          //   var unenrolled_at = 0;
          //   if(row.unenrolled_at)
          //     unenrolled_at = 1;
          //   data.addRow([enrolled_at, 1, unenrolled_at]);

          // });


          // var groupedData = google.visualization.data.group(data, 
          //   [{column: 0, modifier: getYearForRow, type: 'date', label: 'Year'}], 
          //   [{column:1, aggregation: google.visualization.data.sum, type: 'number', label: 'Enrolled'},
          //    {column:2, aggregation: google.visualization.data.sum, type: 'number', label: 'Unenrolled'}]);

          // function getYearForRow(date){
          //   return new Date([date.getFullYear(), date.getMonth(), date.getDate()]);
          // }

          // var options = {
          //   title: "Enrolment and Unenrolment with Time",
          //   series: {
          //     0: {targetAxisIndex: 0},
          //     1: {targetAxisIndex: 1}
          //   },
          //   hAxis: {
          //     gridlines: {count: 15}
          //   },
          //   vAxis: {
          //     0: {
          //       gridlines: {count: 0}
          //     },
          //     1:{
          //       gridlines: {count: 0}
          //     }
          //    // gridlines: {color: 'none'},
          //   //minValue: 0
          //   }
          // };

          // var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
          // chart.draw(groupedData, options);

        });
      //}
      
    }
  });