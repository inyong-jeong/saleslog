

// RENEWAL

//AUTH
export const CHECK_ACCESS_TOKEN = 'CHECK_ACCESS_TOKEN'; // 엑세스 토큰 만료 확인
export const CHECK_ACCESS_TOKEN_SUCCESS = 'CHECK_ACCESS_TOKEN_SUCCESS';
export const CHECK_ACCESS_TOKEN_ERROR = 'CHECK_ACCESS_TOKEN_ERROR';


export const OAUTH_AUTHORIZE = 'OAUTH_AUTHORIZE'; //인증코드 가져오기
export const OAUTH_AUTHORIZE_SUCCESS = 'OAUTH_AUTHORIZE_SUCCESS';
export const OAUTH_AUTHORIZE_ERROR = 'OAUTH_AUTHORIZE_ERROR';

export const GET_OAUTH_TOKEN = 'GET_OAUTH_TOKEN'; //엑세스 토큰 가져오기
export const GET_OAUTH_TOKEN_SUCCESS = 'GET_OAUTH_TOKEN_SUCCESS';
export const GET_OAUTH_TOKEN_ERROR = 'GET_OAUTH_TOKEN_ERROR';

export const GET_REFRESH_OAUTH_TOKEN = 'GET_REFRESH_OAUTH_TOKEN'; //리프레쉬 토큰 가져오기
export const GET_REFRESH_OAUTH_TOKEN_SUCCESS = 'GET_REFRESH_OAUTH_TOKEN_SUCCESS'; //리프레쉬 토큰 가져오기
export const GET_REFRESH_OAUTH_TOKEN_ERROR = 'GET_REFRESH_OAUTH_TOKEN_ERROR'; //리프레쉬 토큰 가져오기

export const SET_NAVIBAR_SHOW = 'SET_NAVIBAR_SHOW'; //하단 네비바 보여주기


// export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';//비밀번호 변경
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERRPR = 'CHANGE_PASSWORD_ERRPR';

export const FIND_PASSWORD = 'FIND_PASSWORD'; // 비밀번호 찾기
export const FIND_PASSWORD_SUCCESS = 'FIND_PASSWORD_SUCCESS';
export const FIND_PASSWORD_FAILED = 'FIND_PASSWORD_FAILED';

export const POST_AUTHNUMBER = 'POST_AUTHNUMBER'; //인증번호 가져오기
export const POST_AUTHNUMBER_SUCCESS = 'POST_AUTHNUMBER_SUCCESS';
export const POST_AUTHNUMBER_ERROR = 'POST_AUTHNUMBER_ERROR';

export const POST_REGISTRATION = 'POST_REGISTRATION'; //신규 회원가입
export const POST_REGISTRATION_SUCCESS = 'POST_REGISTRATION_SUCCESS';
export const POST_REGISTRATION_ERROR = 'POST_REGISTRATION_ERROR';

export const POST_INVITE = 'POST_INVITE'; //회원 초대메일
export const POST_INVITE_SUCCESS = 'POST_INVITE_SUCCESS';
export const POST_INVITE_ERROR = 'POST_INVITE_ERROR';

export const POST_INVITE_REGISTRATION = 'POST_INVITE_REGISTRATION'; //초대 했을 때의 회원가입
export const POST_INVITE_REGISTRATION_SUCCESS = 'POST_INVITE_REGISTRATION_SUCCESS';
export const POST_INVITE_REGISTRATION_ERROR = 'POST_INVITE_REGISTRATION_ERROR';

export const POST_WORKGROUP = 'POST_WORKGROUP'; //워크그룹 생성
export const POST_WORKGROUP_SUCCESS = 'POST_WORKGROUP_SUCCESS';
export const POST_WORKGROUP_ERROR = 'POST_WORKGROUP_ERROR';

//워크그룹 있는지 체크 작업 해야됨.


/* SALESLOG */
export const POST_TEMPORARY_SALESLOG = 'POST_TEMPORARY_SALESLOG';   //영업일지 임시저장 등록
export const POST_TEMPORARY_SALESLOG_SUCCESS = 'POST_TEMPORARY_SALESLOG_SUCCESS';
export const POST_TEMPORARY_SALESLOG_ERROR = 'POST_TEMPORARY_SALESLOG_ERROR';

export const POST_SALESLOG = 'POST_SALESLOG';   //영업일지 등록
export const POST_SALESLOG_SUCCESS = 'POST_SALESLOG_SUCCESS';
export const POST_SALESLOG_ERROR = 'POST_SALESLOG_ERROR';

export const POST_SALESLOG_BATCH_ASYNC = 'POST_SALESLOG_BATCH_ASYNC';
export const POST_SALESLOG_BATCH_STATUS = 'POST_SALESLOG_BATCH_STATUS';

export const PUT_SALESLOG = 'PUT_SALESLOG'; //영업일지 수정
export const PUT_SALESLOG_SUCCESS = 'PUT_SALESLOG_SUCCESS';
export const PUT_SALESLOG_ERROR = 'PUT_SALESLOG_ERROR';

export const SEARCH_SALESLOG_LIST = 'SEARCH_SALESLOG'; //영업일지 검색
export const SEARCH_SALESLOG_LIST_SUCCESS = 'SEARCH_SALESLOG_SUCCESS';
export const SEARCH_SALESLOG_LIST_ERROR = 'SEARCH_SALESLOG_ERROR';

export const GET_SALESLOG = 'GET_SALESLOG';  //영업일지 상세
export const GET_SALESLOG_SUCCESS = 'GET_SALESLOG_SUCCESS';
export const GET_SALESLOG_ERROR = 'GET_SALESLOG_ERROR';

export const GET_SALESLOGS = 'GET_SALESLOGS'; // 영업일지 리스트들 불러오기(백엔드 작업 안된듯 확인 필요)
export const GET_SALESLOGS_SUCCESS = 'GET_SALESLOGS_SUCCESS';
export const GET_SALESLOGS_ERROR = 'GET_SALESLOGS_ERROR';

export const GET_TEMPORARY_LISTS = 'GET_TEMPORARY_LISTS';  //임시 일지 리스트
export const GET_TEMPORARY_LISTS_SUCCESS = 'GET_TEMPORARY_LISTS_SUCCESS';
export const GET_TEMPORARY_LISTS_ERROR = 'GET_TEMPORARY_LISTS_ERROR';

export const GET_TEMPORARY_LIST = 'GET_TEMPORARY_LIST';  //임시 일지 상세
export const GET_TEMPORARY_LIST_SUCCESS = 'GET_TEMPORARY_LIST_SUCCESS';
export const GET_TEMPORARY_LIST_ERROR = 'GET_TEMPORARY_LIST_ERROR';

export const DELETE_TEMPORARY_LOG = 'DELETE_TEMPORARY_LOG';  //임시 일지 삭제
export const DELETE_TEMPORARY_LOG_SUCCESS = 'DELETE_TEMPORARY_LOG_SUCCESS';
export const DELETE_TEMPORARY_LOG_ERROR = 'DELETE_TEMPORARY_LOG_ERROR';

export const UPLOAD_FILE = 'UPLOAD_FILE'; // 파일 업로드
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_ERROR = 'UPLOAD_FILE_ERROR';

export const PUT_FILE = 'UPLOAD_FILE'; // 파일 수정
export const PUT_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const PUT_FILE_ERROR = 'UPLOAD_FILE_ERROR';

export const DELETE_FILE = 'UPLOAD_FILE'; // 파일 삭제
export const DELETE_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const DELETE_FILE_ERROR = 'UPLOAD_FILE_ERROR';

export const SELECT_USER_LIST = 'SELECT_USER_LIST'; // 사용자 검색
export const SELECT_USER_LIST_SUCCESS = 'SELECT_USER_LIST_SUCCESS';
export const SELECT_USER_LIST_ERROR = 'SELECT_USER_LIST_ERROR';

// 피드백
export const POST_COMMENT = 'POST_COMMENT'; // 피드백 등록
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_ERROR = 'POST_COMMENT_ERROR';

export const PUT_COMMENT = 'PUT_COMMENT'; // 피드백 수정
export const PUT_COMMENT_SUCCESS = 'PUT_COMMENT_SUCCESS';
export const PUT_COMMENT_ERROR = 'PUT_COMMENT_ERROR';

export const DELETE_COMMENT = 'DELETE_COMMENT'; // 피드백 삭제
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

export const GET_COMMENT_LISTS = 'GET_COMMENT_LISTS'; // 피드백 리스트
export const GET_COMMENT_LISTS_SUCCESS = 'GET_COMMENT_LISTS_SUCCESS';
export const GET_COMMENT_LISTS_ERROR = 'GET_COMMENT_LISTS_ERROR';


/* ACCOUNT  */
export const SELECT_ACCOUNTS = 'SELECT_ACCOUNT';  // 고객사 선택
export const SELECT_ACCOUNTS_SUCCESS = 'SELECT_ACCOUNT_SUCCESS';
export const SELECT_ACCOUNTS_ERROR = 'SELECT_ACCOUNT_ERROR';
export const POST_ACCOUNTS = 'POST_ACCOUNTS';  // 고객사 등록
export const POST_ACCOUNTS_SUCCESS = 'POST_ACCOUNTS_SUCCESS';
export const POST_ACCOUNTS_ERROR = 'POST_ACCOUNTS_ERROR';
export const PUT_ACCOUNTS = 'PUT_ACCOUNTS';  // 고객사 수정
export const PUT_ACCOUNTS_SUCCESS = 'PUT_ACCOUNTS_SUCCESS';
export const PUT_ACCOUNTS_ERROR = 'PUT_ACCOUNTS_ERROR';
export const SELECT_ACCOUNT_PERSON = 'SELECT_ACCOUNT_PERSON';  //고객 담당자 선택
export const SELECT_ACCOUNT_PERSON_SUCCESS = 'SELECT_ACCOUNT_PERSON_SUCCESS';
export const SELECT_ACCOUNT_PERSON_ERROR = 'SELECT_ACCOUNT_PERSON_ERROR';
export const POST_ACCOUNT_PERSON = 'POST_ACCOUNT_PERSON';  //고객 담당자 등록
export const POST_ACCOUNT_PERSON_SUCCESS = 'POST_ACCOUNT_PERSON_SUCCESS';
export const POST_ACCOUNT_PERSON_ERROR = 'POST_ACCOUNT_PERSON_ERROR';
export const PUT_ACCOUNT_PERSON = 'PUT_ACCOUNT_PERSON';  //고객 담당자 수정
export const PUT_ACCOUNT_PERSON_SUCCESS = 'PUT_ACCOUNT_PERSON_SUCCESS';
export const PUT_ACCOUNT_PERSON_ERROR = 'PUT_ACCOUNT_PERSON_ERROR';

//customers
//고객사 등록
export const POST_CUSTOMER = 'POST_CUSTOMER'
export const POST_CUSTOMER_SUCCESS = 'POST_CUSTOMER_SUCCESS'
export const POST_CUSTOMER_ERROR = 'POST_CUSTOMER_ERROR'
//고객사 리스트 가져오기 
export const GET_CUSTOMER = 'GET_CUSTOMER'
export const GET_CUSTOMER_SUCCESS = 'GET_CUSTOMER_SUCCESS'
export const GET_CUSTOMER_ERROR = 'GET_CUSTOMER_ERROR'
//사원필터링 가져오기 
export const GET_CUSTOMER_OPTION_USERS = 'GET_CUSTOMER_OPTION_USERS'
export const GET_CUSTOMER_OPTION_USERS_SUCCESS = 'GET_CUSTOMER_OPTION_USERS_SUCCESS'
export const GET_CUSTOMER_OPTION_USERS_ERROR = 'GET_CUSTOMER_OPTION_USERS_ERROR'
//담당자 등록
export const POST_CUSTOMER_MANAGER = 'POST_CUSTOMER_MANAGER'
export const POST_CUSTOMER_MANAGER_SUCCESS = 'POST_CUSTOMER_MANAGER_SUCCESS'
export const POST_CUSTOMER_MANAGER_ERROR = 'POST_CUSTOMER_MANAGER_ERROR'
//고객사 상세 
export const GET_CUSTOMER_DETAILS = 'GET_CUSTOMER_DETAILS'
export const GET_CUSTOMER_DETAILS_SUCCESS = 'GET_CUSTOMER_DETAILS_SUCCESS'
export const GET_CUSTOMER_DETAILS_ERROR = 'GET_CUSTOMER_DETAILS_ERROR'
//고객사 수정
export const POST_EDIT_CUSTOMER = 'POST_EDIT_CUSTOMER'
export const POST_EDIT_CUSTOMER_SUCCESS = 'POST_EDIT_CUSTOMER_SUCCESS'
export const POST_EDIT_CUSTOMER_ERROR = 'POST_EDIT_CUSTOMER_ERROR'
//당당자 가져오기 
export const GET_MANAGER_INFO = 'GET_MANAGER_INFO'
export const GET_MANAGER_INFO_SUCCESS = 'GET_MANAGER_INFO_SUCCESS'
export const GET_MANAGER_INFO_ERROR = 'GET_MANAGER_INFO_ERROR'
//담당자 수정
export const POST_EDIT_MANAGER_INFO = 'POST_EDIT_MANAGER_INFO'
export const POST_EDIT_MANAGER_INFO_SUCCESS = 'POST_EDIT_MANAGER_INFO_SUCCESS'
export const POST_EDIT_MANAGER_INFO_ERROR = 'POST_EDIT_MANAGER_INFO_ERROR'






//workgroup
//워크그룹 로고등록
export const POST_WORKGROUP_LOGO = 'POST_WORKGROUP_LOGO'
export const POST_WORKGROUP_LOGO_SUCCESS = 'POST_WORKGROUP_LOGO_SUCCESS'
export const POST_WORKGROUP_LOGO_ERROR = 'POST_WORKGROUP_LOGO_ERROR'
//워크그룹 상세
export const GET_WORKGROUP_INFO = 'GET_WORKGROUP_INFO'
export const GET_WORKGROUP_INFO_SUCCESS = 'GET_WORKGROUP_INFO_SUCCESS'
export const GET_WORKGROUP_INFO_ERROR = 'GET_WORKGROUP_INFO_ERROR'
//워크그룹 수정
export const POST_WORKGROUP_UPD = 'POST_WORKGROUP_UPD'
export const POST_WORKGROUP_UPD_SUCCESS = 'POST_WORKGROUP_UPD_SUCCESS'
export const POST_WORKGROUP_UPD_ERROR = 'POST_WORKGROUP_UPD_ERROR'
//워크그룹 부서 가져오기
export const GET_DEPT_INFO = 'GET_DEPT_INFO'
export const GET_DEPT_INFO_SUCCESS = 'GET_DEPT_INFO_SUCCESS'
export const GET_DEPT_INFO_ERROR = 'GET_DEPT_INFO_ERROR'
//워크그룹 부서 등록
export const POST_DEPT_REGI = 'POST_DEPT_REGI'
export const POST_DEPT_REGI_SUCCESS = 'POST_DEPT_REGI_SUCCESS'
export const POST_DEPT_REGI_ERROR = 'POST_DEPT_REGI_ERROR'
//워크그룹 부서 수정
export const POST_DEPT_UPD = 'POST_DEPT_UPD'
export const POST_DEPT_UPD_SUCCESS = 'POST_DEPT_UPD_SUCCESS'
export const POST_DEPT_UPD_ERROR = 'POST_DEPT_UPD_ERROR'
//워크그룹 부서 삭제
export const POST_DEPT_DEL = 'POST_DEPT_DEL'
export const POST_DEPT_DEL_SUCCESS = 'POST_DEPT_DEL_SUCCESS'
export const POST_DEPT_DEL_ERROR = 'POST_DEPT_DEL_ERROR'









//기존 것
//ACCOUNT
export const GET_USER_ACCOUNT = 'GET_USER_ACCOUNT';
export const GET_USER_ACCOUNT_SUCCESS = 'GET_USER_ACCOUNT_SUCCESS';
export const GET_USER_ACCOUNT_ERROR = 'GET_USER_ACCOUNT_ERROR';


//부서 

export const GET_ORGANIZATION = 'GET_ORGANIZATION';
export const GET_ORGANIZATION_SUCCESS = 'GET_ORGANIZATION_SUCCESS';
export const GET_ORGANIZATION_ERROR = 'GET_ORGANIZATION_ERROR';

export const GET_ORGANIZATION_USER = 'GET_ORGANIZATION_USER';
export const GET_ORGANIZATION_USER_SUCCESS = 'GET_ORGANIZATION_USER_SUCCESS';
export const GET_ORGANIZATION_USER_ERROR = 'GET_ORGANIZATION_USER_ERROR';

