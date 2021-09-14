import {
  GET_CUSTOMER,
  GET_CUSTOMER_OPTION_USERS,
  POST_CUSTOMER,
  POST_CUSTOMER_MANAGER,
  GET_CUSTOMER_DETAILS,
  POST_EDIT_CUSTOMER,
  GET_MANAGER_INFO,
  POST_EDIT_MANAGER_INFO,
  POST_EDIT_NAMECARD
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

const postCustomer = fetchActionGenerator(POST_CUSTOMER, 'body'); //액션함수 ? 
const getAllCustomer = fetchActionGenerator(GET_CUSTOMER, 'body', 'pageno')
const getUsers = fetchActionGenerator(GET_CUSTOMER_OPTION_USERS, 'body')
const postCustomerManger = fetchActionGenerator(POST_CUSTOMER_MANAGER, 'body')
const getCustomerDetails = fetchActionGenerator(GET_CUSTOMER_DETAILS, 'body')
const postEditCustomer = fetchActionGenerator(POST_EDIT_CUSTOMER, 'body')
const getManagerInfo = fetchActionGenerator(GET_MANAGER_INFO, 'body')
const postEditManager = fetchActionGenerator(POST_EDIT_MANAGER_INFO, 'body')
const postEditNamecard = fetchActionGenerator(POST_EDIT_NAMECARD, 'body')

export { postCustomer, getAllCustomer, getUsers, postCustomerManger, getCustomerDetails, postEditCustomer, getManagerInfo, postEditManager, postEditNamecard }
