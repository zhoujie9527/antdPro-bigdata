import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import DataSet from '@antv/data-set';
import React from 'react';
import Slider from 'bizcharts-plugin-slider';
import autoHeight from '../autoHeight';
import styles from './index.less';

const TimelineChart = props => {
  const {
    title,
    height = 400,
    padding = [60, 20, 40, 40],
    titleMap = {
      y1: 'y1',
      y2: 'y2',
      y3: 'y3',
      y4: 'y4',
      y5: 'y5',
    },
    borderWidth = 2,
    data: sourceData,
    fontColor,
  } = props;
  const data = Array.isArray(sourceData)
    ? sourceData
    : [
        {
          x: 0,
          y1: 0,
          y2: 0,
          y3: 0,
          y4: 0,
          y5: 0,
        },
      ];
  data.sort((a, b) => a.x - b.x);
  let max;

  if (data[0] && data[0].y1 && data[0].y2) {
    max = Math.max(
      [...data].sort((a, b) => b.y1 - a.y1)[0].y1,
      [...data].sort((a, b) => b.y2 - a.y2)[0].y2,
      [...data].sort((a, b) => b.y3 - a.y3)[0].y3,
      [...data].sort((a, b) => b.y4 - a.y4)[0].y4,
      [...data].sort((a, b) => b.y5 - a.y5)[0].y5,
    );
  }

  const ds = new DataSet({
    state: {
      start: data[0].x,
      end: data[data.length - 1].x,
    },
  });
  const dv = ds.createView();
  dv.source(data)
    .transform({
      type: 'filter',
      callback: obj => {
        const date = obj.x;
        // return date < ds.state.end && date > ds.state.start;
        return date !== "0月";
      },
    })
    .transform({
      type: 'map',
      callback(row) {
        const newRow = { ...row };
        newRow[titleMap.y1] = row.y1;
        newRow[titleMap.y2] = row.y2;
        newRow[titleMap.y3] = row.y3;
        newRow[titleMap.y4] = row.y4;
        newRow[titleMap.y5] = row.y5;
        return newRow;
      },
    })
    .transform({
      type: 'fold',
      fields: [titleMap.y1, titleMap.y2, titleMap.y3, titleMap.y4, titleMap.y5],
      // 展开字段集
      key: 'key',
      // key字段
      value: 'value', // value字段
    });
  // const timeScale = {
  //   type: 'time',
  //   tickInterval: 60 * 60 * 1000,
  //   mask: 'HH 月',
  //   range: [0, 1],
  // };
  const cols = {
    // x: timeScale,
    date: {
      type: 'timeCat',
    },
    value: {
      max,
      min: 0,
    },
  };

  // const SliderGen = () => (
  //   <Slider
  //     padding={[0, padding[1] + 20, 0, padding[3]]}
  //     width="auto"
  //     height={26}
  //     xAxis="x"
  //     yAxis="y1"
  //     scales={{
  //       x: timeScale,
  //     }}
  //     data={data}
  //     start={ds.state.start}
  //     end={ds.state.end}
  //     backgroundChart={{
  //       type: 'line',
  //     }}
  //     onChange={({ startValue, endValue }) => {
  //       ds.setState('start', startValue);
  //       ds.setState('end', endValue);
  //     }}
  //   />
  // );

  const textStyle1 = {
    fontSize: 12,
    fill: fontColor ||'rgba(0, 0, 0, 0.65)',
    textAlign: 'center',
  };

  const textStyle2 = {
    // fontSize: 12,
    fill: fontColor ||'rgba(0, 0, 0, 0.65)',
    color: fontColor ||'rgba(0, 0, 0, 0.65)',
    // textAlign: 'center',
  };

  return (
    <div
      className={styles.timelineChart}
      style={{
        height,
      }}
    >
      <div>
        {title && <h4>{title}</h4>}
        <Chart height={height} padding={padding} data={dv} scale={cols} forceFit>
          <Axis name="x" label={{textStyle: textStyle1}}  tickLine={{ fill: "#FFF" }} />
          <Axis name="value" label={{textStyle: textStyle2}}  tickLine={{ fill: "#FFF" }} />
          <Tooltip />
          <Legend name="key" position="top" />
          <Geom type="line" position="x*value" size={borderWidth} color="key" shape="sliceShape" />
        </Chart>
        {/* <div
          style={{
            marginRight: -20,
          }}
        >
          <SliderGen />
        </div> */}
      </div>
    </div>
  );
};

export default autoHeight()(TimelineChart);
