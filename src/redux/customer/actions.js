import {
  GET_CUSTOMER,
  GET_CUSTOMER_OPTION_USERS,
  POST_CUSTOMER
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

const postCustomer = fetchActionGenerator(POST_CUSTOMER, 'body'); //액션함수 ? 
const getAllCustomer = fetchActionGenerator(GET_CUSTOMER, 'body', 'pageno')
const getUsers = fetchActionGenerator(GET_CUSTOMER_OPTION_USERS, 'body')

export { postCustomer, getAllCustomer, getUsers }
