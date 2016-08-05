'use strict';

angular.
  module('stepActivity').
  component('stepActivity', {
    templateUrl: 'components/step_activity/step_activity.template.html',
    controller: function stepStartedController($http, $scope, $routeParams) {
      var ctrl = this;
      //google.charts.setOnLoadCallback(drawChart);

      //function drawChart(){

        var charts = {}

        $http.get('http://localhost:3000/courses/' + $routeParams.course_code + '/run/' + $routeParams.run + '/step_activity').then(function(response) {
          //self.enrolmentData = response.data;
          console.log('http://localhost:3000/courses/' + ctrl.course_code + '/run/' + ctrl.run + '/step_activity')
          var data = response.data;

          var chart_step_activity = echarts.init(document.getElementById('step_activity'));
          charts.step_activity = chart_step_activity;

          var option = {
            tooltip :{
              trigger : 'axis'
            },
            legend : {
              data : ['Started', 'Completed', 'Completion Rate']
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
              name: 'Step',
              nameLocation: 'middle',
              nameGap: 25,
              type: 'category',
              data: data.map(function(e){return e._id})
            },
            yAxis : [{
              name: 'Number',
              type: 'value'
            },{
              name: 'Completion Rate',
              type: 'value',
              axisLabel: {
                formatter: '{value}%'
              }
            }],
            series : [{
              name : 'Started',
              type : 'bar',
              //step : 'middle',
              data : data.map(function(e){return e.started})
            },{
              name : 'Completed',
              type : 'bar',
              //step : 'middle',
              data : data.map(function(e){return e.completed})
            },{
              name : 'Completion Rate',
              type : 'line',
              yAxisIndex : 1,
              data : data.map(function(e){return e.completed/e.started})
            }]
          };

          chart_step_activity.setOption(option);

          $scope.resize = function(name){
            charts[name].resize();
          };

          /*var data = new google.visualization.DataTable();
          data.addColumn('string', 'Step');
          data.addColumn('number', 'Started');
          data.addColumn('number', 'Completed');
          //data.addColumn('number', 'Unenrolled');
          //response.data.forEach(function(row){
          //  data.addRow([row._id.toString(), row.number]);
          //});
          var r1 = response.data[1];
          var r2 = response.data[0];
          for(var i=0; i<r1.length; i++){
            data.addRow([r1[i]._id.toString(), r1[i].number, r2[i].number]);
          }

          console.log(data);

          var options = {
            title: "Step Activities",
            width: 900,
            height: 500,
            hAxis: {
              gridlines: {count: 15}
            },
            vAxis: {
              0:{
                gridlines: {count: 0}
              }
             // gridlines: {color: 'none'},
            //minValue: 0
            }
          };

          var chart = new google.visualization.SteppedAreaChart(document.getElementById('chart_div'));
          chart.draw(data, options);*/

        });
      //}
      
    }
  });