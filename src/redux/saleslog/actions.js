import {
  POST_SALESLOG,
  POST_TEMPORARY_SALESLOG,
  UPLOAD_FILE
} from 'constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const postSalesLog = fetchActionGenerator(POST_SALESLOG, 'data');
export const postTemporarySalesLog = fetchActionGenerator(POST_TEMPORARY_SALESLOG, 'data');
export const uploadFile = fetchActionGenerator(UPLOAD_FILE, 'data');


