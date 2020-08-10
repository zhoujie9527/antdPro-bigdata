import React from 'react';
import Chart from '../index';

import Styles from './index.less';
//regionColor:区域的颜色
//graphTitle：左上角标题
//LineColor：折现以及顶点的颜色

const BarLineGraph = props => {
  const { graphTitle, dataSource, regionColor, LineColor } = props;

  let xData = [];
  let yData = [];
  if (dataSource && dataSource instanceof Array && dataSource.length > 0) {
    dataSource.map(item => {
      if (item.value) {
        xData.push(item.name);
        yData.push(item.value);
      }
    });
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        //type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    barWidth: 0.00001,
    grid: {
      top: graphTitle ? '50px' : '5%',
      left: '3%',
      right: '4%',
      bottom: '1%',
      containLabel: true,
    },
    xAxis: {
      boundaryGap: true,
      axisLine: {
        lineStyle: {
          color: '#cecece',
        },
      },
      axisLabel: {
        interval: 0,
        rotate: '45',
        textStyle: {
          color: '#323232',
        },
        formatter: function(val) {
          if (val && val.trim().length > 4 && typeof val === 'string') {
            return val.trim().substring(0, 4) + `…`;
          } else {
            return val;
          }
        },
      },
      type: 'category',
      data: xData,
    },
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#cecece',
          },
        },
        axisLabel: {
          textStyle: {
            color: '#323232',
          },
        },
      },
      {
        show: false,
        type: 'value',
      },
    ],
    series: [
      {
        data: yData,
        type: 'bar',
        itemStyle: {
          normal: {
            barBorderWidth: 1,
            borderType: 'dotted',
            barBorderColor: LineColor,
          },
        },
      },
      {
        name: '折线图',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        symbol: 'circle',
        itemStyle: {
          normal: {
            color: LineColor,
            lineStyle: {
              color: LineColor,
              width: 1,
              type: 'solid',
              shadowColor: LineColor, // 默认透明
              shadowBlur: 2,
              shadowOffsetX: 1,
              shadowOffsetY: 1,
            },
          },
        },
        areaStyle: {
          normal: {
            // 渐变色
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   { offset: 0, color: '#41bfe4' },
            //   { offset: 0.3, color: '#41bfe4' },
            //   { offset: 1, color: 'transparent' },
            // ]),
            color: regionColor,
          },
        },
        data: yData,
        symbolSize: 10,
      },
    ],
  };

  return (
    <div className={Styles.bgStyle}>
      {graphTitle ? (
        <div className={styles.graph_title}>
          <div className='hz-label' style={{left: 20}}>{props.graphTitle}</div>
        </div>
      ) : (
        ''
      )}
      <Chart option={option} />
    </div>
  );
};

export default BarLineGraph;
