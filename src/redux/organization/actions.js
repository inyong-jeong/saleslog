import {
  GET_ORGANIZATION,
  GET_USERS
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const getOrganization = fetchActionGenerator(GET_ORGANIZATION, 'orgId');
export const getUsers = fetchActionGenerator(GET_USERS, 'orgId');