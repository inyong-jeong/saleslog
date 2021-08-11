import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { Helmet } from "react-helmet";
// import Divider from "components/Divider";/
import RoundInputField from "components/RoundInputField";
import { getCi } from "helpers/domainUtils";
import { regex } from 'constants/regex';
import { isUserAuthorized, isUserAuthenticated, getOauthCode } from 'helpers/authUtils';
import useInput from 'hooks/useInput';
import { oauthAuthenticateUser, authorize, getOauthToken } from 'redux/actions';


function SignIn(props) {
  const [alaramText, setAlarmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  // const [loginForm, setLoginForm] = useState({
  //   email: "",
  //   password: "",
  //   keepSession: false,
  // });
  const [testForm, setTestForm] = useState({
    username: "",
    password: ""
  })

  const [username, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('')


  // const setFormState = (e) => {
  //   setLoginForm({
  //     ...loginForm,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  //renewal 

  const setFormState = (e) => {
    setTestForm({
      ...testForm,
      [testForm.username]: e.target.value,
      [testForm.password]: e.target.value
    });
  };

  const handleOnLogin = () => {
    const client_id = 'saleslog.co';
    const redirect_uri = 'https://auth.theklab.co/oauth/client_auth';
    const response_type = 'code';
    const grant_type = 'authorization_code';
    const state = 'myState';
    props.authorize(username, password, client_id, redirect_uri, response_type, grant_type, state)
  }

  const handletoken = () => {
    const client_id = 'saleslog.co';
    const client_secret = '8fba114f8291cf28e443c30aba7cce86';
    const grant_type = 'authorization_code';
    props.getOauthToken(getOauthCode(), client_secret, client_id, grant_type)
  }

  // useEffect(() => {
  //   window.addEventListener("resize", updateWindowDimensions);

  //   return () => {
  //     window.removeEventListener("resize", updateWindowDimensions);
  //   };
  // }, []);

  useEffect(() => {
    if (props.error) {
      setLoading(false);
    }
  }, [props.error]);

  useEffect(() => {
    if (isUserAuthorized()) {
      handletoken();
      props.history.push('/authing')
    }
  }, [isUserAuthorized()])

  useEffect(() => {
    if (isUserAuthenticated()) {
    }
  }, [isUserAuthenticated()])

  // const updateWindowDimensions = () => {
  //   setViewHeight(window.innerHeight);
  // };

  // const checkValid = (email, password) => {
  //   let emailRegex = new RegExp(regex.email);
  //   let passwordRegex = new RegExp(regex.password_signin);
  //   if (emailRegex.exec(email) === null) {
  //     return false;
  //   }

  //   if (passwordRegex.exec(password) === null) {
  //     return false;
  //   }

  //   return true;
  // }

  // const handleValidSubmit = (e) => {
  //   e.preventDefault();
  //   if (props.loading) return;
  //   if (checkValid(loginForm.email, loginForm.password)) {
  //     const { email, password, keepSession } = loginForm;
  //     let redirectUri, platform, state, responseType;
  //     try {
  //       redirectUri = new RegExp('(?!client_id=)((http.+)|(com.sales.+))(?=&client_type)').exec(window.location.search);
  //       platform = new RegExp('(?!client_type=)[a-z._]{2,40}(?=&state)').exec(window.location.search);
  //       state = new RegExp('(?!state=)[A-z0-9]{2,10}(?=&response_type)').exec(window.location.search);
  //       responseType = new RegExp('[0-9]{3}$').exec(window.location.search);
  //       console.log(redirectUri);
  //       console.log(platform);
  //       console.log(state);
  //       console.log(responseType);
  //     } catch (error) {
  //       setAlarmText("잘못된 로그인 링크입니다");
  //       return;
  //     }
  //     setLoading(true);
  //     console.log(loginForm);
  //     console.log(window.location);
  //     props.oauthAuthenticateUser(email, password, redirectUri[0], platform[0], state ? state[0] : "", keepSession, responseType);
  //     setAlarmText("");
  //   } else {
  //     setAlarmText("이메일과 비밀번호를 입력해주세요");
  //   }
  // };
  const handleSignUpSubmit = () => {
    props.history.push('/signup')
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleValidSubmit();
    }
  };

  const handleOnClick = () => {
    props.history.push('/main');
  }



  const ViewStyle = {
    height: viewHeight,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
  };

  const CardStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex'
  }

  const ImgStyle = {
    textAlign: 'center'
  }


  return (
    <React.Fragment>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <div className="container-md">
        <div className="row" style={ViewStyle}>
          <div className="col-xxl-4 col-xl-4 col-lg-2 col-md-2 col-sm-2"></div>
          <div className="col-xxl-4 col-xl-4 col-lg-8 col-md-8 col-sm-8 align-self-center ">
            <div className="card">
              <div className="card-body" style={CardStyle}>
                <div style={ImgStyle}>
                  <img src={getCi()} className="auth-logo mb-3" alt="logo" />
                </div>
                <form>
                  <div className="form-group">
                    <RoundInputField
                      id="username"
                      title="이메일"
                      placeholder="이메일 주소"
                      value={testForm.username}
                      onChange={onChangeId}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <RoundInputField
                      id="password"
                      title="비밀번호"
                      placeholder="비밀번호 입력(영문,숫자 포함 8자리)"
                      value={testForm.password}
                      // type="password"
                      onChange={onChangePassword}
                      disabled={loading}
                    />
                  </div>
                  {/* <div className="checkbox checkbox-blue mb-3 mt-2 checkbox-single">
                    <input
                      checked={loginForm.keepSession}
                      value={loginForm.keepSession}
                      type="checkbox"
                      name="keepSession"
                      onChange={setFormState}
                    />
                    <label style={{ width: "auto", paddingLeft: "24px", fontSize: '14px' }}>
                      로그인 상태 유지
                    </label>
                  </div> */}
                  <div className="form-group mt-3">
                    {/* <button onClick={handleOnClick}> 대시보드 라우팅</button> */}
                    {/* <button onClick={() => { props.history.push('/findpwsucceed') }}> 비밀번호 변경 성공</button> */}

                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px' }}
                      disabled={loading}
                      onClick={handleOnLogin}
                    >
                      로그인
                    </button>

                  </div>
                  <div className="form-group mt-3">
                    {/* <button onClick={handleOnClick}> 대시보드 라우팅</button> */}
                    {/* <button onClick={() => { props.history.push('/findpwsucceed') }}> 비밀번호 변경 성공</button> */}

                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px' }}
                      disabled={loading}
                      onClick={handletoken}
                    >
                      엑세스토큰테스트
                    </button>

                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px' }}
                      disabled={loading}
                      onClick={handleSignUpSubmit}
                    >
                      회원가입
                    </button>
                  </div>

                  {props.error && (
                    <p className="text text-danger">로그인에 실패했습니다</p>
                  )}
                  {alaramText.length > 0 && (
                    <p className="text text-danger">{alaramText}</p>
                  )}
                  {loading && <Spinner color="primary" />}
                </form>
                {/* <Divider className="form-group mr-3 ml-1 mt-2" /> */}
                <div style={{ textAlign: 'center', fontColor: 'black' }}>
                  <Link
                    to="/findid"
                    className="btn btn-sm btn-link text-muted pl-0"
                  >
                    아이디 찾기
                  </Link>
                  <Link
                    to="/findpw"
                    className="btn btn-sm btn-link text-muted pl-0"
                  >
                    비밀번호 찾기
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-2 col-md-2 col-sm-2"></div>
        </div>
        {/* <footer className="footer footer-alt">
          <Link to="https://theklab.co" className="text-secondary">
            2020 &copy; TheKlab.co
          </Link>
          <span> | </span>
          <Link to="https://theklab.co/privacy" className="text-secondary">
            개인정보처리방침
          </Link>
          <span> | </span>
          <Link to="https://theklab.co/policy" className="text-secondary">
            이용약관
          </Link>
        </footer> */}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { url, loading, error } = state.Auth;
  return { url, loading, error };
};

const mapStateToDispatch = {
  oauthAuthenticateUser: oauthAuthenticateUser.call,
  authorize: authorize.call,
  getOauthToken: getOauthToken.call
}
export default connect(mapStateToProps, mapStateToDispatch)(SignIn);