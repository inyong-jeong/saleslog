import React, { useRef } from 'react';
import { Divider, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import cmm from 'constants/common';
import styles from '../assets/style/Main.module.css'
import { ReactComponent as Dot } from '../assets/icons/main/dot.svg'
import { ReactComponent as Feedback } from '../assets/icons/main/feedback.svg'
import { useHistory } from 'react-router';
import { base64Enc } from "constants/commonFunc";

// import useResizeObserver from 'components/useResizeObserver';
function LogList({ loglist, handleNextPage, loglists, tabkey, data }) {

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
  //글자수 제한 더보기 
  const contentRef = useRef(null);
  // const [isShowReadMore, setIsShowReadMore] = useState(false);
  // const observeCallback = (entries) => {
  //   for (let entry of entries) {
  //     console.log(entry)
  //     if (entry.target.scrollHeight > entry.contentRect.height) {
  //       setIsShowReadMore(true);
  //     } else {
  //       setIsShowReadMore(false);
  //     }
  //   }
  // };
  // useResizeObserver({ callback: observeCallback, element: contentRef });
  // const onClick = (e) => {
  //   contentRef.current.classList.add("show");


  const contentstyles = {
    position: 'relative',
    display: '-webkit-box',
    lineHeight: '',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 5,
    textOverflow: 'ellipsis',

  }

  const bluebox = {
    fontSize: 12,
    backgroundColor: '#F6F6F6',
    // marginLeft: 6,
    color: '#000fff',
    fontWeight: 400,
    padding: 4,
    borderRadius: '3px'
  }

  const greenbox = {
    fontSize: 12,
    backgroundColor: '#F6F6F6',
    // marginLeft: 6,
    color: 'green',
    fontWeight: 400,
    padding: 4,
    borderRadius: '3px'
  }


  const handleLogClick = (loglist, loglists, data) => {
    history.push({
      pathname: `/main/manage/saleslog/${base64Enc(loglist.slog_idx)}`,
      state: {
        loglists: loglists,
        data: data
      }
    })
  }
  const SalesLogItem = ({ loglist, tabkey, loglists, data }) => (


    <>
      <div className={styles.logWrapper} onClick={() => handleLogClick(loglist, loglists, data)} style={{ position: 'relative' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 10 }}>
            <Avatar src={cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + loglist.thumb_url} />
          </div>
          <div style={{ flexGrow: 2 }}>
            <span style={{ margin: 0, fontSize: 14, fontWeight: 500 }}><strong>{loglist.user_name}</strong></span><span>&nbsp;</span>
            <span style={{ margin: 0, fontSize: 12, color: '#666666', fontWeight: 400 }}>{loglist.dept_fname}</span>
            {(tabkey === '0010001') ?
              <p style={{ margin: 0, fontSize: 12, color: '#333333', fontWeight: 300 }}><span style={bluebox}>{loglist.sales_goal_t}</span><Dot /> <span style={bluebox}>{loglist.sales_activity_t}</span> <Dot /><span style={bluebox}> {loglist.needs_cods}</span></p>
              : <p style={{ margin: 0, fontSize: 12, color: '#333333', fontWeight: 300 }}><span style={bluebox}>{loglist.score}</span><Dot /><span style={bluebox}>{loglist.sales_goal_t}</span><Dot /> <span style={bluebox}>{loglist.sales_activity_t}</span> <Dot /> <span style={bluebox}>{loglist.needs_cods}</span></p>}

          </div>
          <div style={{ fontSize: 12, color: '#333333', fontWeight: 400 }}>{loglist.meeting_date} {loglist.meeting_stime}</div>
        </div>
        <Divider dashed style={{ marginLeft: 0, marginBottom: 2, marginTop: 4, marginRight: 0 }} />
        <div style={grayTextStyles}><span style={greenbox}>{loglist.account_name}</span> <Dot /><span style={greenbox}> {loglist.man_name} {loglist.man_posi}</span> </div>

        <div style={{ fontSize: 14, fontWeight: 500 }}><strong>{loglist.title}</strong></div>
        <div className='mt-1'></div>
        {/* <div style={grayTextStyles}>{loglist.log} </div>
         */}
        <div>
          <div style={contentstyles} ref={contentRef}>{loglist.log}</div>
        </div>

        <div className='mt-1'></div>
        <div style={{ display: 'flex' }}>
          {(loglist.file1 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file1} />}
          {(loglist.file2 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file2} />}
          {(loglist.file3 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file3} />}
          {(loglist.file4 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file4} />}
          {(loglist.file5 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file5} />}
        </div>
        {/* { xs: 80, sm: 80, md: 80, lg: 80, xl: 80, xxl: 100 } */}

        <div
          style={{
            position: 'relative',
            bottom: 0,
            fontSize: 12,
            color: '#333333',
            fontWeight: 400,
          }}>
          <Feedback /> 피드백 {loglist.feedback_cnt}개</div>
      </div>
      <Divider style={{ marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0, borderWidth: '5px' }} />
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
            <SalesLogItem loglist={loglist} tabkey={tabkey} loglists={loglists} data={data} />
          }
        </div>
      </InfiniteScroll>

    </>
  )
}
export default LogList;