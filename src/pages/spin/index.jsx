import React from 'react';
// 有性能问题
const Spin = ({ size = 40, color = '#1890ff', displayitem ='none' }) => {
  const spinStyle = {
    display: 'inline-block',
    width: `${size}px`,
    height: `${size}px`,
    border: `4px solid ${color}`,
    borderTopColor: 'transparent',
    borderRadius: '50%',
    zIndex: '999',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={{ display: displayitem, justifyContent: 'center', alignItems: 'center', position: 'absolute',width:'100%', height: '100%' }}>
      <div style={spinStyle} />
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Spin;