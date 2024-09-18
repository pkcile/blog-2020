import React, { useState, useEffect , useRef } from 'react';
import './index.less'; // 确保创建一个样式文件

const Notification = React.forwardRef(({ noticemessageobj={
    message: '默认消息',
    type: 'success',
    duration: 5000
  }, duration = 5000}, ref) => {
  // 代码实现部分
  const [isVisible, setIsVisible] = useState(false);

  React.useImperativeHandle(ref, () => ({
    callShowAlert: function() {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      clearTimeout(timer)
      // return () => clearTimeout(timer);
    }
  }));

  if (!isVisible) return null;

  return (
    <div className="notification" style={{
      backgroundColor: noticemessageobj?.type === 'success' ? '#52c41a' : '#f5222d',
      color: noticemessageobj?.type === 'success' ? '#fff' : '#fff',
    }}>
      <span>{noticemessageobj?.message}</span>
      <button onClick={() => setIsVisible(false)}>×</button>
    </div>
  );
});

export default Notification;