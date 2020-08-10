import React from 'react';
import styles from '../PieChart/index.less';
import Chart from '../index';

function compare(amount) {
  return function(a, b) {
    var value1 = a[amount];
    var value2 = b[amount];
    return value2 - value1;
  };
}

const SingleBar = props => {
  let { chartsData, style, graphTitle = '行业类别', resize } = props;
  if (!chartsData) {
    chartsData = [];
  }
  let nameArr = []; // 定义名称数组
  var colorArr = [
    '#5584ff',
    '#ff7600',
    '#c36de8',
    '#6edfff',
    '#8666ff',
    '#24d5af',
    '#ea5959',
    '#a47fd2',
    '#ffb16e',
    '#ea6659',
  ]; // 初始化颜色数据

  chartsData.sort(compare('amount'));
  chartsData.forEach(item => {
    nameArr.push(item.type);
  });

  // 根据数据的个数初始化颜色数组
  for (let i in nameArr) {
    if (i > 9) {
      let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      colorArr.push(color);
    }
  }

  // 定义图形
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      bottom: 0,
      data: nameArr || ['互联网', '制造业', '金融业', '房地产', '投资公司', '其他'],
      textStyle: {
        color: '#fft',
      },
    },
    grid: {
      left: 0,
      top: '40%',
      right: 20,
      height: 80,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      show: false,
    },
    yAxis: {
      type: 'category',
      data: ['行业类别'],
      show: false,
    },
    series: chartsData.map((v, i) => {
      return {
        name: v.type,
        type: 'bar',
        stack: '总量',
        itemStyle: {
          normal: {
            color: function() {
              return colorArr[i];
            },
          },
        },
        label: {
          normal: {
            show: true,
            position: 'insideRight',
          },
        },
        data: v.amount ? [v.amount] : '',
      };
    }),
  };

  return (
    <div style={{ ...style, backgroundColor: '#fff', height: '100%' }}>
      {graphTitle ? (
        <div className={styles.graph_title}>
        <div className='hz-label' style={{left: 20}}>{graphTitle}</div>
      </div>
      ) : (
        ''
      )}
      <Chart resize={resize} option={option} />
    </div>
  );
};

export default SingleBar;
