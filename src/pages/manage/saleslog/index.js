import React, { useState, useEffect } from 'react';
import { getLogList, getCommentLists, getprofile } from 'redux/actions';
import { connect } from 'react-redux';
import { Row, Col } from 'antd'
import StyledCard from 'components/styledcomponent/Card'
import Chart from 'react-apexcharts';
import Comments from 'components/Comments/Comments'
import LogModal from 'components/Modal';
function SalesLog(props) {

  const [CommentLists, setCommentLists] = useState([])
  const body = {
    slog_idx: props.match.params.id
  }
  let Log = props.log && props.log[0]


  const handleOnBack = () => {
    props.history.push('/main/manage');
  }

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment))
  }

  useEffect(() => {
    if (props.match.params.id) {
      const body = {
        sidx: props.match.params.id
      }
      props.getLogList(body)
    }
  }, [])

  useEffect(() => {
    props.getCommentLists(body)
    props.getprofile()
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

  const series = [1, 1, 1, 1]
  const option = {
    labels: ['전략니즈', '상품니즈', '운영니즈', '개인니즈'],
  };

  const handleOnRevise = () => {
    props.history.push(`/main/upload/${props.match.params.id}`)
  }

  return (
    <>
      <div className='container'>
        {/* <Row> */}
        {/* <Col > */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img
            src={require('assets/icons/back.png')}
            onClick={handleOnBack}
            alt='back_logo'
            style={{ cursor: 'pointer' }} />
          <h3>영업일지 상세</h3>
          {/* <h4 onClick={handleOnClick}>편집</h4> */}
          <div style={{ display: 'flex' }}>
            {/* <LogModal buttonLabel='수정' /> */}
            <span style={{ cursor: 'pointer' }} onClick={handleOnRevise}>수정</span>
            &nbsp;
            &nbsp;
            <LogModal buttonLabel='삭제' />
          </div>
        </div>
        {/* </Col> */}
        {/* </Row> */}
      </div>
      <Row>
        <Col sm={24} xs={24} md={24} lg={24}>
          {Log && <StyledCard>
            <ul style={{ padding: '4px' }}>
              <li style={{ display: 'flex', padding: '4px' }}>
                <img
                  src={require('assets/icons/calendar.png')}
                  alt='calendar_icon' />
                <div>{Log.meeting_date}</div>
              </li>
              <li style={{ display: 'flex' }}>
                <img
                  src={require('assets/icons/calendar.png')}
                  alt='calendar_icon' />
                <div>{Log.meeting_stime} ~ {Log.meeting_etime}</div>
              </li>
              <li style={{ display: 'flex' }}>
                <img
                  src={require('assets/icons/calendar.png')}
                  alt='calendar_icon' />
                <div>{Log.addr}</div>
              </li>
              <li style={{ display: 'flex' }}>
                <img
                  src={require('assets/icons/calendar.png')}
                  alt='calendar_icon' />
                <div>{Log.sales_activity}</div>
              </li>
              <li style={{ display: 'flex' }}>
                <img
                  src={require('assets/icons/calendar.png')}
                  alt='calendar_icon' />
                <div>{Log.account_name} :</div>
              </li>
            </ul>
            <p>{Log.meeting_stime} ~ {Log.meeting_etime}</p>
            <p>{Log.addr}</p>
            <p>{Log.sales_activity}</p>
            <p>{Log.account_name} : </p>
            <p>Log</p>
          </StyledCard>}
        </Col>
      </Row>
      <Row className='mt-1'>

      </Row>
      <Row>
        <Col sm={24} xs={24} md={24} lg={24}>
          {Log && <StyledCard title='일지 내용'>
            <p>{Log.log}</p>
            <p>{Log.file1}</p>
          </StyledCard>}
        </Col>

      </Row>
      <Row >
        <Col sm={24} xs={24} md={24} lg={24}>
          <StyledCard title='니즈 분석'>
            <Chart options={option} series={series} type="donut" width='400' />
          </StyledCard>
        </Col>
      </Row>
      <Row >
        <Col sm={24} xs={24} md={24} lg={24}>
          <Comments key={props.match.params.id} CommentLists={CommentLists} postId={props.match.params.id} refreshFunction={updateComment} />
          {/* <Divider /> */}
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => {
  const { log, commentlists, commentdelete, comment, commentchange } = state.SalesLog;
  return { log, commentlists, commentdelete, comment, commentchange };
};
const mapStateToDispatch = {
  getLogList: getLogList.call,
  getCommentLists: getCommentLists.call,
  getprofile: getprofile.call

}

export default connect(mapStateToProps, mapStateToDispatch)(SalesLog);