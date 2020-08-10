import React from 'react';

import Chart from '../index';

const LineChart = props => {
  // 初始化数据
  const { dataSource, title = '' } = props;
  const xData = [];
  const yData = [];
  dataSource &&
    dataSource.map(item => {
      xData.push(item.name);
      yData.push(item.value);
    });
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    title: {
      text: title,
      left: '37%',
      top: 5,
      textStyle: {
        fontSize: '18',
        color: '#13fff4',
        fontWeight: 'bold',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: {
      axisLabel: {
        textStyle: {
          color: '#323232',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#cecece',
        },
      },
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#323232',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#cecece',
        },
      },
    },
    series: [
      {
        data: yData,
        type: 'line',
        color: props.lineColor,
      },
    ],
  };
  return (
    <div style={{ ...props.style }}>
      <Chart option={option} />
    </div>
  );
};

export default LineChart;
