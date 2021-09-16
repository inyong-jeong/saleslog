import {
  POST_WORKGROUP_LOGO,
  GET_WORKGROUP_INFO,
  POST_WORKGROUP_UPD,
  POST_WORKGROUP_REGI,
  GET_WORKGROUP_LIST,
  POST_WORKGROUP_CHANGE,
  POST_WORKGROUP_OUT,
  POST_WORKGROUP_DEL,
  GET_GROUP_MEMBER_LIST,
  GET_GROUP_MEMBER_DETAIL,
  GET_DEPT_INFO,
  POST_DEPT_REGI,
  POST_DEPT_UPD,
  POST_DEPT_DEL,

} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const postWorkGroupLogo  = fetchActionGenerator(POST_WORKGROUP_LOGO, 'body'); 
export const getWorkGroupInfo  = fetchActionGenerator(GET_WORKGROUP_INFO, 'body'); 
export const postWorkGroupUpd  = fetchActionGenerator(POST_WORKGROUP_UPD, 'body'); 

export const postWorkGroupRegi  = fetchActionGenerator(POST_WORKGROUP_REGI, 'body'); 
export const getWorkGroupList  = fetchActionGenerator(GET_WORKGROUP_LIST, 'body'); 
export const postWorkGroupChange  = fetchActionGenerator(POST_WORKGROUP_CHANGE, 'body'); 
export const postWorkGroupOut  = fetchActionGenerator(POST_WORKGROUP_OUT, 'body'); 
export const postWorkGroupDel  = fetchActionGenerator(POST_WORKGROUP_DEL, 'body'); 
export const getGroupMemberList  = fetchActionGenerator(GET_GROUP_MEMBER_LIST, 'body'); 
export const getGroupMemberDetail  = fetchActionGenerator(GET_GROUP_MEMBER_DETAIL, 'body'); 

export const getDeptInfo  = fetchActionGenerator(GET_DEPT_INFO, 'body'); 
export const postDeptRegi  = fetchActionGenerator(POST_DEPT_REGI, 'body'); 
export const postDeptUpd  = fetchActionGenerator(POST_DEPT_UPD, 'body'); 
export const postDeptDel  = fetchActionGenerator(POST_DEPT_DEL, 'body'); 

