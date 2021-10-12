import { message, Modal } from 'antd';

const key = 'updatable'
export const loadingAndSuccessMessage = (msg) => {
  message.loading(
    {
      content: '로딩중...',
      key,
      style: {
        marginTop: 100,
      },
    }
  );
  setTimeout(() => {
    message.success({
      content: msg,
      key,
      duration: 2,
      style: {
        marginTop: 100,
      },
    });
  }, 1000);

}

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
