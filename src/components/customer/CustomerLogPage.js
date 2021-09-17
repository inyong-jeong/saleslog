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
import { useHistory, useLocation } from 'react-router';


const CustomerLogPage = ({ customerId }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const grayTextStyles = {
    fontSize: 12,
    color: '#333333',
    textOverflow: 'ellipsis',
    display: 'block',
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '8.6em',
    lineHeight: '1.8em'

  }


  const handleNextPage = () => {
    console.log('handle page')
  }

  return (
    <InfiniteScroll
      hasMore={true}
      dataLength={10}
      next={handleNextPage}>

      <div style={{ margin: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Avatar icon={<UserOutlined />} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>홍길동</p>
            <p style={{ margin: 0, fontSize: 12, color: '#666666', fontWeight: 400 }}>영업관리부 / 영업팀 </p>
            <p style={{ margin: 0, fontSize: 14, color: '#333333', fontWeight: 300 }}>정보수집 / 대면 / 전략 니즈</p>
          </div>
          <div style={{ fontSize: 12, color: '#333333' }}>2021.07.21 12:24</div>
        </div>
        <Divider dashed style={{ marginLeft: 0, marginBottom: 2, marginTop: 4, marginRight: 0 }} />
        <div style={grayTextStyles}>고객사명. 담당자명 </div>
        <div style={{ fontSize: 14, fontWeight: 'bold' }}>타이틀 들어갈 자리 </div>
        <div style={grayTextStyles}>Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </div>
      </div>
    </InfiniteScroll>
  );
}

export default CustomerLogPage;
