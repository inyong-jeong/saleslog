import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Divider } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux";
import Text from 'antd/lib/typography/Text';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory, useLocation, useParams } from 'react-router';
import { getLogLists } from '../../redux/saleslog/actions';
import { ReactComponent as Dot } from '../../assets/icons/main/dot.svg'



const CustomerLogPage = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const state = useSelector(state => state.SalesLog)
  const loglist = state.loglist

  const [inputs, setInputs] = useState({
    'accts': params.accId,
    'log_gb': '',
    'sales_man': '',
    'sales_lead_gb': '',
    'sales_goal': '',
    'sales_activity': '',
    'accts_man': '',
    'srch': '',
    'pageno': 1
  })

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
  useEffect(() => {
    dispatch(getLogLists.call(inputs))
  }, [])

  const handleLogClick = () => {
    //해당 일지로 이동 
  }

  const CustomerLogItem = ({ singleList }) => (
    <div style={{ cursor: 'pointer' }} onClick={handleLogClick}>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 10 }}>
          <Avatar icon={<UserOutlined />} />
        </div>
        <div style={{ flexGrow: 2 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{singleList.user_name}</p>
          <p style={{ margin: 0, fontSize: 12, color: '#666666', fontWeight: 400 }}>영업관리부 <Dot /> 영업팀 </p>
          <p style={{ margin: 0, fontSize: 12, color: '#333333', fontWeight: 300 }}>정보수집 <Dot /> 대면 <Dot /> 전략 니즈</p>
        </div>
        <div style={{ fontSize: 12, color: '#333333', fontWeight: 400 }}>{singleList.meeting_date}</div>
      </div>
      <Divider dashed style={{ marginLeft: 0, marginBottom: 2, marginTop: 4, marginRight: 0 }} />
      <div style={grayTextStyles}>{singleList.account_name} <Dot /> {singleList.man_name} </div>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{singleList.title}</div>
      <div style={grayTextStyles}>{singleList.log} </div>
      <Divider style={{ marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0 }} />
    </div>


  )

  const handleNextPage = () => {
    console.log('handle page')
  }

  return (
    <InfiniteScroll
      hasMore={true}
      dataLength={10}
      next={handleNextPage}>
      <div style={{ margin: 10 }}>
        {
          loglist ?
            loglist.map((singleList, index) =>
              <CustomerLogItem singleList={singleList} key={singleList.slog_idx} />
            ) :
            <div style={{ fontSize: 14, fontWeight: 500, textAlign: 'center' }}>해당 고객사로 등록된 일지가 없습니다.</div>
        }

      </div>
    </InfiniteScroll>
  );
}

export default CustomerLogPage;
