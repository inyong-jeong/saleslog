import {
  GET_USER_ACCOUNT
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const getUserAccounts = fetchActionGenerator(GET_USER_ACCOUNT, 'userId');
