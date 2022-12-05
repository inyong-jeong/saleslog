import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import RoundInputField from "components/RoundInputField";
import { Checkbox, Modal } from 'antd';
import { authorize, getOauthToken } from 'redux/actions';
import { ReactComponent as WhiteLogo } from '../../../src/assets/icons/main/whiteLogo.svg'
import StyledButton from 'components/styledcomponent/Button'
import { useCookies } from 'react-cookie';
import { errorMessage } from "constants/commonFunc";
import cmm from 'constants/common';
import { Helmet } from "react-helmet";
import { ExclamationCircleOutlined } from '@ant-design/icons';


const { confirm } = Modal;
const SignIn = (props) => {

  const state = useSelector(state => state.Auth)
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const [isSaveId, setIsSaveId] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['userEmail']);

  const [inputs, setInputs] = useState({
    username: (cookies.userEmail) ? cookies.userEmail : '',
    password: '',
    platform: cmm.getPlatform()
  })

  useEffect(() => {
    if (cookies.userEmail !== undefined) {
      setInputs({ ...inputs, username: cookies.userEmail })
    }

  }, []);

  //아이디저장 클릭
  const handleChecked = (e) => {
    setIsSaveId(e.target.checked);
    if (!e.target.checked) {
      removeCookie('userEmail');
    }
  }

  const handelChange = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value })
  }

  const handleOnLogin = () => {
    if (!inputs.username.length > 0 || !inputs.password.length > 0) {
      return errorMessage('이메일 주소와 비밀번호를 입력하세요.')
    }

    const client_id = 'saleslog.co';
    const redirect_uri = cmm.AUTH_SERVER_API_URL + '/oauth/client_auth';
    const response_type = 'code';
    const grant_type = 'authorization_code';
    const state = 'myState';

    dispatch(authorize.call(inputs.username, inputs.password, client_id, redirect_uri, response_type, grant_type, state, inputs.platform))

    //아이디저장
    try {
      
      if (isSaveId) {
        setCookie('userEmail', inputs.username, { maxAge: 60 * 60 * 24 * 30 });
      }
    } catch {
      console.log('cookie error!!!');
    }
    

  }

  // access token 
  const getAccessToken = (code) => {
    console.log('getAccessToken::::::::::', code, cmm.CLIENT_SECRET, cmm.CLIENT_ID, grant_type)
    const grant_type = 'authorization_code';
    dispatch(getOauthToken.call(code, cmm.CLIENT_SECRET, cmm.CLIENT_ID, grant_type))
  }


  // 회원가입 클릭
  const handleOnClick = () => {
    history.push('/signup')
  }

  // 로고클릭
  const handleLandingPage = () => {
    history.push('/');
  }


  // 로그인 fetch 후 
  useEffect(() => {
    console.log('로그인 응답 :::::::::::::::::', state.authcodeResponse)

    if (!state.authcodeResponse) return

    if (state.authcodeResponse.toString() == 'No User !!') {
      errorMessage('아이디 또는 비밀번호를 확인해주세요');
      setInputs({ ...inputs, password: '' })
      state.authcodeResponse = null;
      return;
    } else {
      //console.log('로그인 시작::::::::::::', state.authcodeResponse)
      props.history.push('/authing');
      //getAccessToken(state.authcodeResponse.code);
      state.authcodeResponse = null;
      return;
    }

  }, [state.authcodeResponse])

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);


  const ViewStyle = {
    height: viewHeight,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
  };

  const CardStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    fontSize: 14
  }

  const onFindId = () => {
    confirm({
      title: '이메일 계정 찾기',
      icon: <ExclamationCircleOutlined />,
      content: '이메일 주소가 기억나지 않으시나요? 회사명, 사용자이름, 이름, 직급, 휴대폰 번호를 이메일로 보내주시면 확인해드리겠습니다!(saleslog@saleslog.co)',
      okText: '확인',
      cancelText: '취소',
      onOk() {
      },

    })
  }
  const onKeyPress = (e) => {
    if (e.key == 'Enter') handleOnLogin()
  }

  return (
    <>
      <Helmet>
        <title>로그인</title>
        <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
      </Helmet>
      <div className="container-md">
        <div className="row" style={ViewStyle}>
          <div style={{ margin: 'auto' }}>
            <div style={{ width: 360, backgroundColor: '#fff' }}>
              <div className="card-body" style={CardStyle} >
                <div style={{ padding: 10, margin: 10, cursor: 'pointer' }} onClick={handleLandingPage}>
                  <WhiteLogo width={150} height={50} fill='black' />
                </div>
                <form>
                  <div className="form-group">
                    <RoundInputField
                      width={'300px'}
                      id="username"
                      title="이메일"
                      type='text'
                      placeholder="이메일 주소"
                      value={inputs.username}
                      onChange={handelChange}
                    />
                  </div>
                  <RoundInputField
                    width={'300px'}
                    onKeyPress={onKeyPress}
                    id="password"
                    title="비밀번호"
                    placeholder="비밀번호 입력 (영문,숫자 포함 8자리)"
                    value={inputs.password}
                    type="password"
                    onChange={handelChange}
                  />
                  <div>
                    <Checkbox onChange={handleChecked} checked={isSaveId}><span style={{ fontSize: 12, color: '#a0a0a0' }}>아이디 저장</span></Checkbox>
                  </div>

                  <div className="form-group mt-3">
                    <StyledButton
                      disabled={loading}
                      onClick={handleOnLogin}>
                      로그인
                    </StyledButton>
                  </div>

                  <div className="form-group">
                    <StyledButton
                      disabled={loading}
                      onClick={handleOnClick}>
                      회원가입
                    </StyledButton>

                    <div style={{ marginTop: 10, fontSize: 12, textAlign: 'center' }}>
                      <p >초대를 받으셨나요?</p>
                      <p>메일이 보이지 않는다면, 스팸 메일함을 확인해주세요!</p>
                    </div>

                  </div>
                  {props.error && (
                    <p className="text text-danger">로그인에 실패했습니다</p>
                  )}
                  {loading && <Spinner color="primary" />}
                </form>
                <div style={{ fontSize: 14, color: 'black' }}>
                  <span style={{ cursor: 'pointer' }} onClick={onFindId}>아이디 찾기</span>
                  <span > | </span>
                  <Link
                    to="/findpw"
                  >
                    비밀번호 찾기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;