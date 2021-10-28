import { getOauthAccessToken, getOauthRefreshToken, removeAll } from 'helpers/authUtils'
import cmm from 'constants/common';
import FileSaver from 'file-saver';
import moment from 'moment';

//토큰 만료 확인 (authUtil 에서 호출)
const check_token_fetch = async (url, token) => {
  try {
    //엑세스 토큰 만료 확인 
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const result = await response.json()
    const data = await result

    // if (data.success !== true) {
    //   //throw new Error(data.message)
    // }

    return await data
  } catch (error) {
    return null;
    //throw new Error(error)
  }
}




//토큰 만료 확인
const check_fetch = async (url) => {
  const token = await getOauthAccessToken();
  const reToken = await getOauthRefreshToken();

  //access / refresh 토큰중 하나라도 없으면 로그인으로 이동
  if (token.toString() == 'undefined' || reToken.toString() == 'undefined') {
    throw new Error('noToken')
  }

  //엑세스 토큰 만료 확인 
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  const result = await response.json()
  const data = await result

  if (await data.success !== true) {
    throw new Error(await data.message)
  }

  return await data
}


//get 
const get_fetch = async (url) => {
  const token = getOauthAccessToken();
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    }
  })
  const result = await response.json()
  const data = await result
  if (await data.status !== 200) {
    throw new Error(await data.message)
  }
  return await data
}


//post 
const post_fetch = async (url, body) => {
  const token = getOauthAccessToken();

  //console.log('post_fetch:::',url, body)
  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property)
    let encodedValue = encodeURIComponent(body[property])
    formBody.push(encodedKey + "=" + encodedValue)
  }
  formBody = formBody.join("&");

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    },
    body: formBody
  })

  const result = await response.json()
  const data = await result
  if (data.status !== 200) {
    throw new Error(data.message)
  }
  return await data
}

//post - no token
const post_fetch_no_token = async (url, body) => {

  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property)
    let encodedValue = encodeURIComponent(body[property])
    formBody.push(encodedKey + "=" + encodedValue)
  }
  formBody = formBody.join("&");


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    body: formBody
  })
  const result = await response.json()
  const data = await result
  if (await data.status !== 200) {
    throw new Error(await data.message)
  }

  return await data
}


//post - file
const post_fetch_files = async (url, data) => {

  const token = getOauthAccessToken();
  let formData = new FormData();
  // console.log('data:::::::::::::', data)
  for (let key in data) {
    if (key === 'fileup' || key === 'man_photo') {
      // console.log('fileup:: key:::::::::::::::', key, data[key], data[key].length)
      if (data[key] && data[key].length > 0) {
        for (let i = 0; i < data[key].length; i++) {
          // if (data[key].length === 0) {
          //   break;
          // }
          formData.append(key, data[key][i]);
        }
        // console.log('fileup::::::::::::::::::::::::::::::', formData)
      }
    } else {
      formData.append(key, data[key]);
      // console.log('fffffffffffffff', formData);
    }
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      return json
    })

  if (response.status !== 200) {
    throw new Error(response.message)
  }
  return response
}


//post file download
const post_fetch_download = async (url, body) => {
  const token = getOauthAccessToken();
  console.log('webview::::::::::::::', cmm.getWebview());
  console.log('post_fetch:::', url, body)
  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property)
    let encodedValue = encodeURIComponent(body[property])
    formBody.push(encodedKey + "=" + encodedValue)
  }
  formBody = formBody.join("&");

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    },
    body: formBody,
    responseType: 'blob'
  })
  let result = await response

  if (cmm.getWebview() == 'web') {

    const dt = moment().format('YYYYMMDD')
    var data = await response.blob();
    //console.log('csvURL:::',data.message);
    var csvURL = window.URL.createObjectURL(data); //'https://backend.saleslog.co/files/tmpfiles/166d32f1e6ce497556181b66eee980a2cadd0928.xlsx');// + data.message);
    //console.log('csvURL:::',window.URL.createObjectURL(response.blob()));
    var tempLink = document.createElement('a');
    tempLink.href = csvURL; // 'https://backend.saleslog.co/files/tmpfiles/166d32f1e6ce497556181b66eee980a2cadd0928.xlsx';//csvURL;


    tempLink.setAttribute('download', 'saleslog_' + dt + '.xlsx');
    document.body.appendChild(tempLink);
    tempLink.setAttribute("target", '_blank');
    tempLink.click();
    //return;
  } else {

    console.log('result:::', result)
    window.ReactNativeWebView.postMessage(result.url)
    return result;

  }

  const dt = moment().format('YYYYMMDD')
  FileSaver.saveAs(await response.blob(), '세일즈로그_실적다운로드_' + dt + '.xlsx');
  //const result = await response.blob();

  //console.log('result:::',url, result)
  return true;
  // if (data.status !== 200) {
  //   throw new Error(data.message)
  // }





  //await console.log('result::::::::::::::', data)

  // return data ;
  // if (result.status !== 200) {
  //   throw new Error(result.message)
  // }


  // let a = document.createElement("a");
  // a.href = dataurl;
  // a.setAttribute("download", filename);
  // a.setAttribute("target", '_blank');
  // a.click();

  //return result;

  //FileSaver.saveAs(await response.blob(), '세일즈로그_실적다운로드_'+dt+'.xlsx');
  //window.saveAs(await response.blob(), '세일즈로그_실적다운로드_'+dt+'.xlsx');
  // //const result = await response.blob();

  // //console.log('result:::',url, result)
  // return true;
  // // if (data.status !== 200) {
  // //   throw new Error(data.message)
  // // }

  // // return data
}

export { post_fetch, get_fetch, post_fetch_files, check_fetch, check_token_fetch, post_fetch_no_token, post_fetch_download }