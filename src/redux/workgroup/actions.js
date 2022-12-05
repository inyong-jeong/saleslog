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
  POST_GROUP_MEMBER_UPD,
  POST_GROUP_MEMBER_OUT,
  GET_PROFILE_INFO,
  POST_GROUP_INVITE,
  GET_INVITE_LIST,
  POST_INVITE_DEL,
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
export const postGroupMemberUpd  = fetchActionGenerator(POST_GROUP_MEMBER_UPD, 'body'); 
export const postGroupMemberOut  = fetchActionGenerator(POST_GROUP_MEMBER_OUT, 'body'); 
export const getProfileInfo  = fetchActionGenerator(GET_PROFILE_INFO, 'body'); 
export const postGroupInvite  = fetchActionGenerator(POST_GROUP_INVITE, 'body'); 
export const getInviteList  = fetchActionGenerator(GET_INVITE_LIST, 'body'); 
export const postInviteDel  = fetchActionGenerator(POST_INVITE_DEL, 'body'); 


export const getDeptInfo  = fetchActionGenerator(GET_DEPT_INFO, 'body'); 
export const postDeptRegi  = fetchActionGenerator(POST_DEPT_REGI, 'body'); 
export const postDeptUpd  = fetchActionGenerator(POST_DEPT_UPD, 'body'); 
export const postDeptDel  = fetchActionGenerator(POST_DEPT_DEL, 'body'); 

