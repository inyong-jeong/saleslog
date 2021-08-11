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

export const postFindPassword = async (email) => {
  const response = await fetch(passQueryString(FIND_PASSWORD, { email: email }), { method: 'POST' });
  return response;
}

//RENEWAL

export const oauthAuthorize = async (username, password, client_id, redirect_uri, response_type, grant_type, state) => {

  let body = {
    'username': username,
    'password': password,
    'client_id': client_id,
    'redirect_uri': redirect_uri,
    'response_type': response_type,
    'grant_type': grant_type,
    'state': state
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
    }).then(response => response.json())
  return response;
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
    }).then(response => response.json())
  return response;
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
    }).then(response => response.json())
  return response;
}