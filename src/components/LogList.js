import React, { useEffect } from 'react';
import { List, Divider, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, withRouter } from 'react-router-dom';
import cmm from 'constants/common';
import { useSelector } from "react-redux";
import styles from '../assets/style/Main.module.css'
import { ReactComponent as Dot } from '../assets/icons/main/dot.svg'
import { ReactComponent as Feedback } from '../assets/icons/main/feedback.svg'
import { useHistory } from 'react-router';
function LogList({ loglist, handleNextPage, loglists }) {

  const history = useHistory()
  const grayTextStyles = {
    fontSize: 12,
    color: '#333333',
    textOverflow: 'ellipsis',
    display: 'block',
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '8.6em',
    lineHeight: '1.8em',
    fontWeight: 300
  }


  const handleLogClick = (loglist) => {
    history.push(`/main/manage/saleslog/${loglist.slog_idx}`)
  }
  const SalesLogItem = ({ loglist }) => (

    <>
      <div className={styles.logWrapper} onClick={() => handleLogClick(loglist)}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 10 }}>
            <Avatar src={cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + loglist.thumb_url} />
          </div>
          <div style={{ flexGrow: 2 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{loglist.user_name}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#666666', fontWeight: 400 }}>{loglist.dept_fname} { }</p>
            <p style={{ margin: 0, fontSize: 12, color: '#333333', fontWeight: 300 }}>{loglist.sales_goal_t}<Dot /> {loglist.sales_activity_t} <Dot /> {loglist.needs_cods}</p>
          </div>
          <div style={{ fontSize: 12, color: '#333333', fontWeight: 400 }}>{loglist.meeting_date} {loglist.meeting_time}</div>
        </div>
        <Divider dashed style={{ marginLeft: 0, marginBottom: 2, marginTop: 4, marginRight: 0 }} />
        <div style={grayTextStyles}>{loglist.account_name} <Dot /> {loglist.man_name}<Dot /> {loglist.man_posi} </div>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{loglist.title}</div>
        <div style={grayTextStyles}>{loglist.log} </div>
        <div style={{ display: 'flex', height: 85 }}>
          {(loglist.file1 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file1} />}
          {(loglist.file2 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file2} />}
          {(loglist.file3 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file3} />}
          {(loglist.file4 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file4} />}
          {(loglist.file5 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file5} />}
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#333333',
            fontWeight: 400,
          }}>
          <Feedback /> 피드백 {loglist.feedback_cnt}개</div>
      </div>
      <Divider style={{ marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0 }} />
    </>
  )

  return (
    <>
      <InfiniteScroll
        hasMore={true}
        dataLength={loglists.length}
        next={handleNextPage}>
        <div>
          {
            <SalesLogItem loglist={loglist} />
          }
        </div>
      </InfiniteScroll>

    </>
  )
}
export default LogList;