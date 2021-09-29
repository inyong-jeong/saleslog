import { message, Modal } from 'antd';
import history from './history';
export const successMessage = (msg) => {
  message.success({
    content: msg,
    duration: 0.8,
    style: {
      marginTop: '100px',
    },
  });
}

export const errorMessage = (msg) => {
  message.error({
    content: msg,
    duration: 0.8,
    style: {
      marginTop: '100px',
    },
  });
}

export const alertMessage = (msg) => {
  Modal.info({
    content: msg,
    onOk() { },
  })
}

export const base64Enc = (str) => {
  return window.btoa(encodeURIComponent(str));
}

export const base64Dec = (str) => {
  return decodeURIComponent(window.atob(str));
}
