import React, { useEffect } from 'react';
import styles from "./index.less";

const Maps = (props) => {

    useEffect(() => {
        // GL版命名空间为BMapGL
        // 按住鼠标右键，修改倾斜角和角度
        let map = new BMapGL.Map("allmap");    // 创建Map实例
        map.centerAndZoom(new BMapGL.Point(116.280190, 40.049191), 19);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.setHeading(64.5);
        map.setTilt(73);

        // 百度地图API功能
        // let map = new window.BMap.Map("allmap");    // 创建Map实例
        // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        // //添加地图类型控件
        // map.addControl(new BMap.MapTypeControl({
        // 	mapTypes:[
        //         BMAP_NORMAL_MAP,
        //         BMAP_HYBRID_MAP
        //     ]}));	  
        // map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        // map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

      }, []);

    return (
        <div className={styles.mapContent}>
            <div id="allmap" className={styles.maps}></div>
        </div>
    )
}

export default Maps;

