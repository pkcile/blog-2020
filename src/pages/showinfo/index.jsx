import React, { useEffect } from "react";
import style from "./index.less";
import backUrl from "./back2.png";
// 有性能问题
const Showinfo = ({ setMapstatus, itemList={title: "标题", content: "内容", createDate: "2023年5月15日"} }) => {

  useEffect(function () {}, []);
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 1,
        background: "#000",
      }}
      // id="mapleaflet"
    >

      <div
        class={style["top-update-location-2"]}
      >
        <div></div>
        <div
          className="updatelocation"
          onClick={() => {
            setMapstatus(false);
          }}
        >
          <img src={backUrl}></img>
        </div>
      </div>
      <div class={style["show-info-list"]}>
        <div class={style["article-summary"]}>
          <h2>{itemList.title}</h2>
          <div>
            <strong>更新时间：</strong>
            {itemList.createDate}
          </div>
          <div>
            <strong>内容概述：</strong>
            {itemList.content}
          </div>
        </div>

        {/* <div class="labels">
          <p>
            <strong>标签类别：</strong>
          </p>
          <span class="label">标签1：</span>
          <span class="label">标签2：</span>
        </div>

        <div class="jump-details">
          <p>
            <strong>跳转详情：</strong>
          </p>
          <a href="https://dwz.cn/o1ygrftD" class="jump-link" target="_blank">
            点击这里获取更多信息
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Showinfo;
