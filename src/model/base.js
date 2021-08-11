const checkDevelopmentMode = require('../helpers/domainUtils').checkDevelopmentMode;
const version = checkDevelopmentMode() ? 'dev' : 'prod';

const account = 'accounts';
const comments = 'comments';
const notifications = 'notifications';
const saleslog = 'saleslogs';
const tripreport = 'tripreport';
const tripreports = 'tripreports';

const stat = 'stats';
//board
const boards = 'boards';
//search
const search = 'search';
const users = 'users';
const files = 'files';
const organization = 'organization';

const concat = (...resources) => {
  let path = `/${version}`;
  for (const res of resources)
    path += `/${res}`;
  return path;
}

//첫번째 경로
/* ARTICLE (BOARD) */
export const ARTICLE = concat(boards, '{id}');
export const ARTICLES = concat(boards);
export const FILTER_ARTICLES = concat(boards);
export const POST_ARTICLE_COMMENTS = concat(boards, '{id}', comments);

/*SEARCH*/
export const GET_SEARCH_SALESLOG = concat(search);

/* USER */
export const GET_USER_ACCOUNT = concat(account, users, '{id}');
export const GET_USER = concat(users, '{id}');
export const GET_USER_TREE = concat(users, 'tree', '{id}');
export const GET_USERS = concat(users, 'list', '{id}');

export const GET_ORGANIZATION = concat(organization, '{id}');

/* SALSELOG */
export const POST_SALESLOG = concat(saleslog);
export const PUT_SALESLOG = concat(saleslog, '{id}');
export const PUT_SALESLOG_COUSER = concat(saleslog, '{id}', 'couser');
export const GET_SALESLOGS = concat(saleslog);
export const GET_USER_SALESLOG = concat(saleslog, users, '{id}');
export const GET_SALESLOG = concat(saleslog, '{id}');
export const GET_NOTABLE_SALESLOGS = concat(saleslog, 'notable');
export const PUT_NOTABLE_SALESLOGS = concat(saleslog, 'notable', '{id}');
export const DELETE_SALESLOG = concat(saleslog, '{id}');
export const GET_SALESLOG_REPORT = concat(stat, 'type');
export const GET_ACCOUNT_REPORT = concat(stat, 'type');
export const PUT_SALESLOG_GUIDE = concat(saleslog, 'guide', '{id}');
export const DELETE_SALESLOG_GUIDE = concat(saleslog, 'guide', '{id}');
export const GET_SALESLOG_NEEDS = concat(saleslog, 'needs');

/* COMMENTS */
export const COMMENTS = concat(comments, saleslog, '{id}');
export const POST_COMMENTS = concat(comments, saleslog);

export const GET_SALESLOG_COMMENT = concat(comments, saleslog, '{id}');
export const GET_COMMENT_WITH_ID = concat(comments, '{id}');

/* NOTIFICATION */
export const GET_NOTIFICATIONS = concat(notifications, users, '{id}');
export const GET_ENTITY_NOTIFICATIONS = concat(notifications, 'entity', '{id}');
export const PUT_NOTIFICATION = concat(notifications, '{id}');

/* SALESLOG */
export const POST_SALESLOG_FILE = concat(files, saleslog, '{id}');
export const GET_SALESLOG_FILE = concat(files, saleslog, '{id}');
export const DELETE_SALESLOG_FILE = concat(saleslog, '{id}', files, '{id}');

export const GET_DASHBOARD_STAT = concat(stat, 'dashboard');
export const GET_STAT_TYPE1 = concat(stat, 'type');
export const GET_STAT_TYPE2 = concat(stat, 'type');
export const GET_STAT_TYPE3 = concat(stat, 'type');
export const GET_STAT_TYPE4 = concat(stat, 'type');
export const GET_STAT_TYPE5 = concat(stat, 'type');
export const GET_SALES_LOG_SHEET = concat(stat, 'sheets');

/* STATIC FILE */
export const GET_COACHING = "https =//s3.ap-northeast-2.amazonaws.com/saleslog.co/coaching.json";
export const GET_NEEDS_DETAIL = "https =//s3.ap-northeast-2.amazonaws.com/saleslog.co/needs_detail.json";

/* TRIPREPORT */
export const GET_TRIPS_SALESLOG = concat(tripreports);
export const POST_TRIP_SALESLOG = concat(tripreport);
export const GET_TRIP_SALESLOG = concat(tripreport, '{id}');
export const PUT_TRIP_SALESLOG = concat(tripreport, '{id}');
export const DELETE_TRIP_SALESLOG = concat(tripreport, '{id}');

