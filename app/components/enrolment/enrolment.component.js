'use strict';

angular.
  module('enrolment').
  component('timeLine', {
    templateUrl: 'components/enrolment/enrolment.template.html',
    controller: function enrolmentController($http, $routeParams, $scope) {
      //var self = this;
      //google.charts.load('current', {'packages':['corechart']});
      //google.charts.setOnLoadCallback(drawChart);

      //function drawChart(){

      //for resize chart
      var charts = {};
        $http.get('http://localhost:3000/courses/'
          + $routeParams.course_code+'/run/' + $routeParams.run + '/enrolment').then(function(response) {

          var data = response.data;

          var chart_enrolment = echarts.init(document.getElementById('enrolment'));
          charts.enrolment = chart_enrolment;

          var option = {
            tooltip :{
              trigger : 'axis'
            },
            legend : {
              data : ['Enrolled', 'Unenrolled']
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
              name: 'Date',
              nameLocation: 'middle',
              nameGap: 25,
              type: 'category',
              data: data.map(function(e){return e.date})
            },
            yAxis : [{
              name: 'Enrolled',
              type: 'value'
            },{
              name: 'Unenrolled',
              type: 'value'
            }],
            series : [{
              name : 'Enrolled',
              type : 'line',
              //step : 'middle',
              data : data.map(function(e){return e.enrolled_number ? e.enrolled_number : 0})
            },{
              name : 'Unenrolled',
              type : 'line',
              yAxisIndex: 1,
              data : data.map(function(e){return e.unenrolled_number ? e.unenrolled_number : 0})
            }]
          };

          chart_enrolment.setOption(option);

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