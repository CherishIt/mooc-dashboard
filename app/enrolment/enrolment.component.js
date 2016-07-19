'use strict';

angular.
  module('enrolment').
  component('timeLine', {
    templateUrl: 'enrolment/enrolment.template.html',
    controller: function enrolmentController($http) {
      var self = this;
      //google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart(){
        $http.get('http://localhost:3000/enrolment').then(function(response) {
          //self.enrolmentData = response.data;
          //google.charts.load('current', {'packages':['corechart']});
          var data = new google.visualization.DataTable();
          data.addColumn('date', 'Date');
          data.addColumn('number', 'Enrolled');
          data.addColumn('number', 'Unenrolled');
          response.data.forEach(function(row){
            var enrolled_at = new Date(row.enrolled_at);
            var unenrolled_at = 0;
            if(row.unenrolled_at)
              unenrolled_at = 1;
            data.addRow([enrolled_at, 1, unenrolled_at]);

          });


          var groupedData = google.visualization.data.group(data, 
            [{column: 0, modifier: getYearForRow, type: 'date', label: 'Year'}], 
            [{column:1, aggregation: google.visualization.data.sum, type: 'number', label: 'Enrolled'},
             {column:2, aggregation: google.visualization.data.sum, type: 'number', label: 'Unenrolled'}]);

          function getYearForRow(date){
            return new Date([date.getFullYear(), date.getMonth(), date.getDate()]);
          }

          var options = {
            title: "Enrolment and Unenrolment with Time",
            width: 900,
            height: 500,
            series: {
              0: {targetAxisIndex: 0},
              1: {targetAxisIndex: 1}
            },
            hAxis: {
              gridlines: {count: 15}
            },
            vAxis: {
              0: {
                gridlines: {count: 0}
              },
              1:{
                gridlines: {count: 0}
              }
             // gridlines: {color: 'none'},
            //minValue: 0
            }
          };

          var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
          chart.draw(groupedData, options);

        });
      }
      
    }
  });