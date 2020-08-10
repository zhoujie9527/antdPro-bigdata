/**
 * @author zhoukaiheng
 * @description 该组件可以使echart在react中动态更新
 * 只需要传入需要echart的option即可使用
 */

import React, { PureComponent } from 'react';
import echarts from 'echarts';
import { connect } from 'dva';
import throttle from 'lodash/throttle';

// @connect(({ leftNav }) => {
//   return {
//     collapsed: leftNav.collapsed,
//   };
// })
@connect(({ global }) => {
  return {
    collapsed: global.collapsed,
  };
})
class Chart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: '100%',
      height: props.height || '100%',
    };
    this.chart = null;
  }

  async componentDidMount() {
    this.timer3 = setTimeout(() => {
      const { option = {} } = this.props;
      this.setOption(option);
    }, 100);
    await this.initChart(this.el);
    this.legendScroll();
    window.addEventListener('resize', throttle(this.resize, 100));
  }

  componentDidUpdate(prevProps, prevState) {
    const { option = {}, collapsed } = this.props;
    this.setOption(option);
    this.legendScroll();

    if (prevProps.collapsed !== collapsed) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.resize();
      }, 100 * 7);
    }
  }

  componentWillUnmount() {
    this.dispose();
    window.removeEventListener('resize', throttle(this.resize, 100));
    clearTimeout(this.timer);
    clearTimeout(this.timer2);
    clearTimeout(this.timer3);
    this.timer = null;
    this.timer2 = null;
    this.timer3 = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.resize) {
      clearTimeout(this.timer2);
      this.timer2 = setTimeout(() => {
        this.resize();
      }, 0);
    }
  }

  initChart = el => {
    const { renderer = 'canvas' } = this.props;
    return new Promise(resolve => {
      setTimeout(() => {
        this.chart = echarts.init(el, null, {
          renderer,
          width: 'auto',
          height: 'auto',
        });
        resolve();
      }, 0);
    });
  };

  setOption = option => {
    if (!this.chart) {
      return;
    }

    this.chart.setOption(option, true);
  };

  dispose = () => {
    if (!this.chart) {
      return;
    }

    this.chart.dispose();
    this.chart = null;
  };

  // 监听事件
  legendScroll = () => {
    this.chart && this.chart.on('legendscroll', function(e) {});
  };

  resize = () => {
    if (this.chart) {
      this.chart.resize();
    }
  };

  render() {
    const { width, height } = this.state;
    return (
      <div
        ref={el => {
          this.el = el;
        }}
        style={{ width, height }}
      />
    );
  }
}

export default Chart;
