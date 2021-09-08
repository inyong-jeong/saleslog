import React, { useState, useEffect } from 'react';
import { Space, List, Avatar, Divider } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';


const IconText = ({ icon, text, }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function LogList({ loglist, handleNextPage }) {

  return (
    <>
      <InfiniteScroll
        hasMore={true}
        dataLength={10}
        next={handleNextPage}>
        <List key={loglist.slog_idx}
          itemLayout="vertical"
          size="large"
          // pagination={{
          //   onChange: page => {
          //     console.log(page);
          //   },
          //   pageSize: 3,
          // }}
          dataSource={[loglist]}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                <div>피드백 보기</div>
              ]}
              extra={`${item.meeting_date} ${item.meeting_stime} `}
            >
              <List.Item.Meta
                // avatar={<Avatar src={item.avatar} />}
                title={<div style={{ display: 'flex', justifyContent: 'space-between' }}><div>{item.user_name}</div><div>{item.title2}</div></div>}
                description={<div>{item.sales_gb_t}</div>}
              />
              <Divider dashed />
              <div>{item.account_name} : {item.man_name}</div>
              <h4><b>{item.title}</b></h4>
              {<div>{item.log}</div>}
            </List.Item>
          )}
        />
        <Divider />
      </InfiniteScroll>

    </>
  )
}
export default LogList;