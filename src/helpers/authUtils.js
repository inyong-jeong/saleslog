
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
  console.log('토큰저장  setOauthAccessToken:',token)
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
  console.log('인즈코드 여부 isUserAuthenticated:',userInfo);
  return (userInfo && userInfo !== 'undefined') ? true : false;
}

export const isUserAuthenticated = () => {
  let userInfo = localStorage.getItem('oauth-token');
  console.log('토큰 여부 isUserAuthenticated:',userInfo);
  return (userInfo && userInfo !== 'undefined') ? true : false;
}

export const removeAll = () => {
  console.log('토큰삭제 removeAll:')
  const items = ['oauth-refresh-token', 'auth-code', 'is_authenticateing', 'oauth-token'];
  items.map((item) => {    
    localStorage.removeItem(item);
    //return 0;
  })
  return 0;
}