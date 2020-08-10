import React from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入 Echarts 模板
import Chart from '../index';
import styles from '../PieChart/index.less';
import { textStyle } from 'echarts/lib/theme/dark';

const BarChart = props => {
  // 初始化数据
  const {
    dataSource,
    bgColor,
    barTopColor,
    barColor,
    graphTitle,
    Unlimited,
    markPoint = false,
    xLength = 15,
    allName = false,
    xyColor,
    resize,
    barType
  } = props;
  const xData = [];
  const yData = [];

  dataSource &&
    dataSource.map((item, i) => {
      if (!Unlimited && i > 4) {
        return;
      }

      if (item.value && item.value !== 0) {
        xData.push(item.name);
        yData.push(item.value);
      }
    });

  // 定义图形
  const option1 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    barMaxWidth: 20,
    barCategoryGap: '20%',
    grid: {
      top: graphTitle ? '50px' : '15%',
      left: '3%',
      right: '4%',
      bottom: 10,
      containLabel: true,
    },
    xAxis: {
      axisLabel: {
        interval: 0,
        rotate: '45',
        textStyle: {
          color: xyColor ? '#fff' : '#757575',
        },
        formatter(val) {
          if (allName) {
            return val;
          }
          if (val && val.trim().length > 8 && typeof val === 'string') {
            return `${val.trim().substring(0, 8)  }…`;
          } 
            return val;
          
        },
      },
      axisLine: {
        lineStyle: {
          color: xyColor || '#e5e5e5',
        },
      },
      boundaryGap: ['1%', '1%'],
      type: 'category',
      data: xData,
    },
    dataZoom: [
      {
        show: xData.length > xLength,
        startValue: 0,
        endValue: xData.length > xLength ? xLength - 1 : xData.length - 1,
        filterMode: 'filter',
        height: 10,
        bottom: 5,
      },
      {
        show: xData.length > xLength,
        type: 'inside',
        startValue: 0,
        endValue: xData.length > xLength ? xLength - 1 : xData.length - 1,
        filterMode: 'filter',
      },
    ],
    yAxis: {
      splitLine: {
        lineStyle: {
          color: 'rgba(37,66,114,0.3)',
        },
      },
      axisLabel: {
        textStyle: {
          color: xyColor ? '#fff' : '#757575',
        },
      },
      type: 'value',
      axisLine: {
        lineStyle: {
          color: xyColor || '#e5e5e5',
        },
      },
    },
    series: [
      {
        data: yData,
        type: 'bar',
        label: {
          normal: {
            show: !markPoint,
            position: 'top',
            color: barColor,
          },
        },
        markPoint: {
          data: markPoint ? [{ type: 'max', name: '最大值' }] : [],
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: barTopColor || barColor },
              { offset: 0.8, color: barColor },
              { offset: 1, color: barColor },
            ]),
          },
        },
        barWidth: '50%',
        barMaxWidth: 150,
      },
    ],
  };

  const option2 = {
    title : {
        text: '',
        subtext: ''
    },
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid:{   // 绘图区调整
        x:150,  // 左留白
        y:10,   // 上留白
        x2:10,  // 右留白
        y2:0   // 下留白
    },
    xAxis : [
        {
            show:false,
            type : 'value',
            boundaryGap : [0, 0],
            // position: 'top'
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : xData,
            axisLine:{show:true},     // 坐标轴
            axisTick:[{    // 坐标轴小标记
                show:true
            }],
            axisLabel:{
                textStyle:{
                    // fontSize:'30'
                    color: "#FFF",
                }
            }
        }
    ],
    series : [
        {
            name:'',
            type:'bar',
            tooltip:{show: true},
            // barMinHeight:30,  //最小柱高
            // barWidth: 40,  //柱宽度
            // barMaxWidth:100,   //最大柱宽度
            data: yData,
            itemStyle:{
                normal:{    // 柱状图颜色
                    color:'#409eff',
                    // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    //   { offset: 0, color: "#409eff" },
                    //   { offset: 1, color: "lightblue" },
                    // ]),
                    label:{
                        show: false,   // 显示文本
                        position: 'right',  // 数据值位置
                    },
                    barBorderRadius: [0, 7, 7, 0],
                },
                emphasis: {
                  barBorderRadius: [0, 7, 7, 0],
                }
            },
            barCategoryGap: 6,
        }
    ]
  }

  return (
    <div style={{ ...props.barStyle, backgroundColor: bgColor || 'transparent' }}>
      {graphTitle ? (
        <div className={styles.graph_title}>
          <div style={{marginLeft: 10, fontWeight: "bold", fontSize: "16px"}}>{props.graphTitle}</div>
          <div style={{marginLeft: 20, fontSize: "12px"}}>(单位：{props.graphUnit})</div>
        </div>
      ) : (
        ''
      )}
      <Chart resize={resize} option={barType === "levelBar" ? option2 : option1} />
    </div>
  );
};

export default BarChart;
