import React, { useState, useEffect } from 'react';
import { getLogList, getCommentLists, getprofile, deleteFile, putFile, clearLog } from 'redux/actions';
import { connect } from 'react-redux';
import { Row, Col, Upload, Avatar } from 'antd'
import StyledCard from 'components/styledcomponent/Card'
import Comments from 'components/Comments/Comments'
import { useSelector } from "react-redux";
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import cmm from 'constants/common';
import { PlusOutlined } from '@ant-design/icons';
import { ResponsivePie } from '@nivo/pie';
import NeedsCard from 'components/NeedsCard'
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { base64Dec, base64Enc } from "constants/commonFunc";
import { useDispatch } from 'react-redux'

function SalesLog(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
  }, [])
  const state = useSelector(state => state.SalesLog)
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

  // useEffect(() => {
  //   console.log(props.match.params.id)
  //   base64Dec(props.match.params.id)
  // }, [])

  // console.log(props.match.params.id)

  // 로그 상세 일지 상태 set
  useEffect(() => {
    if (props.log) {
      setLog(props.log)
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

  useEffect(() => {
    if (props.commentchange) {
      props.getCommentLists(body)
    }
  }
    , [props.commentchange])



  const handleOnRevise = () => {
    props.history.push(`/main/upload/${props.match.params.id}`)
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
        slog_idx: props.match.params.id,
        fileup: arrFiles
      }
      // setFile({ ...file, fileup: arrFiles })
      props.putFile(data)
    } else if (info.file.status === 'removed') {
      const data = {
        slog_idx: props.match.params.id,
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

  console.log(props.logneeds)

  const handleOnChart = (e) => {
    // e.preventDefault();
    console.log(e)
  }

  const [needs, setNeeds] = useState([]);

  // function sortpercent(v) {
  //   let arr = []
  //   for (let i =0; i < v.length; i++){
  //     arr = arr.concat({})
  //   }
  // }



  return (
    <>
      <MyAppBar barTitle={'영업일지 상세'} showBackButton
        navigateTo={handleOnBack}
        onEditClick={handleOnRevise}
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
                <li style={{ display: 'flex' }}>
                  <img
                    src={require('assets/icons/calendar.png')}
                    alt='calendar_icon' />
                  <div className='ml-1'>{Log.meeting_date}</div>
                </li>
                <li style={{ display: 'flex' }}>
                  <img
                    src={require('assets/icons/clock.png')}
                    alt='clock' />
                  <div className='ml-1'>{Log.meeting_stime} ~ {Log.meeting_etime}</div>
                </li>
                <li style={{ display: 'flex' }}>
                  <img
                    src={require('assets/icons/location.png')}
                    alt='location' />
                  <div className='ml-1'>{Log.addr}</div>
                </li>
                <li style={{ display: 'flex' }}>
                  <img
                    src={require('assets/icons/needs.png')}
                    alt='needs_icon' />
                  <div className='ml-1'>{Log.sales_goal_t} <span>&#183;</span> {Log.sales_activity_t}</div>
                </li>
                <li style={{ display: 'flex' }}>
                  <img
                    src={require('assets/icons/document.png')}
                    alt='document_icon' />
                  <div className='ml-1'>{Log.account_name} <span>&#183;</span> {Log.man_name} {Log.posi} <span>&#183;</span> {Log.dept}</div>
                </li>
                <li >
                  <div style={{ display: 'flex' }}>
                    <img
                      src={require('assets/icons/profile.png')}
                      alt='document_icon' />
                    <span>&nbsp;</span>
                    <p style={{ marginTop: '2px' }}>공동 작성자 현황</p>
                  </div>

                  {props.logcouser && props.logcouser.map(v => {
                    return (
                      <div className='mt-1' style={{ display: 'flex' }} >
                        <Avatar src={cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + v.thumb_url} />
                        <div className='ml-1'><div className='mt-1'>{v.user_name} {v.title} <span>&#183;</span>  {v.dept_name}</div> </div>
                      </div>
                    )
                  }
                  )
                  }
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
                {Log.file1}<br />{Log.file2}<br />{Log.file3}<br />{Log.file4}<br />{Log.file5}<br />
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
            <StyledCard title='니즈 분석'>

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
              </div>


            </StyledCard>
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
            <Comments key={props.match.params.id} CommentLists={CommentLists} postId={props.match.params.id} refreshFunction={updateComment} />
            {/* <Divider /> */}
          </Col>
        </Row>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { log, logcouser, logneeds, commentlists, commentdelete, comment, commentchange, putfileloading, deletefileloading } = state.SalesLog;
  return { log, logcouser, logneeds, commentlists, commentdelete, comment, commentchange, putfileloading, deletefileloading };
};
const mapStateToDispatch = {
  getLogList: getLogList.call,
  getCommentLists: getCommentLists.call,
  getprofile: getprofile.call,
  putFile: putFile.call,
  deleteFile: deleteFile.call,
  clearLog,
}

export default connect(mapStateToProps, mapStateToDispatch)(SalesLog);