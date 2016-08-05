'use strict';

angular.
module('demographics').
component('demographics', {
  templateUrl: 'components/demographics/demographics.template.html',
  controller: function demographicsController($http, $routeParams, $scope) {

    // map for chart resize
    var charts = {};
    $http.get('http://localhost:3000/courses/' +
      $routeParams.course_code + '/run/' + $routeParams.run + '/demographics').then(function(response) {

      var data = response.data;
      var gender = response.data.gender;
      var age = response.data.age_range;
      var country = response.data.country;
      var highest_education = response.data.highest_education_level;
      var employment_status = response.data.employment_status;
      var employment_area = response.data.employment_area;
      $scope.overview = data.overview;

      //var chart_gender = echarts.init(document.getElementById('gender'));
      var chart_country_map = echarts.init(document.getElementById('country_map'));
      charts.country_map = chart_country_map;
      //var chart_age_range = echarts.init(document.getElementById('age_range'));
      //var chart_highest_education_level = echarts.init(document.getElementById('highest_education_level'));
      //var chart_employment_status= echarts.init(document.getElementById('employment_status'));
      //var chart_gender = echarts.init(document.getElementById('gender'));

      /*var option_gender = {
        title: [{
          text: 'All',
          top: '15%',
          left: '22%'
        },{
          text: 'PurchasedStatement',
          top: '15%',
          left: '62%'
        }],
        legend : {
          data: gender.map(function(e){ if(e._id!=='Unknown')return e._id;}).filter(function(e){return e;})
        },
        tooltip:{
          trigger: 'item'
        },
        series:[{
          name: 'All',
          type: 'pie',
          radius: '50%',
          center : ['25%', '50%'],
          label: {
            normal: {
              position: 'inside',
              show: true,
              formatter: '{b}:{d}%'
            }
          },
          data: gender.map(function(e){ 
              if(e._id!=='Unknown') return {name:e._id,value:e.number};
            })
            .filter(function(e){return e;})
        },{
          name: 'PurchasedStatement',
          type: 'pie',
          radius: '50%',
          center : ['75%', '50%'],
          label: {
            normal: {
              position: 'inside',
              show: true,
              formatter: '{b}:{d}%'
            }
          },
          data: gender.map(function(e){ 
              if(e._id!=='Unknown') return {name:e._id,value:e.purchased_statement_number};
            })
            .filter(function(e){return e;})
        }]
      }
      chart_gender.setOption(option_gender);*/
      var map_data = data.country.map(function(e) {
          if (e.name) {
            return {
              name: e.name,
              value: e.number
            };
          }
        })
        .filter(function(e) {
          if (e === undefined) return false;
          else return true;
        });
      // console.log(map_data.map(function(e) {
      //   return e.name
      // }))
      var option_country_map = {
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
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
        visualMap: {
          type: 'continuous',
          splitNumber: 3,
          max: _.maxBy(map_data, 'value').value,
          //min: 0,
          //max: Math.max(data.country.map(function(e){return e.value})),
          //text:['High','Low'],
          //realtime: false,
          calculable: true
        },
        series: [{
          name: 'Country',
          type: 'map',
          mapType: 'world',
          roam: true,
          nameMap: {
            'United States of America': 'United States',
            'Vietnam': 'Viet Nam',
            'Russia': 'Russian Federation'
          },
          itemStyle: {
            emphasis: {
              label: {
                show: true
              }
            }
          },
          data: map_data
        }]
      };

      chart_country_map.setOption(option_country_map);

      Object.keys(data).forEach(function(name) {
        if (name === 'overview')
          return;
        renderBarChart(name);
      })

      function renderBarChart(name) {
        var chart = echarts.init(document.getElementById(name));
        charts[name] = chart;
        var option = {
          tooltip: {
            trigger: 'axis',
            //formatter: '{b}<br>{a0}:{c0}<br>{a1}:{c1}<br>{a2}:{c2}'
          },
          legend: {
            data: ['All', 'Fully Participated', 'Purchased Statement'],
            //selectedMode : 'single',
            selected: {
              'All': true,
              //'Fully Participated' : false,
              //'Purchased Statement' : false
            }
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
          grid: {
            bottom: name === 'age_range' ? 60 : name === 'employment_area' ? 180 : 100
          },
          xAxis: {
            type: 'category',
            axisTick: {
              interval: 0
            },
            axisLabel: {
              interval: 0,
              rotate: 45
            },
            data: data[name].map(function(e) {
              if (e._id !== 'Unknown') return e._id;
            }).filter(function(e) {
              if (e === undefined) return false;
              else return true;
            })
          },
          yAxis: [{
            name: 'Number',
            type: 'value'
          }, {
            name: 'Proportion',
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            }
            //boundaryGap: ['0', '20%'],
            //minInterval: 1
          }],
          series: [{
            name: 'All',
            type: 'bar',
            //step : 'middle',
            data: data[name].map(function(e) {
              if (e._id !== 'Unknown') return e.number;
            }).filter(function(e) {
              if (e === undefined) return false;
              else return true;
            })
          }, {
            name: 'Fully Participated',
            type: 'line',
            yAxisIndex: 1,
            data: data[name].map(function(e) {
              if (e._id !== 'Unknown') return (e.fully_participated_number / e.number * 100).toFixed(2);
            }).filter(function(e) {
              if (e === undefined) return false;
              else return true;
            })
          }, {
            name: 'Purchased Statement',
            type: 'line',
            yAxisIndex: 1,
            data: data[name].map(function(e) {
              if (e._id !== 'Unknown') return (e.purchased_statement_number / e.number * 100).toFixed(2);
            }).filter(function(e) {
              if (e === undefined) return false;
              else return true;
            })
          }]
        };
        chart.setOption(option);
      }
    });

    $scope.resize = function(name){
      charts[name].resize();
    }

  }
});