import {
  GET_ORGANIZATION,
  GET_ORGANIZATION_USER,
  GET_ORGANIZATION_DASH,
  GET_ORGANIZATION_USER_DASH
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

const getorganization = fetchActionGenerator(GET_ORGANIZATION, 'body');
const getorganizationusers = fetchActionGenerator(GET_ORGANIZATION_USER, 'body');
const getorganizationDash = fetchActionGenerator(GET_ORGANIZATION_DASH, 'body');
const getorganizationusersDash = fetchActionGenerator(GET_ORGANIZATION_USER_DASH, 'body');

export { getorganization, getorganizationusers, getorganizationDash, getorganizationusersDash }
