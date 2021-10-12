import {
  GET_CUSTOMER,
  GET_CUSTOMER_OPTION_USERS,
  POST_CUSTOMER,
  POST_CUSTOMER_MANAGER,
  GET_CUSTOMER_DETAILS,
  POST_EDIT_CUSTOMER,
  GET_MANAGER_INFO,
  POST_EDIT_MANAGER_INFO,
  POST_EDIT_NAMECARD,
  DEL_CUSTOMER,
  DEL_CUSTOMER_MANAGER
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const postCustomer = fetchActionGenerator(POST_CUSTOMER, 'body'); //액션함수 ? 
export const getAllCustomer = fetchActionGenerator(GET_CUSTOMER, 'body', 'pageno')
export const getUsers = fetchActionGenerator(GET_CUSTOMER_OPTION_USERS, 'body')
export const postCustomerManger = fetchActionGenerator(POST_CUSTOMER_MANAGER, 'body')
export const getCustomerDetails = fetchActionGenerator(GET_CUSTOMER_DETAILS, 'body')
export const postEditCustomer = fetchActionGenerator(POST_EDIT_CUSTOMER, 'body')
export const deleteCustomer = fetchActionGenerator(DEL_CUSTOMER, 'body')
export const getManagerInfo = fetchActionGenerator(GET_MANAGER_INFO, 'body')
export const postEditManager = fetchActionGenerator(POST_EDIT_MANAGER_INFO, 'body')
export const postEditNamecard = fetchActionGenerator(POST_EDIT_NAMECARD, 'body')
export const deleteCustomerManager = fetchActionGenerator(DEL_CUSTOMER_MANAGER, 'body')