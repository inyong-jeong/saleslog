import {
  GET_SALES_STAT,
  GET_LEAD_STAT
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

const getsaleslogstat = fetchActionGenerator(GET_SALES_STAT, 'body');
const getleadlogstat = fetchActionGenerator(GET_LEAD_STAT, 'body');



export { getsaleslogstat, getleadlogstat }
