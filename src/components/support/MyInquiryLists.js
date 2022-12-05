import { Button, Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { getSupportInquiryLists } from '../../redux/support/actions'

export default function MyInquiryLists() {
  const dispatch = useDispatch()
  const state = useSelector(state => state.Support)
  const [page, setPage] = useState(1)
  const history = useHistory()

  const inquiryLists = state.inquiryLists

  useEffect(() => {
    dispatch(getSupportInquiryLists.call(page))
  }, [page])

  useEffect(() => {
    if (state.loading) return
  }, [state.loading])

  const ListItem = ({ inquiry }) => (
    <div onClick={() => history.push(`/main/support/details/${inquiry.b_idx}`)} style={{ cursor: 'pointer' }}>
      <div style={{ float: 'left' }}>
        <p style={{ fontSize: 14, margin: 0, fontWeight: '400' }}>{inquiry.title}</p>
        <p style={{ fontSize: 12, color: '#666666', margin: 0 }}>{inquiry.cre_dt}</p>
      </div>
      <div style={{ float: 'right', marginRight: 10 }}>
        {inquiry.complete_yn === "N" ? <Button>처리중</Button> : <Button>처리완료</Button>}
      </div>
      <Divider style={{ margin: 8 }} />
    </div>
  )
  const handleNextPage = () => {
    if (state.loading) return
    setPage(page => page + 1)
  }
  return (
    <InfiniteScroll
      hasMore={true}
      dataLength={10}
      next={handleNextPage}
    >
      <div style={{ margin: 10 }}>
        {
          inquiryLists ?
            <>
              {
                inquiryLists.message.map(inquiry =>
                  <ListItem inquiry={inquiry} key={inquiry.b_idx} />
                )
              }
            </>
            :
            <>
              {
                state.loading ? null : <p>문의 내역이 없습니다.</p>
              }
            </>
        }
      </div>
    </InfiniteScroll>
  )
}
