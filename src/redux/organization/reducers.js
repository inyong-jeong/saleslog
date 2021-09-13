import {
  GET_ORGANIZATION,
  GET_ORGANIZATION_SUCCESS,
  GET_ORGANIZATION_ERROR,
  GET_ORGANIZATION_USER,
  GET_ORGANIZATION_USER_SUCCESS,
  GET_ORGANIZATION_USER_ERROR
} from '../../constants/actionTypes';

const initialState = {
  organizationlist: null,

}

const Organization = (state = initialState, action) => {
  switch (String(action.type)) {
    case GET_ORGANIZATION:
      return { ...state }
    case GET_ORGANIZATION_SUCCESS:
      return { ...state, organizationlist: action.payload.response.message }
    case GET_ORGANIZATION_ERROR:
      return { ...state }
    case GET_ORGANIZATION_USER:
      return { ...state }
    case GET_ORGANIZATION_USER_SUCCESS:
      return { ...state }
    case GET_ORGANIZATION_USER_ERROR:
      return { ...state }
    default:
      return { ...state };
  }
}
export default Organization;