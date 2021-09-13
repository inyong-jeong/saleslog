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
  GET_DEPT_INFO,
  GET_DEPT_INFO_SUCCESS,
  GET_DEPT_INFO_ERROR,
  POST_DEPT_REGI,
  POST_DEPT_REGI_SUCCESS,
  POST_DEPT_REGI_ERROR,
  POST_DEPT_UPD,
  POST_DEPT_UPD_SUCCESS,
  POST_DEPT_UPD_ERROR,
  POST_DEPT_DEL,
  POST_DEPT_DEL_SUCCESS,
  POST_DEPT_DEL_ERROR,
} from '../../constants/actionTypes';

const initialState = {
  postWorkgroupLogoRes: null, 
  getWorkGroupInfoRes: null,
  postWorkGroupUpdRes: null,
  getDeptInfoRes: null,
  postDeptRegiRes: null,
  postDeptUpdRes: null,
  postDeptDelRes: null,
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
      return { ...state, loading: false, postWorkGroupUpdRes: action.payload.response }
    case POST_WORKGROUP_UPD_ERROR:
      return { ...state, loading: false, postWorkGroupUpdRes: {state:false,message:action.payload.error}}
    case GET_DEPT_INFO:
      return { ...state, loading: true }
    case GET_DEPT_INFO_SUCCESS:
      return { ...state, loading: false, getDeptInfoRes: action.payload.response.message }
    case GET_DEPT_INFO_ERROR:
      return { ...state, loading: false, getDeptInfoRes: false }
    case POST_DEPT_REGI:
      return { ...state, loading: true, postDeptRegiRes: false }
    case POST_DEPT_REGI_SUCCESS:
      return { ...state, loading: false, postDeptRegiRes: true }
    case POST_DEPT_REGI_ERROR:
      return { ...state, loading: false, postDeptRegiRes: {state:false,message:action.payload.error} }        
    case POST_DEPT_UPD:
      return { ...state, loading: true, postDeptUpdRes: false }
    case POST_DEPT_UPD_SUCCESS:
      return { ...state, loading: false, postDeptUpdRes: true }
    case POST_DEPT_UPD_ERROR:
      return { ...state, loading: false, postDeptUpdRes: {state:false,message:action.payload.error} }        
    case POST_DEPT_DEL:
      return { ...state, loading: true, postDeptDelRes: false }
    case POST_DEPT_DEL_SUCCESS:
      return { ...state, loading: false, postDeptDelRes: true }
    case POST_DEPT_DEL_ERROR:
      return { ...state, loading: false, postDeptDelRes: {state:false,message:action.payload.error} }        
                      
    default:
      return { ...state };
  }
}
export default Workgroup;