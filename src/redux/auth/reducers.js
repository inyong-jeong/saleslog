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
  GET_OAUTH_TOKEN_ERROR,
  CHECK_ACCESS_TOKEN,
  CHECK_ACCESS_TOKEN_SUCCESS,
  CHECK_ACCESS_TOKEN_ERROR,
  GET_REFRESH_OAUTH_TOKEN,
  GET_REFRESH_OAUTH_TOKEN_SUCCESS,
  GET_REFRESH_OAUTH_TOKEN_ERROR,
  SET_NAVIBAR_SHOW,
} from 'constants/actionTypes';

let INIT_STATE = {
  authNumbercheck: false,
  email: null,
  postworkgroupResponse: null,
  postinviteResponse: null,
  authcodeResponse: null,
  accesstokenerror: null,
  response: null,
  refreshtokenresponse: null,
  isShowNaviBar: true,
  authcodeError: null
};

const Auth = (state = INIT_STATE, action) => {
  switch (String(action.type)) {
    //토큰 만료 확인 
    case CHECK_ACCESS_TOKEN:
      return { ...state };
    case CHECK_ACCESS_TOKEN_SUCCESS:
      return { ...state, response: action.payload.response.message.auth_ok };
    case CHECK_ACCESS_TOKEN_ERROR:
      return { ...state, accesstokenerror: action.payload.error.message };
    //리프레쉬 토큰
    case GET_REFRESH_OAUTH_TOKEN:
      return { ...state };
    case GET_REFRESH_OAUTH_TOKEN_SUCCESS:
      return { ...state, refreshtokenresponse: 'ok' };
    case GET_REFRESH_OAUTH_TOKEN_ERROR:
      return { ...state, refreshtokenresponse: action.payload.error };
    //RENEWAL auth code 받아오기
    case OAUTH_AUTHORIZE:
      return { ...state };
    case OAUTH_AUTHORIZE_SUCCESS:
      return { ...state, authcodeResponse: action.payload.response.message };
    case OAUTH_AUTHORIZE_ERROR:
      return { ...state, authcodeResponse: action.payload.response.message };
    // access token 받아오기
    case GET_OAUTH_TOKEN:
      return { ...state };
    case GET_OAUTH_TOKEN_SUCCESS:
      return { ...state, accesstokenResponse: action.payload.response };
    case GET_OAUTH_TOKEN_ERROR:
      return { ...state, accesstokenResponse: action.payload.response };
    case POST_AUTHNUMBER:
      return { ...state };
    case POST_AUTHNUMBER_SUCCESS:
      return { ...state, authNumberResponse: action.payload.response.message };
    case POST_AUTHNUMBER_ERROR:
      return { ...state, authNumberResponse: action.payload.response.message };
    case POST_REGISTRATION:
      return { ...state, email: action.payload.useremail };
    case POST_REGISTRATION_SUCCESS:
      return { ...state };
    case POST_REGISTRATION_ERROR:
      return { ...state, error: action.payload };
    case POST_WORKGROUP:
      return { ...state, email: action.payload.useremail };
    case POST_WORKGROUP_SUCCESS:
      return { ...state, postworkgroupResponse: action.payload.response };
    case POST_WORKGROUP_ERROR:
      return { ...state, postworkgroupResponse: action.payload.response };
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
    //NAVI BAR
    case SET_NAVIBAR_SHOW:
      return { ...state, isShowNaviBar: action.payload };
    default: return { ...state };
  }
}

export default Auth;