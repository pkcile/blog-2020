import React from 'react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <div style={styles.message}>{message}</div>
        <button onClick={onConfirm} style={{padding: '7px 13px', margin: '5px'}}>确认</button>
        <button onClick={onClose} style={{padding: '7px 13px', margin: '5px'}}>取消</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left:0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    zIndex: "99"
  },
  dialog: {
    width: '65%',
    height: '90px',
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '130px'
  },
  message: {
    margin: '9px 0'
  },
};

export default ConfirmDialog;