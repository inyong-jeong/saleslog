import React, { useState, useEffect } from "react";
import CustomFab from "components/styledcomponent/CustomFab";
import styles from 'components/customer/styles/Customer.module.css'
import MyAppBar from "components/styledcomponent/MyAppBar";
import { Input, Divider } from "antd";
import { useHistory } from "react-router-dom";
import NoticeItems from "components/etc/notice/NoticeItems";
import { getNoticeGrpList } from "redux/etc/actions";
import { useSelector, useDispatch } from "react-redux";
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { getUserInfo } from 'helpers/authUtils';
import { base64Enc } from 'constants/commonFunc';

const { Search } = Input;
const AnniversaryPage = () => {

  const myInfo = getUserInfo();
  const history = useHistory()
  const navigateTo = () => history.push({ pathname: '/main/etc/notice/group/register' })
  const dispatch = useDispatch()
  const state = useSelector(state => state.Etc)
  const loading = state.loading
  const [noticeList, setNoticeList] = useState([])
  const [page, setPage] = useState(1)
  const [inputs, setInputs] = useState({
    srch: '',
    pageno: page,
  })


  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })
    dispatch(getNoticeGrpList.call(inputs))
  }, [])

  useEffect(() => {
    if (page == 1 && loading == false) {
      dispatch(getNoticeGrpList.call({ srch: inputs.srch, pageno: page }))
    }
  }, [inputs])

  useEffect(() => {
    if (loading == true) return
    dispatch(getNoticeGrpList.call({ srch: inputs.srch, pageno: page }))
  }, [page])


  useEffect(() => {
    if (state.getNoticeGrpListRes && loading == false) {
      if (page == 1) {
        return setNoticeList(state.getNoticeGrpListRes)
      }
      setNoticeList(noticeList.concat(state.getNoticeGrpListRes))
    }
  }, [state.getNoticeGrpListRes])

  const handleOnClick = (acc_idx, accm_idx) => {
    history.push(`/main/manager/profile/${base64Enc(acc_idx)}/${base64Enc(accm_idx)}`)
  }
  return (
    <div>
      <MyAppBar barTitle={'다가오는 생일'} />
      <div className='content_body'>


        {state.postAnniveraryResponse.length > 0 ? state.postAnniveraryResponse[0].map(item => (

          <div
            className={styles.dateItem}
          >
            <div style={{ display: 'flex', marginBottom: 2, alignItems: 'center', cursor: 'pointer' }}
              onClick={() => handleOnClick(item.acc_idx, item.accm_idx)}>
              <p style={{ margin: 0, fontWeight: 500, fontSize: 14, color: '#111111' }}>{item.man_name}</p>
              <p style={{ margin: 0, fontWeight: 400, fontSize: 12, color: '#666666', marginLeft: 5, flexGrow: 2 }}>{item.account_name}</p>
              <p style={{ margin: 0, color: '#666666', fontSize: 12 }}>생일 : {item.days}</p>
            </div>
            <Divider />
          </div>

        )) :
          <><div style={{ fontSize: 16 }}>최근 30일 이내에 나가오는 생일이 없습니다</div></>
        }

        {/* {myInfo.permission != 9 ?
          <div className={styles.Wrapper}>
            <CustomFab navigateTo={navigateTo} />
          </div>
          : null} */}

      </div>
    </div>
  );
}

export default AnniversaryPage;