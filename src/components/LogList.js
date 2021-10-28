import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import cmm from 'constants/common';
import styles from '../assets/style/Main.module.css'
import { ReactComponent as Dot } from '../assets/icons/main/dot.svg'
import { ReactComponent as Feedback } from '../assets/icons/main/feedback.svg'
import { useHistory } from 'react-router';
import { base64Enc, ConvertDate } from "constants/commonFunc";
import memberPng from 'assets/icons/workgroup/member.png'
import Highlighter from "react-highlight-words";

// import useResizeObserver from 'components/useResizeObserver';
function LogList({ loglist, handleNextPage, loglists, tabkey, data }) {
  const state = useSelector(state => state.SalesLog);

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
    lineHeight: '2',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 5,
    textOverflow: 'ellipsis',
    whiteSpace: 'pre-wrap'

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

  const orangebox = {
    fontSize: 12,
    backgroundColor: '#F6F6F6',
    // marginLeft: 6,
    color: '#F09A32',
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


  const FileList = () => (

    <div style={{ display: 'flex' }}>
      {(loglist.file1 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file1} />}
      {(loglist.file2 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file2} />}
      {(loglist.file3 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file3} />}
      {(loglist.file4 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file4} />}
      {(loglist.file5 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file5} />}
    </div>

  )


  const handleLogClick = (loglist) => {
    history.push({
      pathname: `/main/manage/saleslog/${base64Enc(loglist.slog_idx)}`
    })
  }
  const SalesLogItem = ({ loglist, tabkey }) => (

    <>
      <div className={styles.logWrapper} onClick={() => handleLogClick(loglist)} style={{ position: 'relative' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 10 }}>
            <Avatar src={cmm.isEmpty(loglist.thumb_url) ? memberPng : (cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + loglist.thumb_url)} />
          </div>
          <div style={{ flexGrow: 2 }}>
            <span style={{ margin: 0, fontSize: 14, fontWeight: 500 }}><strong>{loglist.user_name}</strong></span><span>&nbsp;</span>
            <div className='mt-1'></div>
            <span style={{ margin: 0, fontSize: 12, color: '#666666', fontWeight: 400 }}>{loglist.dept_fname}</span>
            <div className='mt-1'></div>
            {(tabkey === '0010001') ?
              <p style={{ margin: 0, fontSize: 12, color: '#333333', fontWeight: 300 }}><span style={bluebox}>{loglist.sales_goal_t}</span><span>&#183;</span> <span style={bluebox}>{loglist.sales_activity_t}</span> {loglist.needs_cods && <><span>&#183;</span><span style={orangebox}> {loglist.needs_cods}</span></>}</p>
              : <p style={{ margin: 0, fontSize: 12, color: '#333333', fontWeight: 300 }}><span style={bluebox}>{loglist.sales_goal_t}</span><span>&#183;</span> <span style={bluebox}>{loglist.sales_activity_t}</span> {loglist.needs_cods && <><span>&#183;</span><span style={orangebox}> {loglist.needs_cods}</span></>}</p>}
            <div className='mt-1'></div>

          </div>

          <div style={{ fontSize: 12, color: '#333333', fontWeight: 400 }}>{ConvertDate(loglist.meeting_date)} {loglist.meeting_stime}</div>
        </div>
        <Divider dashed style={{ marginLeft: 0, marginBottom: 2, marginTop: 4, marginRight: 0 }} />
        <div className='mt-1'></div>
        {(tabkey === '0010001') ?
          <div style={grayTextStyles}><span style={greenbox}>
            <Highlighter
              highlightClassName="Account_name"
              searchWords={[state.keyword]}
              autoEscape={true}
              textToHighlight={loglist.account_name}
            />
          </span> <span>&#183;</span><span style={greenbox}>
              <Highlighter
                highlightClassName="man_name"
                searchWords={[state.keyword]}
                autoEscape={true}
                textToHighlight={loglist.man_name}
              />
              <span>&nbsp;</span>

              {loglist.man_posi}
            </span>
          </div>
          :
          <div style={grayTextStyles}><span style={greenbox}>
            <Highlighter
              highlightClassName="Account_name2"
              searchWords={[state.keyword]}
              autoEscape={true}
              textToHighlight={loglist.account_name}
            />
          </span> <span>&#183;</span><span style={greenbox}>
              <Highlighter
                highlightClassName="man_name2"
                searchWords={[state.keyword]}
                autoEscape={true}
                textToHighlight={loglist.man_name}
              />
              <span>&nbsp;</span>
              {loglist.man_posi}
            </span><span>&#183;</span> <span style={bluebox}>{loglist.score}</span></div>
        }
        <div className='mt-1'></div>

        <div style={{ fontSize: 16, fontWeight: 500 }}><strong>
          <Highlighter
            highlightClassName="Title"
            searchWords={[state.keyword]}
            autoEscape={true}
            textToHighlight={loglist.title}
          />
        </strong></div>
        <div className='mt-1'></div>
        <div>
          <Highlighter
            style={contentstyles}
            highlightClassName="Log"
            searchWords={[state.keyword]}
            autoEscape={true}
            textToHighlight={loglist.log}
          />
        </div>

        <div className='mt-1'></div>
        <FileList />
        {/* <div style={{ display: 'flex' }}>
          {(loglist.file1 !== '') && <Avatar size={60} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file1} />}
          {(loglist.file2 !== '') && <Avatar size={60} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file2} />}
          {(loglist.file3 !== '') && <Avatar size={60} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file3} />}
          {(loglist.file4 !== '') && <Avatar size={60} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file4} />}
          {(loglist.file5 !== '') && <Avatar size={60} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + loglist.file5} />}
        </div> */}
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
            <SalesLogItem loglist={loglist} tabkey={tabkey} />
          }
        </div>
      </InfiniteScroll>

    </>
  )
}
export default React.memo(LogList);