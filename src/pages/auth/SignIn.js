import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import RoundInputField from "components/RoundInputField";
import { isUserAuthenticated, getOauthAccessToken } from 'helpers/authUtils';
import { isUserAuthorized } from 'helpers/authUtils';
import { Checkbox } from 'antd';
import { authorize, getOauthToken, postRegisteration, postInvite, postInviteRegistration } from 'redux/actions';
import { ReactComponent as WhiteLogo } from '../../../src/assets/icons/main/whiteLogo.svg'
import StyledButton from 'components/styledcomponent/Button'
import { useCookies } from 'react-cookie';
import { errorMessage, successMessage } from "constants/commonFunc";
import cmm from 'constants/common';


const SignIn = (props) => {
  const state = useSelector(state => state.Auth)
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  // const [username, onChangeId] = useInput('');
  // const [password, onChangePassword] = useInput('')
  //const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');
  const [platform, setPlatForm] = useState('pc');
  const [isSaveId, setIsSaveId] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['userEmail']);
  const [inputs, setInputs] = useState({
    username: (cookies.userEmail) ? cookies.userEmail : '',
    password: '',
    platform: cmm.getPlatform()
  })

  //페이지 첫 로딩
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

  //Input change
  const handelChange = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value })
  }

  // 로그인 버튼 클릭
  const handleOnLogin = (e) => {
    if (!inputs.username.length > 0 || !inputs.password.length > 0) {
      //antd errorMessage  안먹음.. 확인필요 
      errorMessage('이메일 주소와 비밀번호를 입력하세요.');
      return; // alert('이메일 주소와 비밀번호를 입력하세요.')
    }

    //아이디저장
    if (isSaveId) {
      setCookie('userEmail', inputs.username, { maxAge: 60 * 60 * 24 * 30 });
    }

    e.preventDefault();
    const client_id = 'saleslog.co';
    const redirect_uri = cmm.AUTH_SERVER_API_URL + '/oauth/client_auth';
    const response_type = 'code';
    const grant_type = 'authorization_code';
    const state = 'myState';

    dispatch(authorize.call(inputs.username, inputs.password, client_id, redirect_uri, response_type, grant_type, state, inputs.platform))

    //props.authorize(inputs.username, inputs.password, client_id, redirect_uri, response_type, grant_type, state, inputs.platform)
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

    if (!state.authcodeResponse) {
      return;
    }

    if (state.authcodeResponse.toString() == 'No User !!') {
      errorMessage('아이디 또는 비밀번호를 확인해 주세요');
      setInputs({ ...inputs, password: '' })
      state.authcodeResponse = null;
      return;
    } else {
      console.log('로그인 시작::::::::::::', state.authcodeResponse)
      props.history.push('/authing');
      //getAccessToken(state.authcodeResponse.code);
      state.authcodeResponse = null;
      return;
    }

  }, [state.authcodeResponse])

  // // getAccesToek fetch 후
  // useEffect(() => {
  //   console.log('로그인 응답 :::::22222::::::::::::',state.accesstokenResponse)

  //   if (!state.accesstokenResponse) {
  //     return;
  //   }

  //   if (state.authcodeResponse.message == 'No User !!') {
  //     errorMessage('로그인 인증코드가 잘못되었습니다.');
  //     setInputs({...inputs, password:''})      
  //     state.accesstokenResponse=null;
  //     return; 
  //   } else {
  //     console.log('로그인 ::::::::::::',state.accesstokenResponse)

  //     if (isUserAuthenticated()) {
  //       console.log('access Token :::::::::::::::::',getOauthAccessToken());
  //       history.push('/main');
  //     }



  //     state.accesstokenResponse=null;
  //     return;
  //   }

  // }, [state.accesstokenResponse])




  // useEffect(() => {
  //   if (isUserAuthorized()) {
  //     props.history.push('/authing')
  //   }
  // }, [isUserAuthorized()])


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

  if (undefined) {
    console.log(11111111)
  }

  return (
    <>
      <div className="container-md">
        <div className="row" style={ViewStyle}>
          <div className="col-xxl-4 col-xl-4 col-lg-2 col-md-2 col-sm-2" />
          <div className="col-xxl-4 col-xl-4 col-lg-8 col-md-8 col-sm-8 align-self-center ">
            <div className="card">
              <div className="card-body" style={CardStyle} >
                <div style={{ padding: 10, margin: 10, cursor: 'pointer' }} onClick={handleLandingPage}>
                  <WhiteLogo width={150} height={50} fill='black' />
                </div>
                <form>
                  <div className="form-group">
                    <RoundInputField
                      id="username"
                      title="이메일"
                      type='text'
                      placeholder="이메일 주소"
                      value={inputs.username}
                      onChange={handelChange}
                    />
                  </div>
                  <RoundInputField
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
                      onClick={(e) => {
                        handleOnLogin(e)
                      }}>
                      로그인
                    </StyledButton>
                  </div>

                  <div className="form-group">
                    <StyledButton
                      disabled={loading}
                      onClick={handleOnClick}>
                      회원가입
                    </StyledButton>
                  </div>
                  {props.error && (
                    <p className="text text-danger">로그인에 실패했습니다</p>
                  )}
                  {loading && <Spinner color="primary" />}
                </form>
                <div style={{ fontSize: 14, color: 'black' }}>
                  <Link
                    to="/findid"
                  >
                    아이디 찾기
                  </Link>
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
          <div className="col-xxl-4 col-xl-4 col-lg-2 col-md-2 col-sm-2"></div>
        </div>
      </div>
    </>
  );
}

export default SignIn;

// const mapStateToProps = (state) => {
//   const { loading, authcodeResponse, authcodeError } = state.Auth;
//   return { loading, authcodeResponse, authcodeError };
// };

// const mapStateToDispatch = {
//   authorize: authorize.call,
//   getOauthToken: getOauthToken.call,
//   postRegisteration: postRegisteration.call,
//   postInvite: postInvite.call,
//   postInviteRegistration: postInviteRegistration.call

// }
// export default connect(mapStateToProps, mapStateToDispatch)(SignIn);