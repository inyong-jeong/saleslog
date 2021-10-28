import { message, Modal } from 'antd';
import { useEffect } from 'react'
import { useLocation } from 'react-router';


export const useScrollToTop = () => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location])
}


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
  hide();

}


export const successMessage = (msg) => {
  setTimeout(() => {
    message.success({
      content: msg,
      key,
      duration: 1.5,
      style: {
        marginTop: 100,
      }
    }, 1000)

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

export const ConvertDate = (date) => {
  const result = date.replaceAll('-', '.');
  return result;
}


