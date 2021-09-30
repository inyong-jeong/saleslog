import {
  POST_CUSTOMER,
  POST_CUSTOMER_ERROR,
  POST_CUSTOMER_SUCCESS,
  GET_CUSTOMER,
  GET_CUSTOMER_ERROR,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_OPTION_USERS,
  GET_CUSTOMER_OPTION_USERS_SUCCESS,
  GET_CUSTOMER_OPTION_USERS_ERROR,
  POST_CUSTOMER_MANAGER,
  POST_CUSTOMER_MANAGER_ERROR,
  POST_CUSTOMER_MANAGER_SUCCESS,
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_DETAILS_ERROR,
  GET_CUSTOMER_DETAILS_SUCCESS,
  POST_EDIT_CUSTOMER_ERROR,
  POST_EDIT_CUSTOMER_SUCCESS,
  POST_EDIT_CUSTOMER,
  GET_MANAGER_INFO,
  GET_MANAGER_INFO_ERROR,
  GET_MANAGER_INFO_SUCCESS,
  POST_EDIT_MANAGER_INFO,
  POST_EDIT_NAMECARD,
  POST_EDIT_NAMECARD_ERROR,
  POST_EDIT_NAMECARD_SUCCESS,
  DEL_CUSTOMER,
  DEL_CUSTOMER_SUCCESS,
  DEL_CUSTOMER_ERROR
} from '../../constants/actionTypes';

const initialState = {
  getCustomerResponse: null,
  postCustomerResponse: null,
  loading: true,
  list: null,
  listCounts: null,
  userLists: null,
  userListsResponse: null,
  postCustomerMangerResponse: null,
  getCustomerDetailsResponse: null,
  customerDetails: null,
  postCustomerEditResponse: null,
  getMangerResponse: null,
  managerDetails: null,
  postManagerEditResponse: null,
  postNamecardResponse: null,
  deleteCustomerRepsonse: null
}

const Customer = (state = initialState, action) => {
  switch (String(action.type)) {
    case POST_CUSTOMER:
      return { ...state, loading: true }
    case POST_CUSTOMER_SUCCESS:
      return { ...state, loading: false, postCustomerResponse: true }
    case POST_CUSTOMER_ERROR:
      return { ...state, loading: false, postCustomerResponse: false }

    case GET_CUSTOMER:
      return { ...state, loading: true }
    case GET_CUSTOMER_SUCCESS:
      return { ...state, loading: false, getCustomerResponse: true, postCustomerResponse: false, list: action.payload.response.message[0], listCounts: action.payload.response.message[1][0].totalCnt }
    case GET_CUSTOMER_ERROR:
      return { ...state, loading: false, getCustomerResponse: false, postCustomerResponse: false, }

    case GET_CUSTOMER_OPTION_USERS:
      return { ...state, userListsResponse: false }
    case GET_CUSTOMER_OPTION_USERS_SUCCESS:
      return { ...state, userListsResponse: true, userLists: action.payload.response.message }
    case GET_CUSTOMER_OPTION_USERS_ERROR:
      return { ...state, userListsResponse: false, }

    case POST_CUSTOMER_MANAGER:
      return { ...state, loading: true }
    case POST_CUSTOMER_MANAGER_SUCCESS:
      return { ...state, loading: false, postCustomerMangerResponse: true }
    case POST_CUSTOMER_MANAGER_ERROR:
      return { ...state, loading: false, postCustomerMangerResponse: false }

    case GET_CUSTOMER_DETAILS:
      return { ...state, loading: true, }
    case GET_CUSTOMER_DETAILS_SUCCESS:
      return { ...state, loading: false, getCustomerDetailsResponse: true, customerDetails: action.payload.response.message[0] }
    case GET_CUSTOMER_DETAILS_ERROR:
      return { ...state, loading: false, getCustomerDetailsResponse: false }

    case POST_EDIT_CUSTOMER:
      return { ...state, loading: true }
    case POST_EDIT_CUSTOMER_SUCCESS:
      return { ...state, loading: false, postCustomerEditResponse: true }
    case POST_EDIT_CUSTOMER_ERROR:
      return { ...state, loading: false, postCustomerEditResponse: false }

    case GET_MANAGER_INFO:
      return { ...state, loading: true, }
    case GET_MANAGER_INFO_SUCCESS:
      return { ...state, loading: false, getMangerResponse: true, managerDetails: action.payload.response.message[0] }
    case GET_MANAGER_INFO_ERROR:
      return { ...state, loading: false, getMangerResponse: false }

    case POST_EDIT_MANAGER_INFO:
      return { ...state, loading: true }
    case POST_EDIT_CUSTOMER_SUCCESS:
      return { ...state, loading: false, postManagerEditResponse: true }
    case POST_EDIT_CUSTOMER_ERROR:
      return { ...state, loading: false, postManagerEditResponse: false }

    case POST_EDIT_NAMECARD:
      return { ...state, loading: true }
    case POST_EDIT_NAMECARD_SUCCESS:
      return { ...state, loading: false, postNamecardResponse: true }
    case POST_EDIT_NAMECARD_ERROR:
      return { ...state, loading: false, postNamecardResponse: false }

    case DEL_CUSTOMER:
      return { ...state, loading: true }
    case DEL_CUSTOMER_SUCCESS:
      return { ...state, deleteCustomerRepsonse: true }
    case DEL_CUSTOMER_ERROR:
      return { ...state, deleteCustomerRepsonse: false }

    default:
      return { ...state };
  }
}
export default Customer;