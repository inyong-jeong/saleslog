// @flow
import {
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
  POST_CHECK_IS_REGISTERED,
  POST_CHECK_IS_REGISTERED_ERROR,
  POST_CHECK_IS_REGISTERED_SUCCESS,
  FIND_PASSWORD,
  FIND_PASSWORD_SUCCESS,
  FIND_PASSWORD_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  POST_INVITE_REGISTRATION,
  POST_INVITE_REGISTRATION_ERROR,
  POST_INVITE_REGISTRATION_SUCCESS
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
  isCacheShowNaviBar: true,
  authcodeError: null,
  postCheckisRegisteredResponse: null,
  postInviteRegisteredResponse: null,
  loading: null,
  findresponse: false,
  changeresponse: false,
  changePasswordResponse: null,
  changePasswordError: null

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
      return { ...state, authcodeResponse: action.payload.error };
    // access token 받아오기
    case GET_OAUTH_TOKEN:
      return { ...state };
    case GET_OAUTH_TOKEN_SUCCESS:
      console.log('GET_OAUTH_TOKEN_SUCCESS:', action.payload.response)
      return { ...state, accesstokenResponse: action.payload.response };
    case GET_OAUTH_TOKEN_ERROR:
      console.log('GET_OAUTH_TOKEN_ERROR:', action.payload.error)
      return { ...state, accesstokenResponse: action.payload.error };
    case POST_AUTHNUMBER:
      return { ...state };
    case POST_AUTHNUMBER_SUCCESS:
      return { ...state, authNumberResponse: action.payload.response.message };
    case POST_AUTHNUMBER_ERROR:
      return { ...state, authNumberResponse: action.payload.error };
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
      return { ...state, postworkgroupResponse: action.payload.error };
    case POST_INVITE:
      return { ...state };
    case POST_INVITE_SUCCESS:
      console.log('success::', action.payload);
      return { ...state, postinviteResponse: action.payload.response };
    case POST_INVITE_ERROR:
      console.log('error:::', action.payload);
      return { ...state, postinviteResponse: action.payload.error };
    //비밀번호 찾기
    case FIND_PASSWORD:
      return { ...state, findresponse: false };
    case FIND_PASSWORD_SUCCESS:
      return { ...state, findPasswordResponse: action.payload.response, findresponse: true };
    case FIND_PASSWORD_ERROR:
      return { ...state, findPasswordError: action.payload.error, findresponse: false };
    //비밀번호 변경
    case CHANGE_PASSWORD:
      return { ...state, changeresponse: false };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, changePasswordResponse: action.payload.response, changeresponse: true };
    case CHANGE_PASSWORD_ERROR:
      return { ...state, changePasswordError: action.payload, changeresponse: false };
    case POST_CHECK_IS_REGISTERED:
      return { ...state, loading: true }
    case POST_CHECK_IS_REGISTERED_SUCCESS:
      return { ...state, postCheckisRegisteredResponse: action.payload.response, loading: false }
    case POST_CHECK_IS_REGISTERED_ERROR:
      return { ...state, postCheckisRegisteredResponse: false, loading: false }

    case POST_INVITE_REGISTRATION:
      return { ...state, loading: true }
    case POST_INVITE_REGISTRATION_SUCCESS:
      return { ...state, loading: false, postInviteRegisteredResponse: action.payload.response }
    case POST_INVITE_REGISTRATION_ERROR:
      return { ...state, loading: false, postInviteRegisteredResponse: false }

    //NAVI BAR
    case SET_NAVIBAR_SHOW:
      return { ...state, isShowNaviBar: action.payload };
    default: return { ...state };
  }
}

export default Auth;