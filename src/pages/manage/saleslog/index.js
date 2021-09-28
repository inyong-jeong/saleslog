import React, { useState, useEffect } from 'react';
import { getLogList, getCommentLists, getprofile, deleteFile, putFile } from 'redux/actions';
import { connect } from 'react-redux';
import { Row, Col, Upload, Modal, Avatar } from 'antd'
import StyledCard from 'components/styledcomponent/Card'
import Chart from 'react-apexcharts';
import Comments from 'components/Comments/Comments'
import { useSelector } from "react-redux";
import LogModal from 'components/Modal';
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import cmm from 'constants/common';
import { PlusOutlined } from '@ant-design/icons';

function SalesLog(props) {
  const state = useSelector(state => state.SalesLog)
  const [CommentLists, setCommentLists] = useState([])
  const [filelist, setFileList] = useState([])
  const body = {
    slog_idx: props.match.params.id
  }

  const data = {
    sidx: props.match.params.id
  }
  const [Log, setLog] = useState(null)
  // const Log = props.log ? props.log[0] : null

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
    console.log(FileList);
    return FileList
  }


  useEffect(() => {
    if (props.log) {
      setLog(props.log)
      setFileList(getFileList(props.log))
    }
  }, [props.log])


  const handleOnBack = () => {
    props.history.push('/main/manage');
  }

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment))
  }

  // useEffect(() => {
  //   if (props.putfileloading || props.deletefileloading) {
  //     props.getLogList(data)
  //   }
  // }, [props.putfileloading, props.deletefileloading])

  useEffect(() => {
    if (props.match.params.id) {
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

  function getSeries(needs) {
    let arr = []
    for (let i = 0; i < needs.length; i++) {
      arr = arr.concat(needs[i].total)
    }
    return arr;
  }

  function getLabels(needs) {
    let arr = []
    for (let i = 0; i < needs.length; i++) {
      arr = arr.concat(needs[i].needs_cod)
    }
    return arr;
  }
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   if(props.logneeds) {
  //     setList(getLabels(props.logneeds))
  //   }
  // },[props.logneeds])

  console.log(Log)
  // console.log(file)
  const series = props.logneeds && getSeries(props.logneeds);
  console.log(series)
  const result = props.logneeds && props.logneeds.map(v => v.needs_cod)

  console.log(result)
  const a = ['전략니즈', '제품니즈']
  console.log('aaaaaaaaaaaa;;;;;;;;;', a, result)
  const option = {
    labels: ['전략', '니즈']
  };
  // const option = {
  //   labels: (result) ? result : a,
  // };

  return (
    <>
      <MyAppBar barTitle={'영업일지 상세'} showBackButton navigateTo={handleOnBack} onEditClick={handleOnRevise} />
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
                <img
                  src={require('assets/icons/profile.png')}
                  alt='document_icon' /><p>공동 작성자 현황</p>
                {props.logcouser && props.logcouser.map(v => {
                  return (
                    <div className='mt-1' style={{ display: 'flex' }} >
                      <Avatar src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + v.thumb_url} />
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
            <Chart options={option} series={series} type="donut" width='400' />
          </StyledCard>
        </Col>
      </Row>
      <Row gutter={[4, 4]} >
        <Col sm={24} xs={24} md={24} lg={24}>
          <Comments key={props.match.params.id} CommentLists={CommentLists} postId={props.match.params.id} refreshFunction={updateComment} />
          {/* <Divider /> */}
        </Col>
      </Row>
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
  deleteFile: deleteFile.call
}

export default connect(mapStateToProps, mapStateToDispatch)(SalesLog);