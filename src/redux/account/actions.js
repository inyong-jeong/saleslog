import {
  GET_USER_ACCOUNT,
  SELECT_ACCOUNTS,
  SELECT_ACCOUNT_PERSON
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const getUserAccounts = fetchActionGenerator(GET_USER_ACCOUNT, 'userId');
export const selectAccounts = fetchActionGenerator(SELECT_ACCOUNTS, 'data');
export const selectAccountperson = fetchActionGenerator(SELECT_ACCOUNT_PERSON, 'data');
