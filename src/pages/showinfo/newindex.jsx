import { useEffect, useState } from "react";
import backurl from "./back.png";
let ClientInfo = function ({ setMapstatus, itemList, configInfor}) {
    let [gpuInfor, setGpuInfor] = useState("")
    useEffect(() => {

    }, []);
    return (
      <ul class={`main thirdpage`}>
        <header class="htile"></header>
        <nav class="htopic2">
          <div onClick={() => {
            setMapstatus(false);
          }}><img src={backurl} style={{position: "relative", top: "5px"}}></img></div>
          <div>{itemList.titleShort}</div>
        </nav>

        <ul class="contentmain listsabout">
        <li>
            <span>时间：</span>
            <span >{itemList.createDate}</span>
          </li>
          <li>
            <span>内容：</span>
            <span >{itemList.content}</span>
          </li>

        </ul>
      </ul>
    );
};

export default ClientInfo;