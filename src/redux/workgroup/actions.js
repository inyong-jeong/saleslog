import {
  POST_WORKGROUP_LOGO,
  GET_WORKGROUP_INFO,
  POST_WORKGROUP_UPD,
  GET_DEPT_INFO,
  POST_DEPT_REGI,
  POST_DEPT_UPD,
  POST_DEPT_DEL,
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const postWorkGroupLogo  = fetchActionGenerator(POST_WORKGROUP_LOGO, 'body'); 
export const getWorkGroupInfo  = fetchActionGenerator(GET_WORKGROUP_INFO, 'body'); 
export const postWorkGroupUpd  = fetchActionGenerator(POST_WORKGROUP_UPD, 'body'); 
export const getDeptInfo  = fetchActionGenerator(GET_DEPT_INFO, 'body'); 
export const postDeptRegi  = fetchActionGenerator(POST_DEPT_REGI, 'body'); 
export const postDeptUpd  = fetchActionGenerator(POST_DEPT_UPD, 'body'); 
export const postDeptDel  = fetchActionGenerator(POST_DEPT_DEL, 'body'); 

