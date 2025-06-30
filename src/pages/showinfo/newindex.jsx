import { useEffect, useState } from "react";
import backurl from "./back.png";
import ConfirmDialog from "../forsure/index.jsx";
let ClientInfo = function ({ setMapstatus, itemList }) {
  const [message, setMessage] = useState("");
  let [messageUrl, setMessageUrl] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {}, []);
  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleConfirm = () => {
    setDialogOpen(false);
    window.open(messageUrl);
  };
  console.log(itemList)
  return (
    <ul class={`main thirdpage`}>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message={message}
      />
      <header class="htile"></header>
      <nav class="htopic2">
        <div
          onClick={() => {
            setMapstatus(false);
          }}
        >
          <img src={backurl} style={{ position: "relative", top: "5px" }}></img>
        </div>
        <div>{itemList.titleShort}</div>
      </nav>

      <ul class="contentmain listsabout">
        <li>
          <span>时间：</span>
          <span>{itemList.createDate}</span>
        </li>
        {itemList.jumptUrl && (
          <li
            onClick={() => {
              setDialogOpen(true);
              setMessage(itemList.jumptInfor);
              setMessageUrl(itemList.jumptUrl);
            }}
            style={{ cursor: "pointer" }}
          >
            <span>内容：</span>
            <span>{itemList.content}</span>
          </li>
        )}
        {!itemList.jumptUrl && (
          <li>
            <span>内容：</span>
            <span>{itemList.content}</span>
          </li>
        )}
      </ul>
    </ul>
  );
};

export default ClientInfo;
