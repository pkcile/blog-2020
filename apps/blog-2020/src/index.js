// import './style.css'
import './assets/index.css'
import './assets/reset.css'
// import { setupCounter } from './counter.js'

document.querySelector('#root').innerHTML = `
    <div class="main">
        <header class="htile">
            <!-- 王朋坤的网站 -->
        </header>
        <nav class="htopic">
            <div>
                最近的内容
            </div>
            <div>
               归档
            </div>
        </nav>
        <div class="contentmain">
            调研了一圈，决定先学习一下原生android开发
        </div>

        <ul id="about" class="main" >
            <header class="htile">
                <!-- 王朋坤的网站 -->
            </header>
            <nav class="htopic">
                <div>
                    关于
                </div>
                <div>
                    <!-- 归档 -->
                </div>
            </nav>

            <ul class="contentmain listsabout">
                <li>
                    <span>王朋坤</span>
                    <span>2018级地理信息科学</span>
                </li>
                <li>
                    <span>---</span>
                    <span><a href="https://blog.pkcile.cn/">个人博客</a></span>
                    <span>---</span>
                </li>
                <li>
                    <span>---</span>
                    <span><a href="https://pkcile.github.io/gradutation_pages/#/">打卡签到功能演示</a></span>
                    <span>---</span>
                </li>
                <li>
                    <span>页面初次提交时间:</span>
                    <span id="update-infor-start">2020-11-12</span>
                </li>
                <li>
                    <span>距今天:</span>
                    <span id="update-infor-last"></span>
                </li>
            </ul>

        </ul>

    </div>

    <ul class="footer">
        <li class="ICP">
            <a href="https://beian.miit.gov.cn/">
                <span class="ICP-title">备案号:</span>
                <span class="ICP-number">冀ICP备2020027680号-1</span>
            </a>
        </li>
        <li id="aboutControlFun">
            ...
        </li>
    </ul>

`;

//时间计算并显示
(function display() {
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth();
    var day = obj.getDate();
    var hour = obj.getHours();
    var minute = obj.getMinutes();
    var second = obj.getSeconds();
    var test = 1;
    month = month + 1;
    //获取起始时间结点
    var time_start = document.getElementById("update-infor-start");
    //获取计算天数结点
    var time_last = document.getElementById("update-infor-last");
    var arr_time = time_start.innerHTML.split('-');
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
// display();

document.getElementById("aboutControlFun").addEventListener("click", function() {
    var aboutcontent = document.getElementById("about");
    var status = window.getComputedStyle(aboutcontent)?.visibility;
    if (status != "hidden") {
        aboutcontent.style.visibility = "hidden";
    } else {
        aboutcontent.style.visibility = "visible";
    }
});
// import javascriptLogo from './javascript.svg'
// import webpackLogo from './webpack.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#root').innerHTML = `
//   <div>
//     <a href="https://www.webpackjs.com/" target="_blank">
//       <img src="${webpackLogo}" class="logo" alt="webpack logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Webpack + JS!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Webpack logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
