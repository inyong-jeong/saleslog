import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useHistory } from 'react-router';
import MyAppBar from 'components/styledcomponent/MyAppBar';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationLists } from 'redux/notification/actions'
import { ConvertDate } from 'constants/commonFunc';
import { Divider } from 'antd'

const NotificationList = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state.Notification)
  const history = useHistory()

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [notificationList, setNotificationList] = useState([])

  const responseLists = state.notificationLists
  const notiResponse = state.getNotificationsResponse
  const isLoading = state.isLoading

  const notistyle = {
    height: 55,
    cursor: 'pointer',
    margin: '5px 0',
    padding: 10,
    //borderRadius: 5
    border: '1px solid #ddd',
  }

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })

  }, [])

  useEffect(() => {
    dispatch(getNotificationLists.call({ 'pageno': page }))
  }, [page])

  useEffect(() => {
    if (responseLists && !isLoading) {
      if (page === 1) {

        setHasMore(true)
        setNotificationList(responseLists)
        return
      }

      if (responseLists.length <= 10) {
        setHasMore(false)
      }
      setNotificationList(notificationList.concat(responseLists))
    }

  }, [isLoading])

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
      <p style={{ color: '#333', fontSize: 14 }} >{singleNoti.note}</p>
      <p style={{ textAlign: 'right', color: '#666', fontSize: 12 }}>{ConvertDate(singleNoti.cre_dt)}</p>
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
              <NotificationItems key={singleNoti.noti_idx} singleNoti={singleNoti} />

            )
            :
            <div>알림을 가져오는 중입니다.</div>
        }
        <div ref={observer} />
        <div style={{ marginBottom: 10 }} />
      </div>

    </>
  );
}

export default NotificationList