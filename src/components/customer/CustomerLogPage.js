import React, { useEffect, useState } from 'react';
import { Divider, Avatar } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory, useParams } from 'react-router';
import { getLogLists } from '../../redux/saleslog/actions';
import { ReactComponent as Dot } from '../../assets/icons/main/dot.svg'
import { base64Dec, base64Enc, ConvertDate } from '../../constants/commonFunc';
import styles from '../../assets/style/Main.module.css'
import cmm from 'constants/common';
import { ReactComponent as Feedback } from '../.././assets/icons/main/feedback.svg'
import CustomFab from '../styledcomponent/CustomFab';
import Highlighter from "react-highlight-words";

const CustomerLogPage = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const state = useSelector(state => state.SalesLog)
  const stateAccount = useSelector(state => state.Customer)

  const loglist = state.loglist
  const [page, setPage] = useState(1)
  const [inputs, setInputs] = useState(stateAccount.accountKey ?
    {
      'accts': base64Dec(params.accId),
      'log_gb': stateAccount.accountKey,
      'sales_man': '',
      'sales_lead_gb': '',
      'sales_goal': '',
      'sales_activity': '',
      'accts_man': '',
      'srch': '',
      'pageno': page,
      'need_cod': '',
      'dept_idx': '',
    }
    :
    {
      'accts': base64Dec(params.accId),
      'log_gb': '',
      'sales_man': '',
      'sales_lead_gb': '',
      'sales_goal': '',
      'sales_activity': '',
      'accts_man': '',
      'srch': '',
      'pageno': page,
      'need_cod': '',
      'dept_idx': '',
    })

  const bluebox = {
    fontSize: 12,
    backgroundColor: '#F6F6F6',
    color: '#398fff',
    fontWeight: 400,
    padding: 4,
    borderRadius: '3px'
  }

  const orangebox = {
    fontSize: 12,
    backgroundColor: '#F6F6F6',
    color: '#F09A32',
    fontWeight: 400,
    padding: 4,
    borderRadius: '3px'
  }

  const greenbox = {
    fontSize: 12,
    backgroundColor: '#F6F6F6',
    color: 'green',
    fontWeight: 400,
    padding: 4,
    borderRadius: '3px'
  }

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

  const contentstyles = {
    position: 'relative',
    display: '-webkit-box',
    lineHeight: '',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 5,
    textOverflow: 'ellipsis',
  }

  // useEffect(() => {
  //   if (stateAccount.accountKey === '1') {
  //     setInputs({ ...inputs, log_gb: '' })

  //   } else if (stateAccount.accountKey === '2') {
  //     setInputs({ ...inputs, log_gb: '0010001' })

  //   } else {
  //     setInputs({ ...inputs, log_gb: '0010002' })

  //   }
  // }, [])

  useEffect(() => {
    dispatch(getLogLists.call(inputs))

    return () => {
      // 다른곳에서 이동하면 그전 기록이 GET_SALESLOG 에 남아있어서 잠깐 보임 여기서 cleanup...? 
      //ref 로 clear 해보기 

    }
  }, [inputs])

  useEffect(() => {
    if (state.loadLogsDone) {
      state.StoredData.data.log_gb = '0010001';
      state.StoredData.data.accts = '';
      state.loadLogsDone = false;
    }
  }
    , [state.loadLogsDone])

  const handleLogClick = (singleList) => {
    history.push(`/main/manage/saleslog/${base64Enc(singleList.slog_idx)}`)
  }

  const CustomerLogItem = ({ singleList }) => (

    <>
      <div className={styles.logWrapper} onClick={() => handleLogClick(singleList)} style={{ position: 'relative' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 10 }}>
            <Avatar src={cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + singleList.thumb_url} />
          </div>
          <div style={{ flexGrow: 2 }}>
            <span style={{ margin: 0, fontSize: 14, fontWeight: 500 }}><strong>{singleList.user_name}</strong>&nbsp;</span>
            <div className='mt-1'></div>
            <span style={{ margin: 0, fontSize: 12, color: '#666666', fontWeight: 400 }}>{singleList.dept_fname}</span>
            <div className='mt-1'></div>
            <p style={{ margin: 0, fontSize: 12, color: '#333333', fontWeight: 300 }}><span style={bluebox}>{singleList.sales_goal_t}</span><span>&#183;</span>
              <span style={bluebox}>{singleList.sales_activity_t}</span> {singleList.needs_cods && <><span>&#183;</span><span style={orangebox}> {loglist.needs_cods}</span></>}</p>
            <div className='mt-1'></div>
          </div>
          <div style={{ fontSize: 12, color: '#333333', fontWeight: 400 }}>{ConvertDate(singleList.meeting_date)} {singleList.meeting_stime}</div>
        </div>
        <Divider dashed style={{ marginLeft: 0, marginBottom: 2, marginTop: 4, marginRight: 0 }} />
        <div className='mt-1'></div>

        <div style={grayTextStyles}>
          <span style={greenbox}>
            <Highlighter
              highlightClassName="Account_name"
              searchWords={[state.keyword]}
              autoEscape={true}
              textToHighlight={singleList.account_name}
            />
          </span> <span>&#183;</span>
          <span style={greenbox}>
            <Highlighter
              highlightClassName="man_name"
              searchWords={[state.keyword]}
              autoEscape={true}
              textToHighlight={singleList.man_name}
            />
            <span>&nbsp;</span>

            {singleList.man_posi}
          </span>
        </div>

        <div className='mt-1'></div>

        <div style={{ fontSize: 16, fontWeight: 500 }}><strong>
          <Highlighter
            highlightClassName="Title"
            searchWords={[state.keyword]}
            autoEscape={true}
            textToHighlight={singleList.title}
          />
        </strong></div>
        <div className='mt-1'></div>
        <div>
          <Highlighter
            style={contentstyles}
            highlightClassName="Log"
            searchWords={[state.keyword]}
            autoEscape={true}
            textToHighlight={singleList.log}
          />
        </div>

        <div className='mt-1'></div>
        <div style={{ display: 'flex' }}>
          {(singleList.file1 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + singleList.file1} />}
          {(singleList.file2 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + singleList.file2} />}
          {(singleList.file3 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + singleList.file3} />}
          {(singleList.file4 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + singleList.file4} />}
          {(singleList.file5 !== '') && <Avatar size={64} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + singleList.file5} />}
        </div>
        <div
          style={{
            position: 'relative',
            bottom: 0,
            fontSize: 12,
            color: '#333333',
            fontWeight: 400,
          }}>
          <Feedback /> 피드백 {singleList.feedback_cnt}개</div>
      </div>
      <Divider style={{ marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0, borderWidth: '5px' }} />
    </>


  )

  const handleNextPage = () => {
    if (state.loadLogsDone) setPage(page + 1)

  }

  const navigateTo = () => history.push('/main/upload')

  return (
    <InfiniteScroll
      hasMore={true}
      dataLength={10}
      next={handleNextPage}>
      <div>
        {
          loglist && state.loglistcount != 0 ?
            loglist.map(singleList =>
              <CustomerLogItem singleList={singleList} key={singleList.slog_idx} />
            ) : <div style={{ fontSize: 14, fontWeight: 500, textAlign: 'center' }}>
              <p>해당 고객사로 등록된 일지가 없습니다.</p>
              <Divider />
              <p>일지는 Master와 소속 조직의 Chief, Manager로 열람 권한이 적용됩니다.</p>
            </div>
        }

      </div>
      <CustomFab navigateTo={navigateTo} />

    </InfiniteScroll>
  );
}

export default CustomerLogPage;
