import {  
  GET_PROFILE_DETAIL,
  POST_PROFILE_UPD,
  POST_PROFILE_PHOTO,
  GET_NOTICE_GRP_LIST, 
  GET_NOTICE_GRP_DETAIL, 
  POST_NOTICE_GRP_UPD,
  POST_NOTICE_GRP_DEL,
  POST_NOTICE_GRP_REGI,
  GET_NOTICE_SYS_LIST, 
  GET_NOTICE_SYS_DETAIL, 
  POST_NOTICE_SYS_UPD,
  POST_NOTICE_SYS_DEL,
  POST_NOTICE_SYS_REGI
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const getProfileDetail  = fetchActionGenerator(GET_PROFILE_DETAIL, 'body');
export const postProfileUpd  = fetchActionGenerator(POST_PROFILE_UPD, 'body');
export const postProfilePhoto  = fetchActionGenerator(POST_PROFILE_PHOTO, 'body');
export const getNoticeGrpList  = fetchActionGenerator(GET_NOTICE_GRP_LIST,  'body');
export const getNoticeGrpDetail  = fetchActionGenerator(GET_NOTICE_GRP_DETAIL,  'body');
export const postNoticeGrpUpd  = fetchActionGenerator(POST_NOTICE_GRP_UPD, 'body');
export const postNoticeGrpDel  = fetchActionGenerator(POST_NOTICE_GRP_DEL, 'body');
export const postNoticeGrpRegi  = fetchActionGenerator(POST_NOTICE_GRP_REGI, 'body');
export const getNoticeSysList  = fetchActionGenerator(GET_NOTICE_SYS_LIST,  'body');
export const getNoticeSysDetail  = fetchActionGenerator(GET_NOTICE_SYS_DETAIL,  'body');
export const postNoticeSysUpd  = fetchActionGenerator(POST_NOTICE_SYS_UPD, 'body');
export const postNoticeSysDel  = fetchActionGenerator(POST_NOTICE_SYS_DEL, 'body');
export const postNoticeSysRegi  = fetchActionGenerator(POST_NOTICE_SYS_REGI, 'body');


