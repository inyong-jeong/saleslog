import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useHistory } from 'react-router';
import MyAppBar from 'components/styledcomponent/MyAppBar';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationLists } from 'redux/notification/actions'
import { ConvertDate } from 'constants/commonFunc';
import { Badge } from '@material-ui/core';

const NotificationList = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state.Notification)
  const history = useHistory()

  const [hasMore, setHasMore] = useState(true)
  const [notificationList, setNotificationList] = useState([])
  const [page, setPage] = useState(null)

  const responseLists = state.notificationLists
  const notiResponse = state.getNotificationsResponse
  const isLoading = state.isLoading

  const notistyle = {
    position: 'relative',
    display: '-webkit-box',
    cursor: 'pointer',
    margin: '5px',
    padding: 10,
    whiteSpace: 'pre-wrap',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    border: '1px solid #ddd',

  }

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })
  }, [])

  useEffect(() => {
    console.log('page effect:::', isLoading, page)
      if (page) {
        dispatch(getNotificationLists.call({ 'pageno': page }))
      }
  }, [page])

  useEffect(() => {
    if (responseLists) {
      if (isLoading) return;
      if (!page) return;
      console.log('notilist::', isLoading, page, responseLists)
      if (page === 1) {
        setHasMore(true)
        setNotificationList(responseLists)
        return

      }
      if (responseLists.length < 10) {
        setHasMore(false)
      }
      setNotificationList(new Set([...notificationList, ...responseLists]))

    }
  }, [responseLists])


  const navigateTo = () => {
    history.goBack()
  }
  const handleSaleslogNoti = (uri) => {
    history.push({
      pathname: uri
    })
  }

  const observerRef = useRef()
  const observer = useCallback((node) => {
    if (isLoading) return
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting && hasMore) {
        setPage(page => page + 1)
      }
    })
    node && observerRef.current.observe(node)
  }, [isLoading, hasMore])

  const NotificationItems = ({ singleNoti }) => (
    <div style={notistyle} onClick={() => handleSaleslogNoti(singleNoti.uri)}>
      <Badge color="secondary" variant="dot" invisible={singleNoti.new_yn === 'N' ? true : false}>
        <div style={{ color: '#333', fontSize: 14, marginRight: 10 }} >{singleNoti.note}</div>
      </Badge>
      <br />
      <div style={{ float: 'right', color: '#666', fontSize: 12 }}>{ConvertDate(singleNoti.cre_dt)}</div>
    </div>

  )

  return (
    <>
      <MyAppBar
        barTitle='알림 목록'
        navigateTo={navigateTo}
      />

      <div className='content_body'>
        <div>최근 2개월 동안의 알림 목록입니다.</div>
        {
          notiResponse ?
            notificationList.map(singleNoti =>
              <NotificationItems key={singleNoti.noti_idx} singleNoti={singleNoti} />)
            :
            <div style={{ marginTop: 20, textAlign: 'center' }}>알림을 가져오는 중입니다.</div>
        }
        <div ref={observer} />
        <div style={{ marginBottom: 10 }} />
      </div>

    </>
  );
}

export default NotificationList