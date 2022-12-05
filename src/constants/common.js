// 상수 및 공통함수
const cmm = {};

//API 서버 PATH
cmm.AUTH_SERVER_API_URL = 'https://auth.theklab.co';

//API 서버 PATH
cmm.SERVER_API_URL = 'https://backend.saleslog.co';


//업로드 파일경로 (영업일지,고객,고객담당자)
cmm.FILE_PATH_FILES = '/files/';

//업로드 파일경로 (회원사진)
cmm.FILE_PATH_PHOTOS = '/photo/';

// client_id
cmm.CLIENT_ID = 'saleslog.co';

// client secret
cmm.CLIENT_SECRET = '8fba114f8291cf28e443c30aba7cce86';


//빈값 체크
cmm.isEmpty = (data) => {
  if (data === undefined || data === null || data === '') {
    return true;
  } else {
    return false;
  }
}

//콤보박스 선택없음 추가
cmm.selComboList = (v) => {
  let rtn = [];

  rtn[0] = { value: '', label: '선택없음' };
  for (let i = 0; i < v.length; i++) {
    rtn[i + 1] = { value: v[i].dept_idx, label: v[i].dept_name };
  }
  return rtn;
}

// 니즈분류 데이터 추가
cmm.setDataList = (v) => {
  let result = [];
  for (let i = 0; i < v.length; i++) {
    result[i] = { id: v[i].needs_cod, label: v[i].needs_cod, value: v[i].total, needslog: v[i].needs, percent: v[i].percent }
  }
  return result;
}

//mobile/pc 체크 
cmm.getPlatform = () => {
  // console.log(navigator.userAgent)
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|webview/i.test(navigator.userAgent)) {
    return 'mobile';
  } else {
    return 'pc';
  }
}

// webview 체크 
cmm.getWebview = () => {
  // console.log(navigator.userAgent)
  if (/webview/i.test(navigator.userAgent)) {
    return 'webview';
  } else {
    return 'web';
  }
}



//windows screen size
cmm.windowSize = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

//permission
cmm.permission = (data) => {
  switch (data) {
    case '0':
      return 'Master';
    case '1':
      return 'Chief';
    case '2':
      return 'Manager';
    case '9':
      return 'Staff';
    case '-1000':
      return 'TheKlab Admin';
    default:
      return 'Staff';
  }
}

cmm.dashboardChartColors = ['#398FFF']
//['#f09a31', '#ff8052', '#fe6d75', '#ec6597', '#cb69b1', '#9e70c1', '#6776c3', '#1e78b8']

module.exports = cmm;