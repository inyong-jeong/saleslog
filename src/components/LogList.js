import React, { useEffect } from 'react';
import { List, Divider, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, withRouter } from 'react-router-dom';
import cmm from 'constants/common';
import { useSelector } from "react-redux";


function LogList({ loglist, handleNextPage, loglists }) {

  return (
    <>
      <InfiniteScroll
        hasMore={true}
        dataLength={loglists.length} h
        next={handleNextPage}>
        <List key={loglist.slog_idx}
          className='log_lists'
          itemLayout="vertical"
          size="large"
          dataSource={[loglist]}
          renderItem={item => (
            <Link to={`/main/manage/saleslog/${loglist.slog_idx}`}>
              <List.Item
                key={item.title}
                actions={[
                  <div>{`피드백 ${item.feedback_cnt}개 보기`}</div>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + item.thumb_url} />}
                  title={
                    <div >
                      <div>{item.user_name} <span>&#183;</span>{item.dept_fname} </div>
                      <div>{`${item.meeting_date} ${item.meeting_stime} `}</div>
                    </div>
                  }
                  description={
                    <div>
                      <span>{item.sales_goal_t}</span>
                      <span>&#183;</span>
                      <span>{item.sales_activity_t}</span>
                      <span>&#183;</span>
                      <span>{item.needs_cods}</span>
                    </div>
                  }
                />
                <Divider dashed />
                <div>{item.account_name} <span>&#183;</span> {item.man_name} <span>&#183;</span> {item.man_posi}</div>
                <h4><b>{item.title}</b></h4>
                <div>{item.log}</div>
                <div style={{ display: 'flex' }}>
                  {(item.file1 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + item.file1} />}
                  {(item.file2 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + item.file2} />}
                  {(item.file3 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + item.file3} />}
                  {(item.file4 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + item.file4} />}
                  {(item.file5 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + item.file5} />}
                </div>
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