import React, { useState, useEffect } from 'react';
import { getLogList, getCommentLists, getprofile, deleteFile, putFile, clearLog, deleteSalesLog, putCouser, deleteCouser } from 'redux/actions';
import { connect } from 'react-redux';
import { Row, Col, Upload, Avatar, Modal } from 'antd'
import StyledCard from 'components/styledcomponent/Card'
import Comments from 'components/Comments/Comments'
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import cmm from 'constants/common';
import { PlusOutlined } from '@ant-design/icons';
import { ResponsivePie } from '@nivo/pie';
import NeedsCard from 'components/NeedsCard'
import { SET_NAVIBAR_SHOW, SET_SALES_GB, STORE_DATA } from 'constants/actionTypes';
import { base64Dec, base64Enc } from "constants/commonFunc";
import { useDispatch, useSelector } from 'react-redux'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CouserModal from 'components/CouserModal'
import CouserList from 'components/CouserList';




const { confirm } = Modal;


function SalesLog(props) {
  const dispatch = useDispatch();



  const state = useSelector(state => state.SalesLog)
  let deletelog = state.deletelog;
  let putcouser = state.putcouser;
  let deletecouser = state.deletecouser;

  const [salesgb, setSalesGb] = useState();
  const [CommentLists, setCommentLists] = useState([])
  const [filelist, setFileList] = useState([])
  const [logneedslist, setLogNeedsList] = useState([])

  const body = {
    slog_idx: base64Dec(props.match.params.id)
  }

  const data = {
    sidx: base64Dec(props.match.params.id)
  }
  const [Log, setLog] = useState(null)
  // const Log = props.log ? props.log[0] : null




  //공동작성자 아이콘 추가 함수
  function getFileList(log) {
    let FileList = []
    for (let i = 1; i < 6; i++) {
      if (i === 1 && log.file1 !== '') {
        FileList = FileList.concat([{ uid: 1, url: cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + log.file1 }])
      } else if (i === 2 && log.file2 !== '') {
        FileList = FileList.concat([{ uid: 2, url: cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + log.file2 }])
      } else if (i === 3 && log.file3 !== '') {
        FileList = FileList.concat([{ uid: 3, url: cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + log.file3 }])
      } else if (i === 4 && log.file4 !== '') {
        FileList = FileList.concat([{ uid: 4, url: cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + log.file4 }])
      } else if (i === 5 && log.file5 !== '') {
        FileList = FileList.concat([{ uid: 5, url: cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + log.file5 }])
      } else {
        continue;
      }
    }
    return FileList
  }
  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
  }, [])

  useEffect(() => {
    if (salesgb) {
      dispatch({
        type: SET_SALES_GB,
        payload: salesgb
      })
    }
  }, [salesgb])


  // useEffect(() => {
  //   console.log(props.match.params.id)
  //   base64Dec(props.match.params.id)
  // }, [])

  // console.log(props.match.params.id)

  // 로그 상세 일지 상태 set
  useEffect(() => {
    if (props.log) {
      setLog(props.log)
      setSalesGb(props.log.sales_gb)
      setFileList(getFileList(props.log))
    }
    return () => { props.clearLog() }

  }, [props.log])

  const handleOnBack = () => {
    props.history.goBack()
  }

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment))
  }

  // useEffect(() => {
  //   if (props.putfileloading || props.deletefileloading) {
  //     props.getLogList(data)
  //   }
  // }, [props.putfileloading, props.deletefileloading])

  //마운트 될 떄, 댓글리스트, 로그리스트, 프로필 받아오기.
  useEffect(() => {
    if (base64Dec(props.match.params.id)) {
      props.getLogList(data)
      props.getCommentLists(body)
      props.getprofile()
    }
  }, [])

  useEffect(() => {
    if (props.commentdelete) {
      props.getCommentLists(body)
    }
  }
    , [props.commentdelete])

  useEffect(() => {
    if (props.comment) {
      props.getCommentLists(body)
    }
  }
    , [props.comment])


  useEffect(() => {
    if (props.commentlists) {
      setCommentLists(props.commentlists)
    }
  }, [props.commentlists])

  //피드백 변경하면 dispatch
  useEffect(() => {
    if (props.comcgresponse) {
      props.getCommentLists(body)
    }
  }
    , [props.comcgresponse])

  // 삭제하면 일지 리스트 화면으로 이동
  useEffect(() => {
    if (deletelog) {
      props.history.push('/main/manage');
      state.deletelog = false;
    }
  }, [deletelog])


  const handleOnRevise = () => {
    props.history.push(`/main/upload/${props.match.params.id}`)
  }

  const handleOndelete = () => {
    confirm({
      title: '삭제하신 일지는 복구할 수 없습니다. 일지를 삭제할까요?',
      icon: <ExclamationCircleOutlined />,
      // content: '로그아웃을 하시면 재로그인이 필요합니다.',
      cancelText: '취소',
      okText: '확인',
      onOk() {
        props.deleteSalesLog({ slog_idx: base64Dec(props.match.params.id) })
      },
      onCancel() {
        //취소
      },
    })
  }

  // const [file, setFile] = useState({
  //   slog_idx: props.match.params.id,
  //   fileup: null
  // })


  function download(dataurl, filename) {
    let a = document.createElement("a");
    a.href = dataurl;
    a.setAttribute("download", filename);
    a.setAttribute("target", '_blank');
    a.click();
  }

  const handlePreview = (file) => {
    console.log(file)
    download(file.url, 'filename');
  }

  const uploadButton = (
    <div>
      <PlusOutlined type='upload' />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  useEffect(() => {
    if (state.putfileloading) {
      props.getLogList(data)
      state.putfileloading = false;
    }
  }, [state.putfileloading])

  useEffect(() => {
    if (state.deletefileloading) {
      props.getLogList(data)
      state.deletefileloading = false;
    }
  }, [state.deletefileloading])

  // useEffect(() => {
  //   if (file.fileup) {
  //     props.putFile(file)
  //   }
  // }, [file])

  const handleChange = (info) => {
    console.log(11111)
    console.log(info.file.status)

    if (info.file.status === 'uploading') {


      let arrFiles = [];
      if (info && info.fileList.length > 0) {
        for (let i = 0; i < info.fileList.length; i++) {
          if (info.fileList[i].originFileObj) {
            arrFiles = arrFiles.concat(info.fileList[i].originFileObj)
          }
        }
      }
      console.log(arrFiles)
      const data = {
        slog_idx: base64Dec(props.match.params.id),
        fileup: arrFiles
      }
      // setFile({ ...file, fileup: arrFiles })
      props.putFile(data)
    } else if (info.file.status === 'removed') {
      const data = {
        slog_idx: base64Dec(props.match.params.id),
        f_idx: info.file.uid
      }
      props.deleteFile(data)
      return
    }
  }


  // 니즈 분류 데이터 set

  useEffect(() => {
    if (props.logneeds) {
      console.log(props.logneeds);
      setLogNeedsList(props.logneeds)
    }
  }, [props.logneeds])

  //그래프 테마
  const theme = {
    "textColor": "#999999",
    "fontSize": 16,
  }

  //공동작성자 수정 , 추가 함수

  const [lists, setLists] = useState([
  ]);

  //공동작성자 추가 후 일지상세 불러오기
  useEffect(() => {
    if (putcouser) {
      props.getLogList(data)
      state.putcouser = false;
    }
  }, [putcouser])

  //공동작성자 삭제 후 일지상세 불러오기

  useEffect(() => {
    if (deletecouser) {
      props.getLogList(data)
      state.deletecouser = false;
    }
  }, [deletecouser])

  //공동작성자 바뀌면 리스트 set
  useEffect(() => {
    setLists(props.logcouser)
  }, [props.logcouser])

  const handleonInsert = (name, login_idx, thumb_url) => {
    props.putCouser({ slog_idx: base64Dec(props.match.params.id), couser_idx: login_idx })
  };

  const handleonRemove = (id) => {
    props.deleteCouser({ slog_idx: base64Dec(props.match.params.id), couser_idx: id })
  }


  console.log(props)
  // useEffect(() => {
  //   console.log('페이지 변환', data)
  //   dispatch({
  //     type: STORE_DATA,
  //     payload: [props.location.state, true]
  //   })
  // }, [])


  return (
    <>
      <MyAppBar barTitle={'영업일지 상세'} showBackButton
        navigateTo={handleOnBack}
        onEditClick={handleOnRevise}
        onDeleteClick={handleOndelete}
        Dbutton={Log && Log.del_yn}
        Ubutton={Log && Log.upd_yn}
      />
      <div className='content_body'>
        <Row>
          <Col>
            {Log && <h4>{Log.title}</h4>}
          </Col>
        </Row>
        <Row gutter={[4, 4]}>
          <Col sm={24} xs={24} md={24} lg={24}>
            {Log && <StyledCard>
              <ul >
                <li key={1} id={1} style={{ display: 'flex' }}>
                  <img
                    src={require('assets/icons/calendar.png')}
                    alt='calendar_icon' />
                  <div className='ml-1'>{Log.meeting_date}</div>
                </li>
                <li key={2} id={2} style={{ display: 'flex' }}>
                  <img
                    src={require('assets/icons/clock.png')}
                    alt='clock' />
                  <div className='ml-1'>{Log.meeting_stime} ~ {Log.meeting_etime}</div>
                </li>
                <li key={3} id={3} style={{ display: 'flex' }}>
                  <img
                    src={require('assets/icons/location.png')}
                    alt='location' />
                  <div className='ml-1'>{Log.addr}</div>
                </li>
                <li key={4} id={4} style={{ display: 'flex' }}>
                  <img
                    src={require('assets/icons/needs.png')}
                    alt='needs_icon' />
                  <div className='ml-1'>{Log.sales_goal_t} <span>&#183;</span> {Log.sales_activity_t}</div>
                </li>
                <li key={5} id={5} style={{ display: 'flex' }}>
                  <img
                    src={require('assets/icons/document.png')}
                    alt='document_icon' />
                  <div className='ml-1'>{Log.account_name} <span>&#183;</span> {Log.man_name} {Log.posi} <span>&#183;</span> {Log.dept}</div>
                </li>
                <li key={6} id={6} >
                  {/* <div style={{ display: 'flex' }}>
                    <img
                      src={require('assets/icons/profile.png')}
                      alt='document_icon' />
                    <span>&nbsp;</span>
                    <p style={{ marginTop: '2px' }}>공동 작성자 현황</p>
                  </div> */}
                  <div>
                    <CouserModal handleonInsert={handleonInsert} />
                  </div>
                  <div>
                    <CouserList lists={lists} handleonRemove={handleonRemove} />
                  </div>
                  {/* {props.logcouser && props.logcouser.map(v => {
                    return (
                      <div className='mt-1' style={{ display: 'flex' }} >
                        <Avatar src={cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + v.thumb_url} />
                        <div className='ml-1'><div className='mt-1'>{v.user_name} {v.title} <span>&#183;</span>  {v.dept_name}</div> </div>
                      </div>
                    )
                  }
                  )
                  } */}
                </li>
              </ul>
            </StyledCard>}
          </Col>
        </Row>
        <Row gutter={[4, 4]} className='mt-1'>
        </Row>
        <Row gutter={[4, 4]}>
          <Col sm={24} xs={24} md={24} lg={24}>
            {Log && <StyledCard title='일지 내용'>
              <p>{Log.log}</p>
              <div className="clearfix">
                <Upload
                  listType="picture-card"
                  fileList={filelist}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  maxCount={5}
                >
                  {filelist.length >= 5 ? null : uploadButton}
                </Upload>
              </div>
            </StyledCard>}
          </Col>
        </Row>
        <div className='mt-1'></div>
        <Row gutter={[4, 4]} >
          <Col sm={24} xs={24} md={24} lg={24}>
            {logneedslist.length > 0 ? <StyledCard title='니즈 분석'>
              <div style={{ width: '100%', height: 500 }}>
                <ResponsivePie
                  arcLabel={(v) => `${v.data.percent}%`}
                  theme={theme}
                  data={logneedslist && cmm.setDataList(logneedslist)}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: 'color' }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                  legends={[
                    {
                      anchor: 'bottom',
                      direction: 'row',
                      justify: false,
                      translateX: 0,
                      translateY: 56,
                      itemsSpacing: 0,
                      itemWidth: 100,
                      itemHeight: 18,
                      itemTextColor: '#999999',
                      itemDirection: 'left-to-right',
                      itemOpacity: 1,
                      symbolSize: 18,
                      symbolShape: 'circle',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemTextColor: '#000',
                            cursor: 'pointer'
                          }
                        }
                      ]
                    }
                  ]}
                />
              </div >
            </StyledCard> :
              <StyledCard title='니즈 분석'>
                <div style={{ textAlign: 'center' }}>일지 로그에서 분류된 니즈가 없습니다. 코칭이 필요합니다.</div>
              </StyledCard>
            }
            <Row gutter={[4, 4]}>
              <Col sm={24} xs={24} md={24} lg={24}>
                {props.logneeds ? props.logneeds.map((v) =>
                  <NeedsCard
                    key={v.needs_cod}
                    needs={v.needs_cod}
                    sentences={v.needs}
                  />
                ) :
                  <div>분석이 없습니다.</div>
                }
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[4, 4]} >
          <Col sm={24} xs={24} md={24} lg={24}>
            <Comments key={props.match.params.id} id={props.match.params.id} CommentLists={CommentLists} postId={base64Dec(props.match.params.id)} refreshFunction={updateComment} />
            {/* <Divider /> */}
          </Col>
        </Row>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { log, logcouser, logneeds, commentlists,
    commentdelete, comment, commentchange,
    putfileloading, deletefileloading, deletelog, comcgresponse } = state.SalesLog;
  return {
    log, logcouser, logneeds, commentlists,
    commentdelete, comment, commentchange,
    putfileloading, deletefileloading, deletelog, comcgresponse
  };
};
const mapStateToDispatch = {
  getLogList: getLogList.call,
  getCommentLists: getCommentLists.call,
  getprofile: getprofile.call,
  putFile: putFile.call,
  deleteFile: deleteFile.call,
  clearLog,
  deleteSalesLog: deleteSalesLog.call,
  putCouser: putCouser.call,
  deleteCouser: deleteCouser.call
}

export default connect(mapStateToProps, mapStateToDispatch)(SalesLog);