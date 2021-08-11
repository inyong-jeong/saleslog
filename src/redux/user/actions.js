import {
  GET_USER,
  GET_USER_TREE,
  GET_USERS
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const getUser = fetchActionGenerator(GET_USER, 'userId');
export const getUserTree = fetchActionGenerator(GET_USER_TREE, 'userId');
export const getUserList = fetchActionGenerator(GET_USERS, 'userId');

