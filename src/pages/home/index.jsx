import { useEffect, useState } from "react";
import * as styles from "./index.less";
import config from "../../util/config.js";
import ConfirmDialog from "../forsure/index.jsx";
import arrowurl from "./arrow.png"
import modeurl from "./mode.png"
export default function IndexPage() {
  let [footDirect, setFootDirect] = useState(false);
  let [grayWhich, setgrayWhich] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleNavigation = () => {
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    // 在这里添加跳转逻辑
    //console.log('Confirmed navigation');
    setDialogOpen(false);
    window.open("https://beian.miit.gov.cn/")
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  let About = function () {
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
        <header class="htile"></header>
        <nav class="htopic">
          <div>关于</div>
          <div></div>
        </nav>

        <ul class="contentmain listsabout">
          <li>
            <span>距今天：</span>
            <span id="update-infor-last"></span>
          </li>
          <li>
            <span>首次提交：</span>
            <span id="update-infor-start">2020年11月12日</span>
          </li>
          <li>
            <span>构建信息：</span>
            <span>
              <span class="ICP-number">{config.buildversion}</span>
            </span>
          </li>
        </ul>
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
        message="确定跳转到工信部网站吗？"
      />
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
        {grayWhich == 1 && <div class="contentmain">
          <ul class={styles.default.recentList}>
              <li>
                {/* <div
                  onClick={() => {
                    window.location.href = "./back/2024-06-17-update2020/index.html"
                  }}
                ><img src={arrowurl}></img></div> */}
                {/* <div>保持良好心态，调整状态</div> */}
      
              </li>
          </ul>
        </div>}
        {grayWhich == 2 && (
          <div class="contentmain">
            {/* 再出发2 */}
            <ul class={styles.default.archiveList}>
              <li>
                <div >旧版主页-2020网络GIS作业</div>
                <div
                  onClick={() => {
                    window.location.href = "./back/2024-06-17-update2020/index.html"
                  }}
                ><img src={arrowurl}></img></div>
              </li>
              {/* <li>
                <div >旧版主页-2020网络GIS作业</div>
                <div
                  onClick={() => {
                    window.location.href = "/back/2024-06-17-update2020/index.html"
                  }}
                ><img src={arrowurl}></img></div>
              </li>
              <li>
                <div >github的使用</div>
                <div
                  onClick={() => {
                    window.location.href = "/back/2024-06-17-update2020/index.html"
                  }}
                ><img src={arrowurl}></img></div>
              </li>
              <li>
                <div >2024年静态网站在国内两种常见的托管方案</div>
                <div
                  onClick={() => {
                    window.location.href = "/back/2024-06-17-update2020/index.html"
                  }}
                ><img src={arrowurl}></img></div>
              </li> */}
            </ul>
          </div>
        )}

        {footDirect && <About></About>}
      </div>

      <ul class="footer">
        <li class="ICP">
          <a
            // href="https://beian.miit.gov.cn/"
            onClick={handleNavigation}
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
