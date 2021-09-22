import {  
    GET_PROFILE_DETAIL,
    GET_PROFILE_DETAIL_SUCCESS,
    GET_PROFILE_DETAIL_ERROR,
    POST_PROFILE_UPD,
    POST_PROFILE_UPD_SUCCESS,
    POST_PROFILE_UPD_ERROR,
    POST_PROFILE_PHOTO,
    POST_PROFILE_PHOTO_SUCCESS,
    POST_PROFILE_PHOTO_ERROR,
    GET_NOTICE_GRP_LIST,
    GET_NOTICE_GRP_LIST_SUCCESS,
    GET_NOTICE_GRP_LIST_ERROR,
    GET_NOTICE_GRP_DETAIL,
    GET_NOTICE_GRP_DETAIL_SUCCESS,
    GET_NOTICE_GRP_DETAIL_ERROR,
    POST_NOTICE_GRP_UPD,
    POST_NOTICE_GRP_UPD_SUCCESS,
    POST_NOTICE_GRP_UPD_ERROR,
    POST_NOTICE_GRP_DEL,
    POST_NOTICE_GRP_DEL_SUCCESS,
    POST_NOTICE_GRP_DEL_ERROR,
    POST_NOTICE_GRP_REGI,
    POST_NOTICE_GRP_REGI_SUCCESS,
    POST_NOTICE_GRP_REGI_ERROR,
    GET_NOTICE_SYS_LIST,
    GET_NOTICE_SYS_LIST_SUCCESS,
    GET_NOTICE_SYS_LIST_ERROR,
    GET_NOTICE_SYS_DETAIL,
    GET_NOTICE_SYS_DETAIL_SUCCESS,
    GET_NOTICE_SYS_DETAIL_ERROR,
    POST_NOTICE_SYS_UPD,
    POST_NOTICE_SYS_UPD_SUCCESS,
    POST_NOTICE_SYS_UPD_ERROR,
    POST_NOTICE_SYS_DEL,
    POST_NOTICE_SYS_DEL_SUCCESS,
    POST_NOTICE_SYS_DEL_ERROR,
    POST_NOTICE_SYS_REGI,
    POST_NOTICE_SYS_REGI_SUCCESS,
    POST_NOTICE_SYS_REGI_ERROR
} from '../../constants/actionTypes';

const initialState = {
  getProfileDetailRes: null,  
  postProfileUpdRes: null,  
  postProfilePhotoRes: null,  
  getNoticeGrpListRes: null,  
  getNoticeGrpDetailRes: null,  
  postNoticeGrpUpdRes: null,  
  postNoticeGrpDelRes: null,  
  postNoticeGrpRegiRes: null,  
  getNoticeSysListRes: null,
  getNoticeSysDetailRes: null,
  postNoticeSysUpdRes: null,
  postNoticeSysDelRes: null,
  postNoticeSysRegiRes: null,
}

const Etc = (state = initialState, action) => {
  
  switch (String(action.type)) {    
    case GET_PROFILE_DETAIL:      
      return { ...state, loading: true }
    case GET_PROFILE_DETAIL_SUCCESS:
      return { ...state, loading: false, getProfileDetailRes: action.payload.response.message }
    case GET_PROFILE_DETAIL_ERROR:
      return { ...state, loading: false, getProfileDetailRes: {state:false,message:action.payload.error}}
    case POST_PROFILE_UPD:
      return { ...state, loading: true }
    case POST_PROFILE_UPD_SUCCESS:
      return { ...state, loading: false, postProfileUpdRes: action.payload.response.message }
    case POST_PROFILE_UPD_ERROR:
      return { ...state, loading: false, postProfileUpdRes: {state:false,message:action.payload.error}}
    case POST_PROFILE_PHOTO:
      return { ...state, loading: true, postProfilePhotoRes: false }
    case POST_PROFILE_PHOTO_SUCCESS:
      return { ...state, loading: false, postProfilePhotoRes: true }
    case POST_PROFILE_PHOTO_ERROR:
      return { ...state, loading: false, postProfilePhotoRes: false }
    case GET_NOTICE_GRP_LIST:
      return { ...state, loading: true }
    case GET_NOTICE_GRP_LIST_SUCCESS:
      return { ...state, loading: false, getNoticeGrpListRes: action.payload.response.message }
    case GET_NOTICE_GRP_LIST_ERROR:
      return { ...state, loading: false, getNoticeGrpListRes: {state:false,message:action.payload.error}}
    case GET_NOTICE_GRP_DETAIL:
      return { ...state, loading: true }
    case GET_NOTICE_GRP_DETAIL_SUCCESS:
      return { ...state, loading: false, getNoticeGrpDetailRes: action.payload.response.message }
    case GET_NOTICE_GRP_DETAIL_ERROR:
      return { ...state, loading: false, getNoticeGrpDetailRes: {state:false,message:action.payload.error}}
    case POST_NOTICE_GRP_UPD:
      return { ...state, loading: true }
    case POST_NOTICE_GRP_UPD_SUCCESS:
      return { ...state, loading: false, postNoticeGrpUpdRes: action.payload.response.message }
    case POST_NOTICE_GRP_UPD_ERROR:
      return { ...state, loading: false, postNoticeGrpUpdRes: {state:false,message:action.payload.error}}
    case POST_NOTICE_GRP_DEL:
      return { ...state, loading: true }
    case POST_NOTICE_GRP_DEL_SUCCESS:
      return { ...state, loading: false, postNoticeGrpDelRes: action.payload.response.message }
    case POST_NOTICE_GRP_DEL_ERROR:
      return { ...state, loading: false, postNoticeGrpDelRes: {state:false,message:action.payload.error}}
    case POST_NOTICE_GRP_REGI:
      return { ...state, loading: true }
    case POST_NOTICE_GRP_REGI_SUCCESS:
      return { ...state, loading: false, postNoticeGrpRegiRes: true }
    case POST_NOTICE_GRP_REGI_ERROR:
      return { ...state, loading: false, postNoticeGrpRegiRes: false}
    case GET_NOTICE_SYS_LIST:
      return { ...state, loading: true }
    case GET_NOTICE_SYS_LIST_SUCCESS:
      return { ...state, loading: false, getNoticeSysListRes: action.payload.response.message }
    case GET_NOTICE_SYS_LIST_ERROR:
      return { ...state, loading: false, getNoticeSysListRes: {state:false,message:action.payload.error}}
    case GET_NOTICE_SYS_DETAIL:
      return { ...state, loading: true }
    case GET_NOTICE_SYS_DETAIL_SUCCESS:
      return { ...state, loading: false, getNoticeSysDetailRes: action.payload.response.message }
    case GET_NOTICE_SYS_DETAIL_ERROR:
      return { ...state, loading: false, getNoticeSysDetailRes: {state:false,message:action.payload.error}}
    case POST_NOTICE_SYS_UPD:
      return { ...state, loading: true }
    case POST_NOTICE_SYS_UPD_SUCCESS:
      return { ...state, loading: false, postNoticeSysUpdRes: action.payload.response.message }
    case POST_NOTICE_SYS_UPD_ERROR:
      return { ...state, loading: false, postNoticeSysUpdRes: {state:false,message:action.payload.error}}
    case POST_NOTICE_SYS_DEL:
      return { ...state, loading: true }
    case POST_NOTICE_SYS_DEL_SUCCESS:
      return { ...state, loading: false, postNoticeSysDelRes: action.payload.response.message }
    case POST_NOTICE_SYS_DEL_ERROR:
      return { ...state, loading: false, postNoticeSysDelRes: {state:false,message:action.payload.error}}
    case POST_NOTICE_SYS_REGI:
      return { ...state, loading: true }
    case POST_NOTICE_SYS_REGI_SUCCESS:
      return { ...state, loading: false, postNoticeSysRegiRes: action.payload.response.message }
    case POST_NOTICE_SYS_REGI_ERROR:
      return { ...state, loading: false, postNoticeSysRegiRes: {state:false,message:action.payload.error}}
    default:
      return { ...state };
  }
}
export default Etc;