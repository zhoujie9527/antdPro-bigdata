import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Typography } from 'antd';
import lbx from "./imgs/lbx.png";
import jt from "./imgs/jt.png";
import map from "./imgs/map.png";
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <PageHeaderWrapper>
    <div className={styles.mapbox}>
      <div className={styles.map}>
        <div className={styles.map1}>
          <img src={lbx} style={{width: "17rem"}} />
        </div>
        <div className={styles.map2}>
          <img src={jt} style={{width: "15rem"}} />
        </div>
        <div className={styles.map3}>
          <img src={map} style={{width: "13rem"}} />
        </div>
      </div>
    </div>
  </PageHeaderWrapper>
);
