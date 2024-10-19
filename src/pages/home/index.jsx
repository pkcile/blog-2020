import { useEffect, useState } from "react";
import "./index.less";
import config from "../../util/config";
export default function IndexPage() {
  let [footDirect, setFootDirect] = useState(false);
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
        var arr_time = [2020, 11, 12]
        2020-11-12
        // 2019 9 12
        // 2020 8 10
        //粗略估计时间，以后精准估计，月差按30
        //天数判断
        console.log(day);
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
        time_last.innerHTML = year + "年" + month + "月" + day + "天";
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
            <span>王朋坤</span>
            <span>
              <a href="https://blog.pkcile.cn/">&nbsp;个人博客</a>
            </span>
          </li>
          <li>
            <span>页面初次提交时间：</span>
            <span id="update-infor-start">2020年11月12日</span>
          </li>
          <li>
            <span>距今天：</span>
            <span id="update-infor-last"></span>
          </li>
          <li>
            <span>构建信息：</span>
            <span id="update-infor-last">
              <span class="ICP-number">{config.buildversion}</span>
            </span>
          </li>
        </ul>
      </ul>
    );
  };
  useEffect(function () {
  }, []);

  return (
    <div class="winform">
      <div class="main">
        <header class="htile"></header>
        <nav class="htopic">
          <div>最近的内容</div>
          <div></div>
        </nav>
        <div class="contentmain"></div>

        {footDirect && <About></About>}
      </div>

      <ul class="footer">
        <li class="ICP">
          <a href="https://beian.miit.gov.cn/">
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
