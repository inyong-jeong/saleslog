// 상수 및 공통함수
const cmm = {};

//API 서버 PATH
cmm.SERVER_API_URL = 'https://backend.saleslog.co';

//업로드 파일경로 (영업일지,고객,고객담당자)
cmm.FILE_PATH_FILES = '/files/';

//업로드 파일경로 (회원사진)
cmm.FILE_PATH_PHOTOS = '/photos/';


//빈값 체크
cmm.isEmpty = (data) => {
  if (data === undefined || data === null || data === '') {
    return true;
  } else {
    return false;
  }
}

//windows screen size
cmm.windowSize = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {width, height};
}

//permission
cmm.permission = (data) => {
  switch (data) {
    case '0' :
      return 'Master';
    case '1' :
      return 'Chief';
    case '2' :
      return 'Manager';
    case '9' :
      return 'Staff';
    default :
      return 'Staff';
  } 
}

//permission 한글
cmm.permissionH = (data) => {
  switch (data) {
    case '0' :
      return '마스터';
    case '1' :
      return '치프';
    case '2' :
      return '매니저';
    case '9' :
      return '구성원';
    default :
      return '구성원';
  } 
}



module.exports = cmm;