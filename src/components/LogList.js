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


  const handleLogClick = (loglist) => {
    history.push(`/main/manage/saleslog/${base64Enc(loglist.slog_idx)}`)
  }
  const SalesLogItem = ({ loglist }) => (


    <>
      <div className={styles.logWrapper} onClick={() => handleLogClick(loglist)} style={{ position: 'relative' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 10 }}>
            <Avatar src={cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + loglist.thumb_url} />
          </div>
          <div style={{ flexGrow: 2 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}><strong>{loglist.user_name}</strong></p>
            <p style={{ margin: 0, fontSize: 12, color: '#666666', fontWeight: 400 }}>{loglist.dept_fname} { }</p>
            <p style={{ margin: 0, fontSize: 12, color: '#333333', fontWeight: 300 }}>{loglist.sales_goal_t}<Dot /> {loglist.sales_activity_t} <Dot /> {loglist.needs_cods}</p>
          </div>
          <div style={{ fontSize: 12, color: '#333333', fontWeight: 400 }}>{loglist.meeting_date} {loglist.meeting_stime}</div>
        </div>
        <Divider dashed style={{ marginLeft: 0, marginBottom: 2, marginTop: 4, marginRight: 0 }} />
        <div style={grayTextStyles}>{loglist.account_name} <Dot /> {loglist.man_name}<Dot /> {loglist.man_posi} </div>
        <div style={{ fontSize: 14, fontWeight: 500 }}><strong>{loglist.title}</strong></div>
        <div className='mt-1'></div>
        {/* <div style={grayTextStyles}>{loglist.log} </div>
         */}
        <div>
          <div style={contentstyles} ref={contentRef}>{loglist.log}</div>
        </div>

        <div className='mt-1'></div>
        <div style={{ display: 'flex' }}>
          {(loglist.file1 !== '') && <Avatar size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file1} />}
          {(loglist.file2 !== '') && <Avatar size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file2} />}
          {(loglist.file3 !== '') && <Avatar size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file3} />}
          {(loglist.file4 !== '') && <Avatar size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file4} />}
          {(loglist.file5 !== '') && <Avatar size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file5} />}
        </div>
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