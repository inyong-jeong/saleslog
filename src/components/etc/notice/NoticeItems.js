import React from 'react';
import List from '@material-ui/core/List';
import { Divider } from 'antd';
import Typography from '@material-ui/core/Typography';
import { base64Enc } from 'constants/commonFunc';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router';

const NoticeItems = ({ page, setPage, data, loading, noticeType }) => {

  const history = useHistory()

  const handleNextPage = () => {
    if (loading == true) return
    setPage(page + 1)
  }

  return (
    <InfiniteScroll
      hasMore={true}
      dataLength={20}
      next={handleNextPage}>

      <List>
        {data ?
          data.map(singleList => {
            return (
              <div
                onClick={() => {
                  (noticeType === 'group') ?
                    history.push({ pathname: `/main/etc/notice/group/detail/${base64Enc(singleList.b_idx)}` }) :
                    history.push({ pathname: `/main/etc/notice/system/detail/${base64Enc(singleList.b_idx)}` })
                }}
                key={singleList.b_idx} >
                <div style={{ height: 50, cursor: 'pointer' }}>
                  <p style={{ color: '#333', fontSize: 14 }}>{singleList.title}</p>
                  <p style={{ textAlign: 'right', color: '#666', fontSize: 12 }}>{singleList.cre_dt}</p>
                  <Divider style={{ margin: 0 }} />
                </div>
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
