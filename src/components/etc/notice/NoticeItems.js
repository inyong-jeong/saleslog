import React, { useEffect, useState } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Divider } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux";
//import { getAllCustomer } from 'redux/customer/actions';
import { base64Enc } from 'constants/commonFunc';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory, useLocation } from 'react-router';

const NoticeItems = ({ page, setPage, data, loading, noticeType }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  let restCount

  useEffect(() => {
    console.log('data::::::::::::::::::::::', data)
    //dispatch(getAllCustomer.call(inputs, 1))
  }, [])

  const handleNextPage = () => {
    //if (listCounts >= cusotomerList.length) {
    // console.log('page::::::::::::', page)
    if (loading == true) return
    setPage(page + 1)
    //}
  }

  return (
    <InfiniteScroll
      hasMore={true}
      dataLength={20}
      next={handleNextPage}>
      {/* {loading && <CircularProgress />} */}
      <List>
        {data ?
          data.map((singleList, index) => {
            return (
              <div onClick={() => {
                (noticeType === 'group') ?
                  history.push({ pathname: `/main/etc/notice/group/detail/${base64Enc(singleList.b_idx)}/` }) :
                  history.push({ pathname: `/main/etc/notice/system/detail/${base64Enc(singleList.b_idx)}/` })
              }} key={singleList.num}>
                <ListItem style={{ height: 50, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'stretch' }}>
                    <p style={{ width: '80%', fontSize: 14, fontWeight: 500, marginBottom: 0 }}>{singleList.title}</p>
                    {/*<p style={{ width:'20%',fontSize: 12, fontWeight: 'normal', marginBottom: 0 }}>조회수:{singleList.show_count}</p>*/}
                    <p style={{ width: '20%', fontSize: 12, fontWeight: 'normal', marginBottom: 0 }}>{singleList.cre_dt}</p>
                  </div>
                </ListItem>
                <Divider style={{ margin: 0 }} />
              </div>
            )
          })
          : <div>
            <Typography > 공지사항이 없습니다.</Typography>
          </div>
        }
      </List>
    </InfiniteScroll>
  );
}

export default NoticeItems;
