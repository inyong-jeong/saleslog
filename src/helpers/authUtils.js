import cmm from 'constants/common';
import { check_token_fetch } from 'model/FetchManage'
import { oauthgetrefreshaccesstoken } from 'model/auth'

// export const isUserAuthenticated = () => {
//   let userInfo = localStorage.getItem('tk-sso-token');
//   return userInfo ? true : false;
// }

export const isUserAuthenticating = () => {
  let userInfo = localStorage.getItem('is_authenticateing');
  return userInfo;
}

export const setUserAuthenticating = (state) => {
  localStorage.setItem('is_authenticateing', state);
}

export const getAuthCode = () => {
  return localStorage.getItem('tk-sso-auth-code');
}

export const setAuthCode = (authCode) => {
  localStorage.setItem('tk-sso-auth-code', authCode);
}

export const setPCKE = (pcke) => {
  localStorage.setItem('pcke', pcke);
}

export const getPCKE = () => {
  return localStorage.getItem('pcke');
}

export const getAccessToken = () => {
  return localStorage.getItem('tk-sso-token');
}

export const setAccessToken = (token) => {
  localStorage.setItem('tk-sso-token', token);
}

export const removeAccessToken = () => {
  localStorage.removeItem('tk-sso-token');
}

export const getRefreshToken = () => {
  return localStorage.getItem('tk-sso-refresh-token');
}

export const setRefreshToken = (token) => {
  localStorage.setItem('tk-sso-refresh-token', token);
}

export const setUserId = (userId) => {
  localStorage.setItem('user_id', userId);
}

export const getUserId = () => {
  return localStorage.getItem('user_id');
}

export const removeUserId = () => {
  localStorage.removeItem('user_id');
}

export const Info = () => {
  const items = ['user_id', 'tk-sso-refresh-token', 'tk-sso-token', 'pcke', 'is_authenticateing'];
  items.map((item) => {
    localStorage.removeItem(item);
    return 0;
  });
}

// export const setAccessToken = (token) => {
//   let iframe = document.createElement('iframe');
//   iframe.id = "sso";
//   iframe.style.display = "none";
//   iframe.src = "https://sso.theklab.co";
//   document.body.append(iframe);
//   iframe.contentWindow.addEventListener('message', function(token) {
//     console.log(`toekn from parent: ${token}`);
//   });
//   iframe.contentWindow.postMessage(token);
// }

const toHex = (buffer) => {
  return buffer.map(b => b.toString(16).padStart(2, '0')).join('')
}

const getRandomNumbers = () => {
  var array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return toHex(Array.from(array));
}

export const getRandomSHA256 = async () => {
  const array = new Uint32Array(2);
  const randBuf = window.crypto.getRandomValues(array);
  const crypto = window.crypto || window.msCrypto;
  const hash = await crypto.subtle.digest('SHA-256', randBuf);
  return toHex(Array.from(new Uint8Array(hash)));
}

export const saveSSOSession = () => {
  const state = getRandomNumbers();
  sessionStorage.setItem('state', state);
  return state;
}

export const validateSSOSession = (state) => {

}

//RENEWAL 

export const getOauthCode = () => {
  return localStorage.getItem('auth-code');
}

export const setOauthCode = (authCode) => {
  localStorage.setItem('auth-code', authCode);
}

export const getOauthAccessToken = () => {
  return localStorage.getItem('oauth-token');
}

export const setOauthAccessToken = (token) => {
  //console.log('토큰저장  setOauthAccessToken:',token)
  localStorage.setItem('oauth-token', token);
}

export const getOauthRefreshToken = () => {
  return localStorage.getItem('oauth-refresh-token');
}

export const setOauthRefreshToken = (token) => {
  localStorage.setItem('oauth-refresh-token', token);
}

export const isUserAuthorized = () => {
  let userInfo = localStorage.getItem('auth-code');
  //console.log('인증코드 여부 isUserAuthorized:',userInfo);
  return (userInfo && userInfo !== 'undefined') ? true : false;
}
export const getpersist = () => {
  const persist = localStorage.getItem('persist:root');
  return { persist: persist };

}
// 사용자정보 
export const getUserInfo = () => {
  const permission = localStorage.getItem('user-permission');
  const userName = localStorage.getItem('user-name');
  const wgroupName = localStorage.getItem('user-wgroup-name');
  return { permission: permission, userName: userName, wgroupName: wgroupName };
}
// 사용자정보 저장
export const setUserInfo = (data) => {
  //console.log('setUserInfo:::::', data)
  localStorage.setItem('user-permission', data.permissions);
  localStorage.setItem('user-name', data.user_name);
  localStorage.setItem('user-wgroup-name', data.wgroupName);
}

//Access Token 확인 (routes.js 에서 호출, 반환값:'NoToken', 'OkToke', 'ReToke' )
export const isAccessToken = async () => {
  let token = localStorage.getItem('oauth-token');

  //console.log('토큰 여부 isUserAuthenticated:a★:::',token);

  // 엑세스 토큰이 없는 경우 
  if (token == null || token == '' || token == 'undefined') {
    return 'NoToken';
  }

  //console.log('isUserAuthticated::: 엑세스 토큰 체크시작...');
  //token = 'asdlasdkfjiefkdjifej' //test
  // 엑세스 토큰이 만료 체크 
  const res = await check_token_fetch(cmm.SERVER_API_URL + '/secure', token)

  //console.log('isUserAuthticated::: 엑세스 토큰 체크완료...',await res);
  const result = await res;

  if (!await result) {
    return null;
  }

  if (await result.success) {
    //console.log('result::::::::::::::::',result);
    if (await result.message.org_idx == '') {
      //워크그룹이 없는 경우
      return 'NoWorkgroup';
    } else {
      return 'OkToken';
    }

  } else if (await result.message == '토큰만료') {
    // 엑세스 토큰 재발행(refresh token)
    const reToken = localStorage.getItem('oauth-refresh-token');
    //console.log('reToken:::',reToken);

    if (reToken == null || reToken == '' || reToken == 'undefined') {
      return 'NoToken';
    }

    const reRes = await oauthgetrefreshaccesstoken(reToken, cmm.CLIENT_ID, cmm.CLIENT_SECRET, 'refresh_token')
    const reResult = await reRes;
    //console.log('리프래시 토큰 재발행 :::', await reRes);
    if (reResult.error == 'invalid_grant') {
      //console.log('false:::::::::::::::::::::')

      return 'NoToken';
    } else {
      //console.log('true:::::::::::::::::::::')
      setOauthAccessToken(reResult.access_token);
      setOauthRefreshToken(reResult.refresh_token);
      return 'ReToken';
    }

  } else if (await result.message.auth_ok == true && await result.message.org_idx == '') {
    //워크그룹이 없는 경우
    return 'NoWorkgroup';

  }
  //return (token && token !== 'undefined') ? true : false;

  //});
  // console.log('check')
  // // refresh 토큰으로 다시 받음
  // const reToken = await getOauthRefreshToken();
  // if (reToken == null || reToken == '' || reToken == 'undefined' ){
  //   return false;
  // } 

  // await oauthgetrefreshaccesstoken(reToken, cmm.CLIENT_ID, cmm.CLIENT_SECRET, 'refresh_token')
  // .then(res => {
  //   console.log('리프래시 토큰 ::: ', res)
  // })


  //console.log(cmm.FILE_PATH_FILES)

  // refresh 토큰이 만료 인경우 로그인으로 





}



//storage 토큰 확인
export const isUserAuthenticated = () => {
  let token = localStorage.getItem('oauth-token');

  // 엑세스 토큰이 없는 경우 
  if (token == null || token == '' || token == 'undefined') {
    return false;
  }

  return (token && token !== 'undefined') ? true : false;

}

export const removeAll = () => {
  const items = ['oauth-refresh-token', 'auth-code', 'is_authenticateing', 'oauth-token'];
  items.map((item) => {
    localStorage.removeItem(item);
    //return 0;
  })
  return 0;
}