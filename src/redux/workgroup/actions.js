import {
  POST_WORKGROUP_LOGO,
  GET_WORKGROUP_INFO,
  POST_WORKGROUP_UPD,
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const postWorkGroupLogo  = fetchActionGenerator(POST_WORKGROUP_LOGO, 'body'); 
export const getWorkGroupInfo  = fetchActionGenerator(GET_WORKGROUP_INFO, 'body'); 
export const postWorkGroupUpd  = fetchActionGenerator(POST_WORKGROUP_UPD, 'body'); 

