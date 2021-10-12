import { message, Modal } from 'antd';

const key = 'loading'
export const loadingMessage = () => {
  message.loading(
    {
      content: '로딩중...',
      key,
      style: {
        marginTop: 100,
      },
    }
  );

}

export const hideMessage = () => {
  const hide = message.loading(
    {
      content: '로딩중...',
      key,
      style: {
        marginTop: 100,
      },
    }
  );
  hide()
}


export const successMessage = (msg) => {
  message.success({
    content: msg,
    duration: 0.8,
    style: {
      marginTop: 100,
    },
  });
}

export const errorMessage = (msg) => {
  message.error({
    content: msg,
    duration: 0.8,
    style: {
      marginTop: 100,
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
