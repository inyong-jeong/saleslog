import {
  GET_ORGANIZATION,
  GET_ORGANIZATION_SUCCESS,
  GET_ORGANIZATION_ERROR,
  GET_ORGANIZATION_USER,
  GET_ORGANIZATION_USER_SUCCESS,
  GET_ORGANIZATION_USER_ERROR,
  GET_ORGANIZATION_DASH,
  GET_ORGANIZATION_DASH_SUCCESS,
  GET_ORGANIZATION_DASH_ERROR,
  GET_ORGANIZATION_USER_DASH,
  GET_ORGANIZATION_USER_DASH_SUCCESS,
  GET_ORGANIZATION_USER_DASH_ERROR
} from '../../constants/actionTypes';

const initialState = {
  organizationlist: null,
  organizationuserlist: null,
  organizationDashRes: null,
  organizationuserDashRes: null,
  loading: true,
  organlistResponse: false,
  organuserResponse: false,

}

const Organization = (state = initialState, action) => {
  switch (String(action.type)) {
    case GET_ORGANIZATION:
      return { ...state, organlistResponse: false, loading: true }
    case GET_ORGANIZATION_SUCCESS:
      return { ...state, organizationlist: action.payload.response.message, organlistResponse: true, loading: false }
    case GET_ORGANIZATION_ERROR:
      return { ...state, organlistResponse: false, loading: false }
    case GET_ORGANIZATION_USER:
      return { ...state, organuserResponse: false, loading: true }
    case GET_ORGANIZATION_USER_SUCCESS:
      return { ...state, organizationuserlist: action.payload.response.message, organuserResponse: true, loading: false }
    case GET_ORGANIZATION_USER_ERROR:
      return { ...state, organuserResponse: false, loading: false }
    case GET_ORGANIZATION_DASH:
      return { ...state, loading: true, }
    case GET_ORGANIZATION_DASH_SUCCESS:
      return { ...state, organizationDashRes: action.payload.response.message, loading: false }
    case GET_ORGANIZATION_DASH_ERROR:
      return { ...state, loading: false, organizationuserDashRes: null }
    case GET_ORGANIZATION_USER_DASH:
      return { ...state, loading: true, }
    case GET_ORGANIZATION_USER_DASH_SUCCESS:
      return { ...state, organizationuserDashRes: action.payload.response.message, loading: false }
    case GET_ORGANIZATION_USER_DASH_ERROR:
      return { ...state, loading: false, organizationuserDashRes: null }

    default:
      return { ...state };
  }
}
export default Organization;