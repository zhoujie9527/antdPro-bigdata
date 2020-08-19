import React, { useEffect, useState } from 'react';
import videojs from 'video.js';
import videozhCN from 'video.js/dist/lang/zh-CN.json'; //播放器中文，不能使用.js文件
import styles from "./index.less";
require("video.js/dist/video-js.min.css");

let playRef = React.createRef();

const Videos = (props) => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        let playinit = videojs(playRef,  { autoplay: true, muted: true }, function onPlayerReady() {
            console.log('onPlayerReady', playinit);
            videojs.addLanguage('zh-CN', videozhCN);
            playinit.controls(true);
            playinit.src("https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_AnimatedShot_Bastion_TheLastBastion.mp4");
            playinit.play();
        });

        setPlayer(playinit);

        return(()=> {
            // player.dispose();
            setPlayer(null);
        })
      }, []);

    return (
        <div className={styles.videoContent}>
            <div data-vjs-player style={{ width: "100%", height: "90%", marginTop: "10%" }}>
            <video ref={ node => playRef = node } className="video-js" ></video>
            </div>
        </div>
    )
}

export default Videos;

