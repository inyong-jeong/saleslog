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

//json tree data 
cmm.getTreeData = (array) => {
  var map = {};
  for (var i = 0; i < array.length; i++) {
    var obj = { "key": array[i]['dept_idx'], "title": array[i]['dept_name'], "LVL": array[i]['lvl'], };
    obj.children = [];
    map[obj.key] = obj;
    var parent = array[i]['parent_idx'] || '-';

    if (!map[parent]) {
      map[parent] = {
        children: []
      };
    }
    map[parent].children.push(obj);
  }

  return map['-'].children;

}

module.exports = cmm;