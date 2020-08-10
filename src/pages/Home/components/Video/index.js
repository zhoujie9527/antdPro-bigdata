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
            // playinit.src("./haha.mp4");
            playinit.src("https://vdept.bdstatic.com/757766753831534347486366464a317a/39646852346a524b/9cc622572892e0f703df4e9043e0d54bc0e624308bff8014d74c34531978e82e186ff2814bcea79150a71437acebc0e4.mp4?auth_key=1597075539-0-0-383f66ec6f05015f437690e7f8a8b48c");
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
            <video ref={ node => playRef = node } className="video-js"></video>
            </div>
        </div>
    )
}

export default Videos;

