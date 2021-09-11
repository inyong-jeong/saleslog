import {
  POST_WORKGROUP_LOGO,
  POST_WORKGROUP_LOGO_SUCCESS,
  POST_WORKGROUP_LOGO_ERROR,
} from '../../constants/actionTypes';

const initialState = {
  postWorkgroupLogoRes: null, 
  loading: true,
}

const Workgroup = (state = initialState, action) => {
  switch (String(action.type)) {
    case POST_WORKGROUP_LOGO:
      return { ...state, loading: true }
    case POST_WORKGROUP_LOGO_SUCCESS:
      return { ...state, loading: false, postWorkgroupLogoRes: true }
    case POST_WORKGROUP_LOGO_ERROR:
      return { ...state, loading: false, postWorkgroupLogoRes: false }

    default:
      return { ...state };
  }
}
export default Workgroup;