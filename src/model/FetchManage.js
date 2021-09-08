import { getOauthAccessToken } from 'helpers/authUtils'


//토큰 만료 확인

const check_fetch = async (url) => {
  const token = getOauthAccessToken();
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  const result = await response.json()
  const data = await result
  if (data.success !== true) {
    throw new Error(data.message)
  }
  return data
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
  if (data.status !== 200) {
    throw new Error(data.message)
  }
  return data
}


//post 
const post_fetch = async (url, body) => {
  const token = getOauthAccessToken();
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
  return data
}

//post - file
const post_fetch_files = async (url, data) => {
  const token = getOauthAccessToken();
  let formData = new FormData();
  for (let key in data) {
    if (key === 'fileup' || key === 'man_photo') {

      if (data[key] && data[key].length > 0) {
        for (let i = 0; i < data[key].length; i++) {
          // if (data[key].length === 0) {
          //   break;
          // }
          formData.append(key, data[key][i]);
        }
        console.log(formData)
      }
    } else {
      formData.append(key, data[key]);
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

export { post_fetch, get_fetch, post_fetch_files, check_fetch }