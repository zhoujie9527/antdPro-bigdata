//legend在图形右边

import React from 'react';
// 引入 Echarts 模板
import Chart from '../index';
import styles from './index.less';

/*
  props：
  dataSource:数据
  center：Y轴偏移百分比
  fontSize:字体大小，默认12px
  contentTitle:中间区域显示的内容
  armLabel：中间区域显示目标数值（默认显示总和）例：armLabel:'在家',则显示在家的相关数值
  topTitle:是否存在右上角数值
  labelFormatter:series中的label显示是数值还是百分比（true显示百分比）
  labelLine：是否显示labelLine
  centerNubNone：中间模块是否显示数字
  style：图形区域样式（里面设置宽高）
  pieId:图形区域的Id
  legendLen:legend下挪距离
  yInterval:Y轴之间的间隔距离
  graphTitle:是否存在头部标题
  reduced：缩小百分比
  isSolid:true饼图，false环形图
*/

const PieChart = props => {
  // 初始化渲染数据
  let { dataSource, fontSize = 12, armLabel, reduced, isSolid } = props;
  let nameArr = []; // 定义名称数组
  let nubArr = []; // 定义相关值数组
  let total = 0; // 初始化总数
  let narrow = parseInt(reduced) || 0;

  let color = 0;
  dataSource.map(item => {
    nameArr.push(item.name);
    nubArr.push(item.value);
    total += parseInt(item.value);
  });

  // 判断是否所有数据都为空
  // 如果为空则清空所有数据
  let cFil = nubArr.filter(item => item > 0);
  if (cFil.length < 1) {
    nameArr = [];
    nubArr = [];
    dataSource = [];
  }

  if (armLabel) {
    for (let i = 0; i < nameArr.length; i++) {
      if (nameArr[i] === armLabel) {
        total = nubArr[i];
      }
    }
  }

  // 定义图形
  const option = {
    tooltip: {
      trigger: 'item',
      position: function(point, params, dom, rect, size) {
        // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
        // 提示框位置
        var x = 0; // x坐标位置
        var y = 0; // y坐标位置

        // 当前鼠标位置
        var pointX = point[0];
        var pointY = point[1];

        // 提示框大小
        var boxWidth = size.contentSize[0];
        var boxHeight = size.contentSize[1];

        // boxWidth > pointX 说明鼠标左边放不下提示框
        if (boxWidth > pointX) {
          x = 5;
        } else {
          // 左边放的下
          x = pointX - boxWidth;
        }

        // boxHeight > pointY 说明鼠标上边放不下提示框
        if (boxHeight > pointY) {
          y = 5;
        } else {
          // 上边放得下
          y = pointY - boxHeight;
        }

        return [x, y];
      },
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 8, // 设置宽度
      itemHeight: 8, // 设置高度
      data: nameArr,
      left: 205,
      height: '80%',
      y: 'center',
      textStyle: {
        color: '#fft',
        fontSize,
      },
      tooltip: {
        show: true,
      },
      bottom: 0,
      formatter(nub) {
        let index = 0;
        let text = '';
        nameArr.forEach((value, i) => {
          if (value === nub) {
            index = i;
          }
        });
        if (nub.length > 5 && nub && typeof nub === 'string') {
          text = nub.substring(0, 4) + `…` + `  ${nubArr[index]}`;
        } else text = `${nub}:  ${nubArr[index]}`;
        return text;
      },
    },
    series: [
      {
        center: ['35%', props.center ? props.center : '50%'],
        name: props.contentTitle ? props.contentTitle : '访问来源',
        type: 'pie',
        radius: [!isSolid ? `${70 - narrow}%` : `${0}%`, `${90 - narrow}%`],
        avoidLabelOverlap: false,
        label: {
          normal: {
            formatter: props.labelFormatter ? '{d}%' : '{b}',
            show: false, //!!props.labelLine
          },
          emphasis: {
            show: false,
            textStyle: {
              fontSize: '12',
              fontWeight: 'bold',
            },
          },
        },
        labelLine: {
          normal: {
            show: false, //!!props.labelLine
            length: 10,
            length2: 0,
          },
        },
        //无数据显示处理
        data: dataSource.length !== 0 ? dataSource : [{ name: '', value: 0 }],
        // itemStyle: {
        //   normal: {
        //     color() {
        //       colorNub = colorArr[color];
        //       color += 1;
        //       return colorNub;
        //     },
        //   },
        // },
        itemStyle: {
          normal: {
            color: function(params) {
              if (dataSource.length === 0) {
                return '#7d8686';
              } else {
                if (params.dataIndex < 10) {
                  var colorArr = [
                    '#5584ff',
                    '#c36de8',
                    '#6edfff',
                    '#8666ff',
                    '#24d5af',
                    '#ea5959',
                    '#a47fd2',
                    '#e9ff6e',
                    '#ffb16e',
                    '#ea6659',
                  ]; // 初始化颜色数据
                  return colorArr[params.dataIndex];
                } else {
                  return '#' + Math.floor(Math.random() * 16777215).toString(16);
                }
              }
            },
          },
        },
        //空值时候显示为空
        // itemStyle: {
        //   normal: {
        //     color: dataSource.length !== 0 ? '' : '#7d8686',
        //   },
        // },
      },
      !isSolid
        ? {
            center: ['35%', props.center ? props.center : '50%'],
            name: props.contentTitle ? props.contentTitle : '访问来源',
            type: 'pie',
            radius: ['0%', `${70 - narrow}%`],
            itemStyle: {
              normal: {
                color() {
                  return 'transparent';
                },
              },
            },

            label: {
              normal: {
                show: true,
                position: 'center',
                textStyle: {
                  color: '#fff',
                  fontSize: props.fontSize ? props.fontSize : '14',
                  fontWeight: 'bold',
                },
              },
            },
            data: [
              {
                value: total,
                name: !props.centerNubNone
                  ? `${props.contentTitle}\n\n${total}`
                  : props.contentTitle,
              },
            ],
          }
        : '{}',
    ],
  };

  return (
    <div className={styles.outDiv} style={{ ...props.style }}>
      {props.graphTitle ? (
        <div className={styles.graph_title}>
          <div>{props.graphTitle}</div>
        </div>
      ) : (
        ''
      )}
      <Chart option={option} height={props.graphTitle ? 'calc(100% - 40px)' : '100%'} />
      {/* <div className={styles.bottomDiv} onClick={stopEfunc}></div> */}
    </div>
  );
};

// function stopEfunc(e){
// }

export default PieChart;
