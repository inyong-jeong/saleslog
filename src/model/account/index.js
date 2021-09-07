// import { getAccessToken, getUserId, getOauthAccessToken } from 'helpers/authUtils';
// import { GET_USER_ACCOUNT } from '../base';
// import { fetchConfig, passArgs } from '../utils';

// export const getUserAccountsCall = async (id) => {
//   const response = await fetch(passArgs(GET_USER_ACCOUNT, id), fetchConfig("GET", null, getAccessToken(), getUserId()));
//   if (response.status !== 200) {
//     throw new Error();
//   }
//   const ret = await response.json();
//   return ret;
// }

// export const selectAccountCall = async () => {
//   const Token = getOauthAccessToken();
//   const response = await fetch('https://backend.saleslog.co/saleslog/sel_accounts',
//     {
//       method: 'POST',
//       headers: {
//         'Authorization': 'Bearer 4bc575e0807ba9b4191e8500b430981a377eb5d5'
//       }
//     })
//     .then(res => res.json())
//     .then(json => { return json })
//   return response;
// }

// export const selectAccountPersonCall = async (data) => {
//   const Token = getOauthAccessToken();
//   console.log('acc_idx', data)
//   let formBody = [];
//   for (let property in data) {
//     let encodedKey = encodeURIComponent(property)
//     let encodedValue = encodeURIComponent(data[property])
//     formBody.push(encodedKey + "=" + encodedValue)
//   }
//   formBody = formBody.join("&");
//   console.log(formBody);

//   // let formData = new FormData();
//   // for (let key in data) {
//   //   console.log(key, data[key]);
//   //   formData.append(key, data[key]);
//   // }
//   const response = await fetch('https://backend.saleslog.co/saleslog/sel_accounts_man',
//     {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Bearer 4bc575e0807ba9b4191e8500b430981a377eb5d5'
//       },
//       body: formBody
//     })
//     .then(res => res.json())
//     .then(json => { return json })
//   return response;
// }