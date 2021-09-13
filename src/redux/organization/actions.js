import {
  GET_ORGANIZATION,
  GET_ORGANIZATION_USER
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

const getorganization = fetchActionGenerator(GET_ORGANIZATION, 'body');
const getorganizationusers = fetchActionGenerator(GET_ORGANIZATION_USER, 'body');



export { getorganization, getorganizationusers }
