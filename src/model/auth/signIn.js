import { passQueryString } from '../utils';
import { OAUTH_AUTHENTICATE, FIND_PASSWORD } from '../endPoint';

export const oauthAuthenticate = async (email, password, redirectUri, clientType, state, expires, responseType) => {
  let body = {
    'email': email,
    'password': password
  };

  const response = await fetch(passQueryString(OAUTH_AUTHENTICATE, { expires: expires, redirect_uri: redirectUri, client_type: clientType, state: state, response_type: responseType }),
    { method: 'POST', body: JSON.stringify(body) });
  return response;
}

// export const postFindPassword = async (email) => {
//   const response = await fetch('https://auth.theklab.co/login/find_pw', { email: email }, { method: 'POST' });
//   return response;
// }

//RENEWAL

export const oauthAuthorize = async (username, password, client_id, redirect_uri, response_type, grant_type, state, scope) => {

  let body = {
    'username': username,
    'password': password,
    'client_id': client_id,
    'redirect_uri': redirect_uri,
    'response_type': response_type,
    'grant_type': grant_type,
    'state': state,
    'scope': scope
  };

  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const response = await fetch(('https://auth.theklab.co/oauth/authorize'),
    {
      method: 'POST', body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
      }
    })
    const result = await response.json()
    const data = await result
  return data;
}

export const oauthgetaccesstoken = async (code, client_secret, client_id, grant_type) => {

  let body = {
    'code': code,
    'client_secret': client_secret,
    'client_id': client_id,
    'grant_type': grant_type,
  };

  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const response = await fetch(('https://auth.theklab.co/oauth/token'),
    {
      method: 'POST', body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
      }
    })
    const result = await response.json()
    const data = await result
  return data;
}


export const oauthgetrefreshaccesstoken = async (refresh_token, client_id, client_secret, grant_type) => {

  let body = {
    'refresh_token': refresh_token,
    'client_id': client_id,
    'client_secret': client_secret,
    'grant_type': grant_type,
  };

  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const response = await fetch(('https://auth.theklab.co/oauth/token'),
    {
      method: 'POST', body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
      }
    })
    const result = await response.json()
    const data = await result
  return data;
  
}

export const postFindPassword = async (email) => {

  let body = {
    'user_email': email
  };

  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const response = await fetch(('https://auth.theklab.co/login/find_pw'),
    {
      method: 'POST', body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
      }
    })
    const result = await response.json()
    const data = await result
  return data;
}

export const postChangePassword = async (code, email, password) => {
  console.log(code)

  let body = {
    'user_email': email,
    'code': code,
    'new_password': password
  };

  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const response = await fetch(('https://auth.theklab.co/login/change_pw'),
    {
      method: 'POST', body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
      }
    })    
    const result = await response.json()
    const data = await result
  return data;
}

export const postAuthorizationNumber = async (email) => {

  let body = {
    'user_email': email
  };

  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const response = await fetch(('https://auth.theklab.co/login/cert_mail'),
    {
      method: 'POST', body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
      }
    })
    const result = await response.json()
    const data = await result
  return data;
}

export const postClientRegisteration = async (useremail, password, user_name) => {

  let body = {
    'user_email': useremail,
    'user_password': password,
    'user_name': user_name,
  };

  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const response = await fetch(('https://auth.theklab.co/login/regi_user'),
    {
      method: 'POST', body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
      }
    })
    const result = await response.json()
    const data = await result
  return data;
}

export const postInviteEmail = async (login_id, invite_email, permission) => {

  let body = {
    'login_id': login_id,
    'invite_email': invite_email,
    'permission': permission,
  };

  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const response = await fetch(('https://auth.theklab.co/login/invite_user'),
    {
      method: 'POST', body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
      }
    })
    const result = await response.json()
    const data = await result
  return data;
}

export const postInviteRegister = async (user_email, invite_code, user_name, user_password, use_name) => {

  let body = {
    'user_email': user_email,
    'invite_code': invite_code,
    'user_name': user_name,
    'user_password': user_password,
    'use_name': use_name
  };

  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const response = await fetch(('https://auth.theklab.co/login/regi_user_invite'),
    {
      method: 'POST', body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
      }
    })
    const result = await response.json()
    const data = await result
  return data;
}

export const postWorkGroupmodel = async (user_email, comp_name, comp_domain) => {

  let body = {
    'user_email': user_email,
    'comp_name': comp_name,
    'comp_domain': comp_domain,
  };

  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const response = await fetch(('https://auth.theklab.co/login/regi_wgroup'),
    {
      method: 'POST', body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
      }
    })
    const result = await response.json()
    const data = await result
  return data;
}