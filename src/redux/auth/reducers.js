// @flow
import {
  FIND_PASSWORD,
  FIND_PASSWORD_SUCCESS,
  FIND_PASSWORD_FAILED,
  POST_AUTHNUMBER,
  POST_AUTHNUMBER_SUCCESS,
  POST_AUTHNUMBER_ERROR,
  POST_REGISTRATION,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_ERROR,
  POST_WORKGROUP,
  POST_WORKGROUP_SUCCESS,
  POST_WORKGROUP_ERROR,
  POST_INVITE,
  POST_INVITE_SUCCESS,
  POST_INVITE_ERROR,
  OAUTH_AUTHORIZE,
  OAUTH_AUTHORIZE_SUCCESS,
  OAUTH_AUTHORIZE_ERROR,
  GET_OAUTH_TOKEN,
  GET_OAUTH_TOKEN_SUCCESS,
  GET_OAUTH_TOKEN_ERROR
} from 'constants/actionTypes';

let INIT_STATE = {
  authNumbercheck: false,
  email: null,
  postworkgroupResponse: null,
  postinviteResponse: null,
  authcodeResponse: null
};

const Auth = (state = INIT_STATE, action) => {
  switch (String(action.type)) {
    //RENEWAL
    case OAUTH_AUTHORIZE:
      return { ...state };
    case OAUTH_AUTHORIZE_SUCCESS:
      return { ...state, authcodeResponse: action.payload.response.message.code };
    case OAUTH_AUTHORIZE_ERROR:
      return { ...state, authcodeError: action.payload };
    case GET_OAUTH_TOKEN:
      return { ...state };
    case GET_OAUTH_TOKEN_SUCCESS:
      return { ...state, accesstokenResponse: action.payload.response.access_token };
    case GET_OAUTH_TOKEN_ERROR:
      return { ...state, authcodeError: action.payload };
    case POST_AUTHNUMBER:
      return { ...state };
    case POST_AUTHNUMBER_SUCCESS:
      return { ...state, authNumberResponse: action.payload.response.message };
    case POST_AUTHNUMBER_ERROR:
      return { ...state, authNumberError: action.payload.error };
    case POST_REGISTRATION:
      return { ...state, email: action.payload.useremail };
    case POST_REGISTRATION_SUCCESS:
      return { ...state };
    case POST_REGISTRATION_ERROR:
      return { ...state, error: action.payload };
    case POST_WORKGROUP:
      return { ...state, email: action.payload.useremail };
    case POST_WORKGROUP_SUCCESS:
      return { ...state, postworkgroupResponse: action.payload.response.message };
    case POST_WORKGROUP_ERROR:
      return { ...state, error: action.payload };
    case POST_INVITE:
      return { ...state };
    case POST_INVITE_SUCCESS:
      return { ...state, postinviteResponse: action.payload.response.message.state };
    case POST_INVITE_ERROR:
      return { ...state, error: action.payload };
    case FIND_PASSWORD:
      return { ...state };
    case FIND_PASSWORD_SUCCESS:
      return { ...state, findPasswordResponse: action.payload.response };
    case FIND_PASSWORD_FAILED:
      return { ...state, findPasswordError: action.payload.error };
    default: return { ...state };
  }
}

export default Auth;