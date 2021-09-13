import { message } from 'antd';

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