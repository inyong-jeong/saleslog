
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import { useHistory } from 'react-router';
import { Button, Checkbox, } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getWorkGroupInfo, postWorkGroupOut } from 'redux/workgroup/actions';
import { errorMessage } from '../../../constants/commonFunc';

const WgroupMemberPage = () => {
  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const dispatch = useDispatch()
  const [groupInfo, setGroupInfo] = useState()

  const [inputs, setInputs] = useState(
    {
      checked: false,
      out_reason: 'self',
    }
  )
  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  //이전페이지
  const navigateTo = () => history.push('/main/workgroup')

  useEffect(() => {
    // 하단 네비 설정 
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })

    //워크그룹 정보 가져오기
    dispatch(getWorkGroupInfo.call())

  }, [])

  //워크그룹 정보 fetch 후
  useEffect(() => {
    if (state.data && state.data.length > 0) {
      setGroupInfo(state.data[0]);
    }
  }, [state.data])

  //워크그룹 나가기
  const outWorkgroup = () => {
    if (inputs.checked) {
      dispatch(postWorkGroupOut.call({ out_reason: inputs.out_reason }))
    }
  }

  //워크그룹 나가기 fetch 후
  useEffect(() => {
    if (state.postWorkGroupOutRes) {
      if (state.postWorkGroupOutRes.message == 'master') {
        state.postWorkGroupOutRes = null;
        errorMessage('다른 사용자에 Master 권한을 부여해야 나갈 수 있습니다.');
      } else {
        state.postWorkGroupOutRes = null;
        //워크그룹 선택 
        history.push('/main/workgroup/chgwgroup')
      }
    }
  }, [state.postWorkGroupOutRes])

  const onChkChange = (e) => {
    console.log('checked::::::::::::::::::', e.target.checked)
    setInputs({ ...inputs, checked: e.target.checked })
  }

  return (
    <div>
      <MyAppBar
        barTitle={'워크그룹 나가기'}
        showBackButton
        navigateTo={navigateTo} />

      <div className='content_body'>
        <div style={{ fontSize: 14, padding: 10, textAlign: 'center', color: '#333' }}>
          <ExclamationCircleOutlined style={{ color: '#C90000' }} />
          &nbsp;{((groupInfo) ? groupInfo.organization : '워크그룹')} 에서 나가면 더이상 워크그룹 정보에 접근할 수 없으며, 이 작업은 취소할 수 없습니다.
        </div>
        <div style={{ marginTop: 10, textAlign: 'center' }}>
          <Checkbox onChange={onChkChange}
            style={{ fontSize: 12, padding: 10, }}>
            워크그룹에서 나가는 것과 관련된 내용을 충분히 이해 했습니다.
          </Checkbox>
        </div>
        <div
          style={{
            position: ((isMobile) ? 'absolute' : ''),
            width: '100%',
            height: ((isMobile) ? 60 : 200),
            bottom: 60,
            textAlign: 'center',
            justifyContent: 'flex-end'

          }}>
          <Button
            style={{
              width: ((isMobile) ? '90%' : '50%'),
              top: ((isMobile) ? 0 : 100),
              height: 50,
              bottom: 10,
              padding: 5
            }}
            onClick={() => {
              outWorkgroup()
            }}
          >워크그룹 나가기</Button>
        </div>
      </div>

    </div>
  );
}

export default WgroupMemberPage;