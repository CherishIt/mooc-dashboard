'use strict';

angular.
  module('stepActivity').
  component('stepActivity', {
    templateUrl: 'step_activity/step_activity.template.html',
    controller: function stepStartedController($http) {
      //var self = this;
      google.charts.setOnLoadCallback(drawChart);

      function drawChart(){
        $http.get('http://localhost:3000/step_activity').then(function(response) {
          //self.enrolmentData = response.data;
          
          var data = new google.visualization.DataTable();
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
          chart.draw(data, options);

        });
      }
      
    }
  });