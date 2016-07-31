'use strict';

angular.
  module('comment').
  component('commentByStep', {
    templateUrl: 'components/comment/comment_by_step/comment_by_step.template.html',
    controller: function stepStartedController($http, $routeParams,$scope) {
      //var self = this;
      google.charts.setOnLoadCallback(drawChart);

      function drawChart(){
        $http.get('http://localhost:3000/courses/' 
          + $routeParams.course_code + '/run/' + $routeParams.run + '/comment').then(function(response) {

          var data = response.data;

          var comment_by_step = echarts.init(document.getElementById('comment_by_step'));

          var option = {
            tooltip :{
              trigger : 'axis'
            },
            legend : {
              data : ['Post', 'Reply']
            },
            toolbox :{
              //show : true,
              feature : {
                dataView: {
                  title: 'Data View',
                  readOnly: true
                },
                saveAsImage: {
                  title: 'Save as Image'
                },
                dataZoom: {
                  title: {
                    zoom: 'Zoom',
                    back: 'Reset Zoom'
                  },
                  yAxisIndex: false
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
            yAxis : {
              name: 'Number',
              type: 'value'
            },
            series : [{
              name : 'Post',
              type : 'bar',
              stack : 'Comment',
              data : data.map(function(e){return e.post})
            },{
              name : 'Reply',
              type : 'bar',
              stack : 'Comment',
              data : data.map(function(e){return e.reply})
            }]
          };

          comment_by_step.setOption(option);

          //self.enrolmentData = response.data;
          //google.charts.load('current', {'packages':['corechart']});
          // console.log(response.data)
          // var data = new google.visualization.DataTable();
          // data.addColumn('string', 'Step');
          // data.addColumn('number', 'Comments');
          // data.addColumn('number', 'Replies');
          // //data.addColumn('number', 'Unenrolled');
          // //response.data.forEach(function(row){
          // //  data.addRow([row._id.toString(), row.number]);
          // //});
          // var r1 = response.data[0];
          // var r2 = response.data[1];
          // for(var i=0; i<r1.length; i++){
          //   data.addRow([r1[i]._id.toString(), r1[i].comments, r2[i].replies]);
          // }

          // //console.log(data);

          // var options = {
          //   title: "Comments and Replies by Step",
          //   width: 600,
          //   height: 500,
          //   hAxis: {
          //     gridlines: {count: 15}
          //   },
          //   vAxis: {
          //     0:{
          //       gridlines: {count: 0}
          //     }
          //    // gridlines: {color: 'none'},
          //   //minValue: 0
          //   }
          // };

          // var chart = new google.visualization.SteppedAreaChart(document.getElementById('chart_div'));
          // chart.draw(data, options);

          // var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));

        });
      }
      
    }
  });