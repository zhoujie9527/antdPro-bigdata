/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
import { ShopOutlined, LogoutOutlined } from '@ant-design/icons';
import { Pie, Gauge } from '@/components/Charts';
import { Row, Col, Empty, Modal, Button, Tabs } from 'antd';
import $ from "jquery";
import CountUp from 'react-countup';
import BarChart from '@/components/Echarts/BarChart';
import initCanvas from '../../layouts/canvas';
import bj1 from "./imgs/bj1.png";
import bj2 from "./imgs/bj2.png";
import bj3 from "./imgs/bj3.png";
import bj4 from "./imgs/bj4.png";
import InitChinaMap from "./components/ChinaMap";
import { userType } from "./components/data.js";
import ThreeMap from "./components/ThreeMap";
import Maps from "./components/BaiduMap";
import Videos from "./components/Video";
import styles from './index.less';

const { TabPane } = Tabs;

const scrollLiStyle= {lineHeight: "41px"};

let plusNum = 61380;

let interval = null;

const countProps = {
    start: 0,
    duration: 2.75,
    useEasing: true,
    useGrouping: true,
    separator: ",",
}

const barStyle = {width: "110%", marginLeft: "12px"};

const commonListProps = {
    fontSize: '12',
    style: {
      width: 327,
      height: '100%',
    },
    center: '52%',
    xyColor: '#50d2ff',
    centerNubNone: true,
    labelLine: true,
    labelFormatter: true,
  };

const chartStyle = {
    barTopColor: '#42a1f1',
    barColor: '#188df0',
  };

const cityBarData = [
        {
            name: "xx1",
            value: 3000,
        },
        {
            name: "xx2",
            value: 3100,
        },
        {
            name: "xx3",
            value: 3200,
        },
        {
            name: "xx4",
            value: 4200,
        },
        {
            name: "xx5",
            value: 5200,
        },
    ]

const machineStatus = [
    {
      x: 'YY1',
      y: 12,
    },
    {
      x: 'YY2',
      y: 3,
    },
    {
      x: 'YY3',
      y: 8,
    },
  ];

  const offlineChartData = [];
  const lineData = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };
    for (let i = 0; i < 8; i ++) {
    lineData[0] += Math.floor(Math.random() * 1000);
    lineData[1] += Math.floor(Math.random() * 1000);
    lineData[2] += Math.floor(Math.random() * 1000);
    lineData[3] += Math.floor(Math.random() * 1000);
    lineData[4] += Math.floor(Math.random() * 1000);
    offlineChartData.push({
        x:  `${i  }月`,
        y1: lineData[0],
        y2: lineData[1],
        y3: lineData[2],
        y4: lineData[3],
        y5: lineData[4],
    });
    }

const Home = () => {
    const [barData, setBarData] = useState([]);
    const [percentData, setPercentData] = useState([]);
    const [province, setProvince] = useState("");
    const [detailVisible, setDetailVisible] = useState(false);
    const [msgVisible, setMsgVisible] = useState(false);
    const [userData, setUserData] = useState({});
    const [boxheight, setBoxheight] = useState(360);
    const [countNum, setCountNum] = useState(2020810);
    const [mapType, setMapType] = useState("2D");

    useEffect(()=> {
        initCanvas();
        scrollList();
        const myChart =  InitChinaMap("china", "中国");
        myChart.on('click', function (param) {
            if(param.value) {
                setDetailVisible(true);
                setUserData(param);
            } else {
                setProvince(param.name);
            }
          });

        resizeDiv();

        numPlus();

        setPercentData([Math.random()*100, Math.random()*100]);

        return(()=> {
            window.onresize=""; // 离开页面关闭监听
            clearInterval(interval);
            interval = null;
        })
    },[]);

     /* 窗口监听监听 */
     function resizeDiv() {
        // 初始化调整
        const showbox = document.getElementById("showbox");
        setBoxheight(showbox.clientHeight)
        window.onresize = function() {
            // 后续监听窗口resize
            setBoxheight(showbox.clientHeight)
        }
     } 

     function numPlus() {
        interval = setInterval(() => {
            plusNum += 1;
            setCountNum(plusNum);
         }, 1000*60*60*24);
     }

    function scrollList() {
        const uList = $(".scrollBox ul");
        let timer = null;
        // 触摸清空定时器
        uList.hover(function() {
            clearInterval(timer);
        },
        function() { // 离开启动定时器
            timer = setInterval(function() {
                scrollList();
            },
            5000);
        }).trigger("mouseleave"); // 自动触发触摸事件
        // 滚动动画
        function scrollList() {
            // 获得当前<li>的高度
            const scrollHeight = $("ul li:first").height();
            // 滚动出一个<li>的高度
            uList.stop().animate({
                marginTop: -scrollHeight
            },
            600,
            function() {
                // 动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
                uList.css({
                    marginTop: 0
                }).find("li:first").appendTo(uList);
            });
        }
    }

    function openMes() {
        setMsgVisible(true);
    }

    function changeMap(tip) {
        setMapType(tip);
    }
      
    return(
    <div className={styles.homeLayout}>
        <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }} />
        <div className={styles.homeHead}>
            <div className={styles.homeTitle}>
                {/* <img src={logo} alt="" /> */}
                <div className={styles.titleColor}>999平台</div>
            </div>
        </div>
        <div className={styles.homeBody}>
            <div className={styles.munuLink} style={{ marginLeft: "5%" }}>
                <div className={styles.titleBord}>
                <a>
                    <Link to="/pages"><ShopOutlined /> 鸭鸭仓库</Link>
                </a>
                </div>
            </div>
            <div className={styles.munuLink} style={{ float: "right", marginRight: "5%" }}>
                <div className={styles.titleBord}>
                <a>
                    <Link to="/user/login"><LogoutOutlined /> 退出登录</Link>
                </a>
                </div>
            </div>
            <div className={styles.content}>
                <Row style={{ height: "100%" }}>
                    <Col span={6} style={{ height: "100%" }}>
                        <div className={styles.boxall} style={{ height: "45%"}}>
                            <img src={bj1} className={styles.bj1} />
                            <img src={bj2} className={styles.bj2} />
                            <img src={bj3} className={styles.bj3} />
                            <img src={bj4} className={styles.bj4} />
                            <div className={styles.boxInfo}>
                                <div className={styles.boxtitle}>
                                    <h2 className={styles.boxtitleInfo}>{ province ? `${province}-鸭鸭地图` : "鸭鸭地图"}</h2>
                                    <div style={{height: "80%"}}><Maps /></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.boxall} style={{ height: "45%", marginTop: "10%"}}>
                            <img src={bj1} className={styles.bj1} />
                            <img src={bj2} className={styles.bj2} />
                            <img src={bj3} className={styles.bj3} />
                            <img src={bj4} className={styles.bj4} />
                            <div className={styles.boxInfo}>
                                <div className={styles.boxtitle}>
                                    <div className={styles.boxtitleInfo}>{ province ? `${province}-鸭鸭video` : "鸭鸭video"}</div>
                                    <div style={{height: "80%"}}><Videos /></div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={12} style={{ height: "100%" }}>
                        <div className={styles.sphere}>
                            {/* <div className={styles.spherebg} /> */}
                            <div className={styles.topNum}>
                                鸭鸭数： 
                                <div className={styles.topUserNum}><CountUp value={1000} end={countNum} {...countProps} /></div>
                            </div>
                            <div className={styles.chinaMap}>
                                <div className={styles.mapBtn}>
                                    <Button style={{ borderRadius: "20px 0px 0px 20px" }} type={mapType === "2D" ? "primary" : "default"} onClick={()=> changeMap("2D")}>2D</Button>
                                    <Button style={{ borderRadius: "0px 20px 20px 0px" }} type={mapType === "3D" ? "primary" : "default"} onClick={()=> changeMap("3D")}>3D</Button>
                                </div>
                                <Tabs activeKey={mapType}>
                                    <TabPane tab="2D" key="2D" className={styles.tabPane}>
                                        <div id="china-map" className={styles.twoDMap}/>
                                    </TabPane>
                                    <TabPane tab="3D" key="3D" className={styles.tabPane}>
                                        <div className={styles.threeDMap}>
                                            <ThreeMap />
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>
                            
                            <div className={styles.mapInfo}>
                            <Row>
                                <Col span={10}>
                                    <BarChart barStyle={barStyle} graphUnit="万元" {...commonListProps} dataSource={cityBarData} {...chartStyle} barType="levelBar" graphTitle="鸭鸭Top5" />
                                </Col>
                                <Col span={14}>
                                    <Pie
                                        hasLegend
                                        subTitle="鸭鸭统计"
                                        data={machineStatus}
                                        valueFormat={value => <span style={{fontSize: "16px"}}>{value}个</span>}
                                        height={boxheight*0.3}
                                        lineWidth={2}
                                        colors={["lightgreen","yellow", "#EE2C2C"]}
                                    />
                                </Col>
                            </Row>
                            </div>
                        </div>
                    </Col>
                    <Col span={6} style={{ height: "100%" }}>
                    <div id="showbox" className={styles.boxall} style={{ height: "45%"}}>
                            <img src={bj1} className={styles.bj1} />
                            <img src={bj2} className={styles.bj2} />
                            <img src={bj3} className={styles.bj3} />
                            <img src={bj4} className={styles.bj4} />
                            <div className={styles.boxInfo}>
                            <div className={styles.boxtitle}>
                                <div className={styles.boxtitleInfo}>消息中心</div>
                            </div>
                            <div className={styles.scrollList}>
                                <div className="scrollBox" style={{width: "100%", height: "100%", overflow: "hidden" }}>
                                    <ul style={{ height: boxheight - 66, overflow: "hidden" }}>
                                        <li style={scrollLiStyle}><div className={styles.tipIcon} />
                                            <div className={styles.scrollInfo} onClick={()=>openMes()}>鸭鸭</div>
                                        </li>
                                        <li style={scrollLiStyle}><div className={styles.tipIcon} />
                                            <div className={styles.scrollInfo} onClick={()=>openMes()}>鸭鸭</div>
                                        </li>
                                        <li style={scrollLiStyle}><div className={styles.tipIcon} />
                                            <div className={styles.scrollInfo} onClick={()=>openMes()}>鸭鸭</div>
                                        </li>
                                        <li style={scrollLiStyle}><div className={styles.tipIconWarn} />
                                            <div className={styles.scrollInfoWarn} onClick={()=>openMes()}>鸭鸭</div>
                                        </li>
                                        <li style={scrollLiStyle}><div className={styles.tipIcon} />
                                            <div className={styles.scrollInfo} onClick={()=>openMes()}>鸭鸭</div>
                                        </li>
                                        <li style={scrollLiStyle}><div className={styles.tipIcon} />
                                            <div className={styles.scrollInfo} onClick={()=>openMes()}>鸭鸭</div>
                                        </li>
                                        <li style={scrollLiStyle}><div className={styles.tipIcon} />
                                            <div className={styles.scrollInfo} onClick={()=>openMes()}>鸭鸭</div>
                                        </li>
                                        <li style={scrollLiStyle}><div className={styles.tipIconWarn} />
                                            <div className={styles.scrollInfoWarn} onClick={()=>openMes()}>鸭鸭</div>
                                        </li>
                                        <li style={scrollLiStyle}><div className={styles.tipIcon} />
                                            <div className={styles.scrollInfo} onClick={()=>openMes()}>鸭鸭</div>
                                        </li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.boxall} style={{ height: "45%", marginTop: "10%"}}>
                            <img src={bj1} className={styles.bj1} />
                            <img src={bj2} className={styles.bj2} />
                            <img src={bj3} className={styles.bj3} />
                            <img src={bj4} className={styles.bj4} />
                            <div className={styles.boxInfo}>
                                <div className={styles.boxtitle}>
                                    <div className={styles.boxtitleInfo}>鸭鸭状态</div>
                                </div>
                                    <div style={{ marginTop: "5%" }}>
                                        <Row>
                                            <Col span={1} />
                                            <Col span={11}>
                                            <Gauge
                                                title="健康度"
                                                height={boxheight*0.7}
                                                percent={percentData[0]}
                                                fontColor="#FFF"
                                            />
                                            </Col>
                                            <Col span={11}>
                                                <Gauge
                                                    title="繁忙度"
                                                    height={boxheight*0.7}
                                                    percent={percentData[1]}
                                                    fontColor="#FFF"
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <Modal
            width={640}
            bodyStyle={{
                padding: '32px 40px 48px',
            }}
            destroyOnClose
            maskClosable={false}
            title={
                <div><div className={styles.titleTip} />用户详情</div>
            }
            visible={detailVisible}
            footer={[
                <Button type="primary" key="close" onClick={() => setDetailVisible(false)}>
                  关闭
                </Button>,
              ]}
            onCancel={() => setDetailVisible(false)}
        >
            {
                userData ? 
                <>
                    <Row className={styles.modalRow}>
                        <Col span={4}>
                            用户名：
                        </Col>
                        <Col span={20}>
                            {userData.name ? userData.name : "--"}
                        </Col>
                    </Row>
                    <Row className={styles.modalRow}>
                        <Col span={4}>
                            用户地区：
                        </Col>
                        <Col span={20}>
                            {userData.value && userData.value[3] ? userData.value[3] : "--"}
                        </Col>
                    </Row>
                    <Row className={styles.modalRow}>
                        <Col span={4}>
                            鸭鸭类型：
                        </Col>
                        <Col span={20}>
                            {userData.value && userData.value[4] ? userType[userData.value[4]] : "--"}
                        </Col>
                    </Row>
                    <Row className={styles.modalRow}>
                        <Col span={4}>
                            经纬度坐标：
                        </Col>
                        <Col span={20}>
                            {userData.value && userData.value[0] && userData.value[1] ? `[${userData.value[0]}, ${userData.value[1]}]` : "--"}
                        </Col>
                    </Row>
                </>
                :
                <Empty />
            }
        </Modal>
        <Modal
            width={640}
            bodyStyle={{
                padding: '32px 40px 48px',
            }}
            destroyOnClose
            maskClosable={false}
            title={
                <div><div className={styles.titleTip} />消息详情</div>
            }
            visible={msgVisible}
            footer={[
                <Button type="primary" key="close" onClick={() => setMsgVisible(false)}>
                  关闭
                </Button>,
              ]}
            onCancel={() => setMsgVisible(false)}
        >
            <Empty />
        </Modal>
    </div>)
}

export default Home;
