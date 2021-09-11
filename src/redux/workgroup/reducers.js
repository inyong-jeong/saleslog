import {
  POST_WORKGROUP_LOGO,
  POST_WORKGROUP_LOGO_SUCCESS,
  POST_WORKGROUP_LOGO_ERROR,
  GET_WORKGROUP_INFO,
  GET_WORKGROUP_INFO_SUCCESS,
  GET_WORKGROUP_INFO_ERROR,
  POST_WORKGROUP_UPD,
  POST_WORKGROUP_UPD_SUCCESS,
  POST_WORKGROUP_UPD_ERROR,
} from '../../constants/actionTypes';

const initialState = {
  postWorkgroupLogoRes: null, 
  getWorkGroupInfoRes: null,
  postWorkGroupUpdRes: null,
  loading: true,
  data: null,
  
}

const Workgroup = (state = initialState, action) => {
  switch (String(action.type)) {
    case POST_WORKGROUP_LOGO:
      return { ...state, loading: true }
    case POST_WORKGROUP_LOGO_SUCCESS:
      return { ...state, loading: false, postWorkgroupLogoRes: true }
    case POST_WORKGROUP_LOGO_ERROR:
      return { ...state, loading: false, postWorkgroupLogoRes: false }
    case GET_WORKGROUP_INFO:
      return { ...state, loading: true }
    case GET_WORKGROUP_INFO_SUCCESS:
      return { ...state, loading: false, getWorkGroupInfoRes: true, data: action.payload.response.message }
    case GET_WORKGROUP_INFO_ERROR:
      return { ...state, loading: false, getWorkGroupInfoRes: false }
    case POST_WORKGROUP_UPD:
      return { ...state, loading: true }
    case POST_WORKGROUP_UPD_SUCCESS:
      return { ...state, loading: false, postWorkGroupUpdRes: action.payload.response.message }
    case POST_WORKGROUP_UPD_ERROR:
      return { ...state, loading: false, postWorkGroupUpdRes: false }
    
    default:
      return { ...state };
  }
}
export default Workgroup;