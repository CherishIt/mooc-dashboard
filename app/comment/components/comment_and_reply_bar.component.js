'use strict';

angular.
  module('comment').
  component('commentAndReplyBar', {
    templateUrl: 'chart.template.html',
    controller: function stepStartedController($http) {
      //var self = this;
      google.charts.setOnLoadCallback(drawChart);

      function drawChart(){
        $http.get('http://localhost:3000/comment').then(function(response) {
          //self.enrolmentData = response.data;
          //google.charts.load('current', {'packages':['corechart']});

          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Step');
          data.addColumn('number', 'Comments');
          data.addColumn('number', 'Replies');
          //data.addColumn('number', 'Unenrolled');
          //response.data.forEach(function(row){
          //  data.addRow([row._id.toString(), row.number]);
          //});
          var r1 = response.data[0];
          var r2 = response.data[1];
          for(var i=0; i<r1.length; i++){
            data.addRow([r1[i]._id.toString(), r1[i].comments, r2[i].replies]);
          }

          //console.log(data);

          var options = {
            title: "Comments and Replies by Step",
            width: 600,
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

          var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));

        });
      }
      
    }
  });