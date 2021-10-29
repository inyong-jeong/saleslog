import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import AvatarUp from 'components/AvatarUp';
import { useHistory } from 'react-router';
import { Divider } from 'antd';
import Input from 'components/styledcomponent/Input';
import { getProfileDetail, postProfilePhoto, postProfileUpd } from 'redux/etc/actions';
import cmm from 'constants/common';


const myProfilePage = () => {

  const state = useSelector(state => state.Etc)
  const history = useHistory()
  const dispatch = useDispatch()
  const [myData, setMyData] = useState(null)
  const [inputs, setInputs] = useState(
    {
      user_name: '',
      phone_number: '',
      prevImg: null,
      fileup: null,
    }
  )

  const labelTextStyle = {
    fontSize: 12,
    color: '#666666',
    fontWeight: 400,
    paddingLeft: 5,
  }

  const grayResultTextStyle = {
    fontSize: 14,
    color: '#999999',
    fontWeight: 400,
    paddingLeft: 5
  }
  const blackResultTextStyle = {
    fontSize: 14,
    color: '#111111',
    fontWeight: 400,
    paddingLeft: 5
  }


  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
    dispatch(getProfileDetail.call())

  }, [])

  useEffect(() => {
    if (state.getProfileDetailRes && state.getProfileDetailRes.length > 0) {
      setMyData(state.getProfileDetailRes)

      setInputs({
        ...inputs,
        user_name: state.getProfileDetailRes[0].user_name,
        phone_number: state.getProfileDetailRes[0].phone_number,
        prevImg: state.getProfileDetailRes[0].thumb_url ? cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + state.getProfileDetailRes[0].thumb_url : ''
      })
    }
  }, [state.getProfileDetailRes])

  const onSaveClick = (e) => {
    dispatch(postProfileUpd.call({ user_name: inputs.user_name, phone_number: inputs.phone_number }))
    return
  }
  const handleChangeFile = e => {
    const fileUploaded = e.target.files;
    const reader = new FileReader();
    reader.onloadend = () => {
      setInputs({
        ...inputs,
        fileup: fileUploaded,
        prevImg: reader.result
      })
    }
    if (!cmm.isEmpty(e.target.files)) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const navigateTo = () => {
    history.goBack()
  }
  //이미지등록 
  useEffect(() => {
    console.log('fileup')
    if (inputs.fileup !== null) {
      dispatch(postProfilePhoto.call({ fileup: inputs.fileup }))
    }
  }, [inputs.fileup])

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  return (
    (myData && myData.length > 0) &&
    <div >
      <MyAppBar
        barTitle={'내 프로필'}
        showBackButton
        navigateTo={navigateTo}
        onSaveClick={onSaveClick}
      />

      <div className='content_body'>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <AvatarUp
            imgsrc={cmm.isEmpty(inputs.prevImg) ? '' : inputs.prevImg}
            iconShape='square'
            style={{
              padding: 0,
              width: ((isMobile) ? 90 : 120),
              height: ((isMobile) ? 90 : 120),
            }}
            height={((isMobile) ? 90 : 120)}
            handleChange={handleChangeFile}
          />

          <div style={{ flexGrow: 2 }}>
            <label style={labelTextStyle}>이름 </label><br />
            <Input
              style={blackResultTextStyle}
              name='user_name'
              onChange={handleChange}
              value={inputs.user_name}
              required
              placeholder="이름을 입력해주세요."
              margin="normal"
            />
          </div>
        </div>
        <Divider />
        <div >
          <label style={labelTextStyle}> 휴대폰 번호 </label><br />
          <Input
            style={blackResultTextStyle}
            name='phone_number'
            onChange={handleChange}
            value={inputs.phone_number}
            required
            placeholder="휴대폰 번호를 입력해주세요.(-포함)"
            margin="normal"
          />
          <Divider />
        </div>
        <div>
          <label style={labelTextStyle}>이메일 </label><br />
          <label style={grayResultTextStyle}>{myData[0].email}</label>
        </div>
        <Divider />
        <div>
          <label style={labelTextStyle}>멤버 구분 </label><br />
          <label style={grayResultTextStyle}>{cmm.permission(myData[0].permissions)}</label>
        </div>
        <Divider />
        <div>
          <label style={labelTextStyle}>소속</label><br />
          <label style={grayResultTextStyle}>{myData[0].dept_name}</label>
        </div>
        <Divider />
      </div>
    </div>
  );
}

export default myProfilePage;