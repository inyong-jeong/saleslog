const INIT_STATE = {
  organization: {}
};

const Organization = (state=INIT_STATE, action) => {
  switch (String(action.type)) {
    case 'GET_ORGANIZATION_SUCCESS':
      return { ...state, organization: action.payload.response};
    case 'GET_USERS_SUCCESS':
      return { ...state, users: action.payload.response };
    default:
      return { ...state };
  }
};

export default Organization;