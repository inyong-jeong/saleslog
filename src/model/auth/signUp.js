import { passQueryString } from '../utils';
import { SIGNUP_USER, CHECK_EMAIL } from '../endPoint';

export const postSignUpUser = async (userType, body) => {
  console.log(userType, body); 
  const response = await fetch(SIGNUP_USER + `?userType=${userType}`, 
    {method: 'POST', body: JSON.stringify(body)});
  return response;
}

export const getCheckEmail = async (email) => {
  const response = await fetch(CHECK_EMAIL + `?email=${email}`);
  return response;
}