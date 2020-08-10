import echarts from 'echarts/lib/echarts';
import { dmtData, seriesData } from "./data.js";

require("./china");
require('echarts/lib/component/geo');
require("echarts/lib/chart/map");
require('echarts/lib/chart/lines');

export default function InitChinaMap(pName) {
   

    const myChart = echarts.init(document.getElementById('china-map'));
    const tmpSeriesData = pName === "china" ? seriesData : [];

    // let series = 
    // [
      // {
      //   name: Chinese_ || pName,
      //   type: 'map',
      //   mapType: pName,
      //   roam: true,//是否开启鼠标缩放和平移漫游
      //   data: tmpSeriesData,
      //   top: "3%",//组件距离容器的距离
      //     zoom:1.1,
      //     selectedMode : 'single',
      //     label: {
      //         normal: {
      //             show: true,//显示省份标签
      //             textStyle:{color:"#fbfdfe"}//省份标签字体颜色
      //         },
      //         emphasis: {//对应的鼠标悬浮效果
      //             show: true,
      //             textStyle:{color:"#323232"}
      //         }
      //     },
      //     itemStyle: {
      //         normal: {
      //             borderWidth: .5,//区域边框宽度
      //             borderColor: '#0550c3',//区域边框颜色
      //             areaColor:"#409eff",//区域颜色

      //         },

      //         emphasis: {
      //             borderWidth: .5,
      //             borderColor: '#4b0082',
      //             areaColor:"#ece39e",
      //         }
      //     },
      // },
   
    //   {// 这个就是普通连线
    //     type: 'lines',
    //     coordinateSystem: 'geo',// 这句的意思是连线是基于地理坐标的,geo组件将在下面给出
    //     polyline: true,// 这表示连线是否为多端点的连线
    //     data: busLines,// 这里就是连线的数据了 上面组装的数据就在这里使用
    //     lineStyle: {
    //         normal: {
    //             opacity: 1,
    //             width: 2
    //         }
    //     },
    //     progressiveThreshold: 500,
    //     progressive: 200
    // }, 
    // {
    //   type: 'lines',// 这里还有一个连线其实是做的在线上的一个流动效果，运行代码注意观察你就会看到
    //   coordinateSystem: 'geo',
    //   polyline: true,
    //   data: busLines,
    //   lineStyle: {
    //       normal: {
    //           width: 0,
    //       }
    //   },
    //   effect: {
    //       constantSpeed: 60,
    //       show: true,
    //       trailLength: 3,
    //       symbolSize: 3
    //   },
    //   zlevel: 1
    //   }

    // ];

    const series= [
     // 根据经纬度在地图上描点
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        // animation: true,
        rippleEffect: {
        brushType: 'stroke'
        },
        symbolSize () {
        return 30;
        },
        data: dmtData.map(function (itemOpt) {
        return {
        name: itemOpt.name,
        value: [
          itemOpt.longitude,
          itemOpt.latitude,
          itemOpt.des,
          itemOpt.area,
          itemOpt.type,
        ],
        label: {
        emphasis: {
        position: 'right',
        show: false
        }
        },
        itemStyle: {
        normal: {
          color: itemOpt.color,
        }
        }
        };
        }),
        symbolSize () {
        return 8;// 描点的大小
        },
        }
      ]


    const option = {
    //   title: {
    //     text: Chinese_ || pName,
    //     left: 'center'
    //   },
      tooltip: 
        {
        trigger: 'item',
        confine: true,
        // formatter: "用户名：{b}<br/>用户信息：{c}"
        formatter(params) {
          const text = `用户名：${params.name}<br/>用户信息：${params.value[2]}<br/>经纬度坐标：[${params.value[0]},${params.value[1]}]`
          return text;
        }
        },
      series,
      geo: {  // geo组件
        map: 'china',
        data: tmpSeriesData,
        // label: {
        //     normal: {
        //         show: true,
        //         formatter: '{a}',
        //         // position: 'inside',
        //         backgroundColor: '#fff',
        //         padding: [3, 5],
        //         borderRadius: 3,
        //         borderWidth: 1,
        //         borderColor: 'rgba(0,0,0,0.5)',
        //         color: '#777'
        //     },
        //     emphasis: {
        //         areaColor: '#2a333d'
        //     }
        // },
        label: {
              normal: {
                  show: true,// 显示省份标签
                  formatter: '{a}',
                  position: 'inside',
                  textStyle:{color:"#fbfdfe"}// 省份标签字体颜色
              },
              emphasis: {// 对应的鼠标悬浮效果
                  show: true,
                  tooltip: {
                    trigger: 'item',
                    // formatter: '{b}<br/>{c} (p / km2)'
                    // formatter: '{b}<br/>地面站数量：{c}'
                    formatter: "{b}"
                  },
                  textStyle:{color:"#323232"}
              }
        },
        selectedMode: 'single',
        roam: true, // 是否开启鼠标缩放和平移漫游
        zoom: 1, // 默认层级
        scaleLimit: { // 缩放层级限制
          min: 0.8,
          max: 4,
        },
        itemStyle: {
          normal: {
              borderWidth: .5,// 区域边框宽度
              borderColor: '#0550c3',// 区域边框颜色
              areaColor:"#409eff",// 区域颜色
          },
          emphasis: {
              borderWidth: .5,
              borderColor: '#4b0082',
              areaColor:"#ece39e",
          }
      },
    },
    };
    
    myChart.setOption(option);

    return myChart;
        
}