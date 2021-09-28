import React, { useEffect } from 'react';
import { Space, List, Divider, Badge, Avatar } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, withRouter } from 'react-router-dom';

function LogList({ loglist, handleNextPage, loglists }, props) {
  const BadgeStyle = {
    color: '#f5222d',
    cursor: 'pointer'
  }
  // console.log(loglist)
  return (
    <>
      <InfiniteScroll
        hasMore={true}
        dataLength={loglists.length} h
        next={handleNextPage}>
        <List key={loglist.slog_idx}
          className='log_lists'
          // onClick={handleOnClick}
          itemLayout="vertical"
          size="large"
          dataSource={[loglist]}
          renderItem={item => (
            <Link to={`/main/manage/saleslog/${loglist.slog_idx}`}>
              <List.Item
                key={item.title}
                actions={[
                  <div>피드백 0개 보기</div>
                ]}
                extra={`${item.meeting_date} ${item.meeting_stime} `}
              >
                <List.Item.Meta
                  // avatar={<Avatar src={item.avatar} />}h
                  title={<div style={{ display: 'flex', justifyContent: 'space-between' }}><div>{item.user_name}</div><div>{item.title2}</div></div>}
                  description={<div>{item.sales_gb_t}</div>}
                />
                <Divider dashed />
                <div>{item.account_name} : {item.man_name}</div>
                <h4><b>{item.title}</b></h4>
                <div>{item.log}</div>
                <h2>{item.num}</h2>
                {/* <Badge className='mr-2' count={<CloseOutlined style={BadgeStyle} />}>
                <Avatar shape="square" size="large" />
              </Badge>
              <Badge className='mr-2' count={<CloseOutlined style={BadgeStyle} />}>
                <Avatar shape="square" size="large" />
              </Badge>
              <Badge className='mr-2' count={<CloseOutlined style={BadgeStyle} />}>
                <Avatar shape="square" size="large" />
              </Badge>
              <Badge className='mr-2' count={<CloseOutlined style={BadgeStyle} />}>
                <Avatar shape="square" size="large" />
              </Badge>
              <Badge count={<CloseOutlined style={BadgeStyle} />}>
                <Avatar shape="square" size="large" />
              </Badge> */}

                {/* <ul style={{ display: 'flex' }}>
                <li>s{item.file1}</li>
                <li>s{item.file2}</li>
                <li>s{item.file3}</li>
                <li>s{item.file4}</li>
                <li>s{item.file5}</li>
              </ul> */}

              </List.Item>
            </Link>

          )}
        />
        <Divider />
      </InfiniteScroll>

    </>
  )
}
export default withRouter(LogList);