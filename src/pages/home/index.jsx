import { useEffect, useState } from "react";
import * as styles from "./index.less";
import configInfor from "../../util/config.js";
import ConfirmDialog from "../forsure/index.jsx";
import arrowurl from "./arrow.png";
import aboutinformation from "./aboutinformation.png";
import backurl from "./back.png";
import Showinfo from "../showinfo/newindex.jsx";
export default function IndexPage() {
  let [footDirect, setFootDirect] = useState(false);
  let [grayWhich, setgrayWhich] = useState(2);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  let [mapstatus, setMapstatus] = useState(false);
  let [messageUrl, setMessageUrl] = useState('');
  let [itemList, setItemList] = useState()
  console.log(configInfor)
  const handleNavigation = () => {
    setDialogOpen(true);
    setMessage("确定跳转到工信部网站吗？");
    setMessageUrl("https://beian.miit.gov.cn/")
  };

  const handleConfirm = () => {
    setDialogOpen(false);
    window.open(messageUrl);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  let About = function () {
    let [aboutbuildinfor, setAboutbuildinfo] = useState("hidden");
    let [clientinfor, setClientinfor] = useState("hidden");
    useEffect(() => {
      //时间计算并显示
      (function display() {
        var obj = new Date();
        var year = obj.getFullYear();
        var month = obj.getMonth();
        var day = obj.getDate();
        month = month + 1;
        //获取起始时间结点
        //var time_start = document.getElementById("update-infor-start");
        //获取计算天数结点
        var time_last = document.getElementById("update-infor-last");
        // var arr_time = time_start.innerHTML.split('-');
        var arr_time = [2020, 11, 12];
        2020 - 11 - 12;
        // 2019 9 12
        // 2020 8 10
        //粗略估计时间，以后精准估计，月差按30
        //天数判断
        if (arr_time[2] > day) {
          month = month - 1;
          day = day + 30 - arr_time[2];
        } else {
          day = day - arr_time[2];
        }
        //月份判断
        if (arr_time[1] > month) {
          year = year - 1;
          month = month + 12 - arr_time[1];
        } else {
          month = month - arr_time[1];
        }
        //年份判断
        year = year - arr_time[0];
        console.log(day);
        //写入span标签
        time_last.innerHTML = "" + year + "年" + month + "月" + day + "天";
      })();
    }, []);
    return (
      <ul id="about" class="main secondpage">
        <AboutBuild 
            visibility={aboutbuildinfor}
            configInfor={configInfor}
            setVisibility={setAboutbuildinfo}
        ></AboutBuild>
        <ClientInfo 
            visibility={clientinfor}
            configInfor={configInfor}
            setVisibility={setClientinfor}
        ></ClientInfo>
        <header class="htile"></header>
        <nav class="htopic">
          <div>关于</div>
          <div></div>
        </nav>

        <ul class="contentmain listsabout">
          <li>
            <span>首次提交：</span>
            <span id="update-infor-start">2020年11月12日</span>
          </li>
          <li>
            <span>距今天有：</span>
            <span id="update-infor-last"></span>
          </li>
          <li style={{cursor: "pointer"}} onClick={() => {
            setAboutbuildinfo("visibility")
          }}>
            <span>构建信息：</span>
            <img src={aboutinformation} height={18} width={18} style={{position: "relative", top: "4px", left: "0px", borderBottom: "1px solid #fff"}}></img>
          </li>
          <li style={{cursor: "pointer"}} onClick={() => {
            setClientinfor("visibility")
          }}>
            <span>客户端信息：</span>
            <span style={{borderBottom: "1px solid #000"}}>当前设备状态</span>
          </li>
        </ul>
      </ul>
    );
  };

  let AboutBuild = function ({ visibility, setVisibility, configInfor}) {
    useEffect(() => {
    }, []);
    return (
      <ul class={`main thirdpage ${
          visibility == "hidden" ? styles.default.visibilityHidden : ""
        }`}>
        <header class="htile"></header>
        <nav class="htopic2">
          <div onClick={()=> {
            setVisibility("hidden")
          }}><img src={backurl} style={{position: "relative", top: "5px"}}></img></div>
          <div>构建信息</div>
        </nav>

        <ul class="listsabout">
          <li>
            <span>构建时间：</span>
            <span>{configInfor.buildversion}</span>
          </li>
          <li>
            <span>构建机器：</span>
            <span>{configInfor.buildInfo}</span>
          </li>
          {/* <li>
            <span>标签版本：</span>
            <span>{configInfor.buildInfo}</span>
          </li> */}
          {/* <li>
            <span>提交用户：</span>
            <span>{configInfor.buildInfo}</span>
          </li> */}
          {/* <li>
            <span>提交统计：</span>
            <span>{configInfor.buildInfo}</span>
          </li> */}
          {/* <li>
            <span>Node版本：</span>
            <span></span>
          </li> */}
        </ul>
      </ul>
    );
  };

  
  let ClientInfo = function ({ visibility, setVisibility, configInfor}) {
    let [gpuInfor, setGpuInfor] = useState("")
    useEffect(() => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          setGpuInfor(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
        }
      }
    }, []);
    return (
      <ul class={`main thirdpage ${
          visibility == "hidden" ? styles.default.visibilityHidden : ""
        }`}>
        <header class="htile"></header>
        <nav class="htopic2">
          <div onClick={()=> {
            setVisibility("hidden")
          }}><img src={backurl} style={{position: "relative", top: "5px"}}></img></div>
          <div>客户端信息</div>
        </nav>

        <ul class="contentmain listsabout">
        <li>
            <span>GPU信息：</span>
            <span >{gpuInfor}</span>
          </li>
          <li>
            <span>浏览器版本：</span>
            <span >{navigator.userAgent.toLowerCase()}</span>
          </li>

        </ul>
      </ul>
    );
  };

  let AchiveList = function ({ visibility, datalists }) {
    let DateList = ArchiveDatalist.map((item) => {
      if(item.jumptIf) {
        return (
          <li
            onClick={() => {
              setDialogOpen(true);
              setMessage("确定跳转到" + item.title + (item.remind ? ("," + item.remind) : ""));
              setMessageUrl(item.jumptUrl)
            }}
          >
            <div>{item.title}</div>
            <div>
              <img src={arrowurl} width={"15px"}></img>
            </div>
            <div>{item.createDate}</div>
            <a href={item.jumptUrl}></a>
          </li>
        );
      } else {
        if(item.content) {

        } else {
          return (
            <li
              onClick={() => {
                window.location.href = item.jumptUrl;
              }}
            >
              <div>{item.title}</div>
              <div>
                <img src={arrowurl} width={"20px"}></img>
              </div>
              <div>{item.createDate}</div>
            </li>
          );
        }
      }
 
    });

    useEffect(() => {}, []);
    return (
      <ul
        class={` ${styles.default.archiveList} ${
          visibility == "hidden" ? styles.default.visibilityHidden : ""
        }`}
      >
        {DateList}
      </ul>
    );
  };

  let RecentList = function ({ visibility, datalists=[] }) {
    let DateList = datalists.map((item, key) => {
      if(item.jumptIf) {
        return (
          <li
            onClick={() => {
              setDialogOpen(true);
              setMessage("确定跳转到" + item.title + (item.remind ? ("," + item.remind) : ""))
              setMessageUrl(item.jumptUrl)
            }}
          >
            {/* <div>{key + 1}、</div> */}
            <div>{item.title}</div>
          </li>
        );
      } else {
        if(item.content) {
          return (
            <li
              onClick={() => {
                setMapstatus(true)
                console.log(item)
                setItemList(item)
              }}
            >
              {/* <div>{key + 1}、</div> */}
              <div>{item.title}</div>
            </li>
          );
        } else {
          return (
            <li
              // onClick={() => {
              //   window.location.href = item.jumptUrl;
              // }}
            >
              <div>{item.title}</div>
            </li>
          );
        }
      }
 
    });

    useEffect(() => {}, []);
    return (
      <ul
        class={` ${styles.default.recentList} ${
          visibility == "hidden" ? styles.default.visibilityHidden : ""
        }`}
      >
        {DateList}
      </ul>
    );
  };

  useEffect(function () {}, []);

  return (
    <div class="winform">
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message={message}
      />
      {mapstatus && <Showinfo setMapstatus={setMapstatus} itemList={itemList}></Showinfo>}
      <div class="main">
        <header class="htile"></header>
        <nav class="htopic">
          <div
            class={grayWhich != 1 ? styles.default.titleGrey : ""}
            onClick={() => {
              setgrayWhich(1);
            }}
            
          >
            最近的内容
          </div>
          <div
            class={grayWhich != 2 ? styles.default.titleGrey : ""}
            onClick={() => {
              setgrayWhich(2);
            }}
          >
            归档
          </div>
        </nav>
          <div class="contentmain">
            {grayWhich == "1" && <RecentList 
              // visibility={`${ grayWhich == "2" ? "hidden" : ""}`}
              visibility={""}
              datalists={RecentDatalist}
            ></RecentList> }
            <AchiveList visibility={`${ grayWhich == "1" ? "hidden" : ""}`}></AchiveList>
          </div>
        {footDirect && <About></About>}
      </div>

      <ul class="footer">
        <li class="ICP">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            // onClick={handleNavigation}
          >
            <>
              <span class="ICP-title">备案号：</span>
              <span class="ICP-number">冀ICP备2020027680号-1</span>
            </>
          </a>
        </li>
        <li
          onClick={() => {
            setFootDirect(!footDirect);
          }}
        >
          ...
        </li>
      </ul>
    </div>
  );
}
