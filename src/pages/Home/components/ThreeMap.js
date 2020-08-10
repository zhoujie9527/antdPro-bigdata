import React, {useEffect} from "react";
import { coloredData, countryData, groupData, sampleData} from "./mapDatas.js";

// const inputData = {
//     "dataSetKeys": ["test1", "test2"],
//     "initDataSet": "test1",
//     "test1": [{e: "CN", i: "North America", v: 2000}],
//     "test2": [{e: "CN", i: "RU", v: 3000000}]
// };
// const inputData = [
//     {e: "CN", i: "Europe", v: 3000000},
//     {e: "CN", i: "North America", v: 3000000},
//     {e: "CN", i: "RU", v: 3000000}
// ];

let inputData = [];

const ThreeMap = () => {
    
    useEffect(()=>{
        mapInit();
    },[]);

    function mapInit() {
        inputData = sampleData;
        const container = document.getElementById( "globalArea" );
        const controller = new GIO.Controller( container );
        controller.addData(inputData);
        controller.configure({
            color: {
                background: "#010121"
            }
        });
        controller.init();
      
    }

    return (
        <div id="globalArea" style={{ height: "89%", margin: "0px 3% 0px 3%" }}/>
    )
}

export default ThreeMap;