import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
} from '../../constants/actionTypes';

const primary = localStorage.getItem('persist:primary')
let initUser;
try {
  initUser = JSON.parse(JSON.parse(primary).User).user;
} catch (err) {}

const INIT_STATE = {
  user: initUser ? initUser : {
    user_name: "",
  }
};

const User = (state=INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state };
    case GET_USER_SUCCESS:
      return { ...state, user: action.payload.response };
    case GET_USER_ERROR:
      return { ...state, error: action.payload.error};
    case 'GET_USER_TREE_SUCCESS':
      return { ...state, tree: action.payload.response};
    default:
      return { ...state };
  }
};

export default User;