import React, { useCallback, useEffect, useState, useRef } from 'react';
import List from '@material-ui/core/List';
import { Divider } from 'antd';
import Typography from '@material-ui/core/Typography';
import { base64Enc, ConvertDate } from 'constants/commonFunc';
import { useHistory } from 'react-router';
import { Tag } from "antd";
import moment from 'moment';

const NoticeItems = ({ page, setPage, data, loading, noticeType, totcnt }) => {

  const history = useHistory()
  const [hasMore, setHasMore] = useState(true)

  const getFiveDateGap = (before) => {
    const Bdate = moment(before)._d.getTime();
    const Ndate = new Date().getTime();
    if ((Ndate - Bdate) > 1000 * 60 * 60 * 24 * 5) {
      return false;
    } else if (Ndate - Bdate <= 1000 * 60 * 60 * 24 * 5) {
      return true;
    }
  }

  useEffect(() => {
    if (data) {
      if (page == 1) {
        setHasMore(true)
        return
      }
      if (data.length >= totcnt) {
        setHasMore(false)
      }
    }

  }, [loading])

  const observerRef = useRef()
  const observer = useCallback((node) => {
    if (loading) return
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting && hasMore) {
        setPage(page + 1)
      }
    })
    node && observerRef.current.observe(node)
  }, [loading, hasMore])


  return (
    <div>
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
                  <div
                    style={{ display: 'flex' }}>
                    <p style={{ color: '#333', fontSize: 14, marginRight: 5 }}>{singleList.title}</p>

                    {getFiveDateGap(singleList.cre_dt) && <Tag color="blue">New</Tag>}
                  </div>

                  <p style={{ textAlign: 'right', color: '#666', fontSize: 12 }}>{ConvertDate(singleList.cre_dt)}</p>
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
      <div ref={observer} />
    </div>
  );
}

export default NoticeItems;
