import { message, Modal } from 'antd';
import history from './history';


export const loadingAndSuccessMessage = (msg) => {
  message.loading('잠시만 기다려주세요...', 2.5)
    .then(() => message.success(msg, 0.8))

}

export const loadingMessage = () => {
  const hide = message.loading('잠시만 기다려주세요...', 0);
  // Dismiss manually and asynchronously
  setTimeout(hide, 2500);
};

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
