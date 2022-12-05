import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  GET_PROFILE_PICTURE,
  GET_PROFILE_PICTURE_SUCCESS,
  GET_PROFILE_PICTURE_ERROR
} from '../../constants/actionTypes';

const initialState = {
  memberlist: null,
}

const Organization = (state = initialState, action) => {
  switch (String(action.type)) {
    case GET_PROFILE:
      return { ...state }
    case GET_PROFILE_SUCCESS:
      return { ...state, memberlist: action.payload.response.message }
    case GET_PROFILE_ERROR:
      return { ...state }
    case GET_PROFILE_PICTURE:
      return { ...state }
    case GET_PROFILE_PICTURE_SUCCESS:
      return { ...state, }
    case GET_PROFILE_PICTURE_ERROR:
      return { ...state }
    default:
      return { ...state };
  }
}
export default Organization;