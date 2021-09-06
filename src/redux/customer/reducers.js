import {
  POST_CUSTOMER,
  POST_CUSTOMER_FAILED,
  POST_CUSTOMER_SUCCESS,
  GET_CUSTOMER,
  GET_CUSTOMER_FAILED,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_OPTION_USERS,
  GET_CUSTOMER_OPTION_USERS_SUCCESS,
  GET_CUSTOMER_OPTION_USERS_FAILED
} from '../../constants/actionTypes';

const initialState = {
  getCustomerResponse: null,
  postCustomerResponse: null,
  loading: true,
  list: null,
  listCounts: null,
  userLists: null,
  userListsResponse: null
}

const Customer = (state = initialState, action) => {
  switch (String(action.type)) {
    case POST_CUSTOMER:
      return { ...state, loading: true }

    case POST_CUSTOMER_SUCCESS:
      return { ...state, loading: false, postCustomerResponse: true }

    case POST_CUSTOMER_FAILED:
      return { ...state, loading: false, postCustomerResponse: false }

    case GET_CUSTOMER:
      return { ...state, loading: true }

    case GET_CUSTOMER_SUCCESS:
      return { ...state, loading: false, getCustomerResponse: true, list: action.payload.response.message[0], listCounts: action.payload.response.message[1][0].totalCnt }

    case GET_CUSTOMER_FAILED:
      return { ...state, loading: false, getCustomerResponse: false }

    case GET_CUSTOMER_OPTION_USERS:
      return { ...state, userListsResponse: false }

    case GET_CUSTOMER_OPTION_USERS_SUCCESS:
      return { ...state, userListsResponse: true, userLists: action.payload.response.message }
    case GET_CUSTOMER_OPTION_USERS_FAILED:
      return { ...state, userListsResponse: false, }

    default:
      return { ...state };
  }
}
export default Customer;