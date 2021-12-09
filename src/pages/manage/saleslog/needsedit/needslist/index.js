import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyAppBar from 'components/styledcomponent/MyAppBar';
import { getNeedsTrainLists } from 'redux/actions';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';

export default function NeedsList(props) {
  const observerRef = useRef();
  const state = useSelector(state => state.SalesLog);
  const [body, setBody] = useState({
    pageno: 1
  });
  const [hasMore, setHasMore] = useState(true)
  const [NeedsList, setNeedsList] = useState([]);

  const dispatch = useDispatch();
  const handleOnBack = () => {
    props.history.goBack()
  }

  //학습 리스트 불러오기
  useEffect(() => {
    dispatch(getNeedsTrainLists.call(body))
  }, [body])

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
  }, [])

  // 데이터 받아 온 것 set
  useEffect(() => {
    if (state.needslist && !state.loadNeedsLoading) {
      if (body.pageno === 1) {
        setHasMore(true)
        return setNeedsList(state.needslist)
      }
      if (NeedsList.length >= state.needscount) {
        setHasMore(false);
      } else {
        setNeedsList(NeedsList.concat(state.needslist))
      }
    }
  }, [state.loadNeedsLoading])

  const observer = useCallback((node) => {
    if (state.loadNeedsLoading) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver((entries, options) => {
      if (entries[0].isIntersecting && hasMore) {
        body.pageno = body.pageno + 1
        setBody({ ...body, 'pageno': body.pageno })
      }
    })
    node && observerRef.current.observe(node)
  }, [state.loadNeedsLoading, hasMore])

  return (
    <div id='root'>
      <MyAppBar
        barTitle={'학습 요청 목록'}
        showBackButton
        navigateTo={handleOnBack}
      />
      <div className='content_body'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">요청일자</th>
              <th scope="col">핵심키워드</th>
              <th scope="col">식별키워드</th>
              <th scope="col">적용 니즈</th>
              <th scope="col">학습 상태</th>
            </tr>
          </thead>
          <tbody>
            {NeedsList.length > 0 && NeedsList.map((v, i) => {
              return (
                <tr key={i}>
                  <th scope="row" >{v.cre_dt}</th>
                  <td style={{ width: '27%' }}>{v.keywords1}</td>
                  <td style={{ width: '27%' }}>{v.keywords2}</td>
                  <td >{v.new_needs_cod}</td>
                  <td >{v.learning_status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div ref={observer} />
    </div>
  )
}
