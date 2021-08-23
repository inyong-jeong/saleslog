import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { Helmet } from "react-helmet";
import RoundInputField from "components/RoundInputField";
import { getCi } from "helpers/domainUtils";
import { isUserAuthorized, isUserAuthenticated, getOauthCode } from 'helpers/authUtils';
import useInput from 'hooks/useInput';
import { authorize, getOauthToken, postRegisteration, postInvite, postInviteRegistration } from 'redux/actions';
import { proxyPath } from '@theklab/saleslog/src/proxy';


function SignIn(props) {
  const [alaramText, setAlarmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  const [username, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('')

  //renewal 

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

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

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
    textAlign: 'center',
    cursor: 'pointer'
  }

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  };

  const handleOnClick = () => {
    props.history.push('/signup')
  }

  const handleLandingPage = () => {
    props.history.push('/');
  }

  const handleOnSubmit = () => {
    const user_email = 'jeong4726@naver.com';
    const user_name = '정인용';
    const user_password = 1111;
    const comp_name = '테스트 ';
    const comp_domain = 'TEST';

    props.postRegisteration(user_email, user_name, user_password, comp_name, comp_domain);
  }

  const PostEmailLink = () => {
    const login_id = 10000026;
    const invite_email = 'jy.park@theklab.co';
    const permission = 9;

    props.postInvite(login_id, invite_email, permission);
  }

  const handleOnInviteSubmit = () => {
    const user_email = 'hyeyoun4@naver.com';
    const invite_code = '';
    const user_name = '박정윤2';
    const user_password = 1111;
    const use_name = '';

    props.postInviteRegistration(user_email, invite_code, user_name, user_password, use_name);
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
                  <img src={getCi()} className="auth-logo mb-3" alt="logo" onClick={handleLandingPage} />
                </div>
                <form>
                  <div className="form-group">
                    <RoundInputField
                      id="username"
                      title="이메일"
                      placeholder="이메일 주소"
                      value={username}
                      onChange={onChangeId}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <RoundInputField
                      id="password"
                      title="비밀번호"
                      placeholder="비밀번호 입력(영문,숫자 포함 8자리)"
                      value={password}
                      // type="password"
                      onChange={onChangePassword}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group mt-3">
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

                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px' }}
                      disabled={loading}
                      onClick={handletoken}
                    >
                      엑세스토큰테스트
                    </button>

                  </div>
                  <div className="form-group mt-3">
                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px' }}
                      disabled={loading}
                      onClick={handleOnSubmit}
                    >
                      신규회원가입(초대아님)
                    </button>
                  </div>
                  <div className="form-group mt-3">
                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px' }}
                      disabled={loading}
                      onClick={PostEmailLink}
                    >
                      회원초대메일
                    </button>
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px' }}
                      disabled={loading}
                      onClick={handleOnInviteSubmit}
                    >
                      회원가입(초대)
                    </button>
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px' }}
                      disabled={loading}
                      onClick={handleOnClick}
                    >
                      회원가입
                    </button>
                  </div>
                  <div>
                    파일추가
                    <input type="file" />
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
    </React.Fragment >
  );
}

const mapStateToProps = (state) => {
  const { url, loading, error } = state.Auth;
  return { url, loading, error };
};

const mapStateToDispatch = {
  authorize: authorize.call,
  getOauthToken: getOauthToken.call,
  postRegisteration: postRegisteration.call,
  postInvite: postInvite.call,
  postInviteRegistration: postInviteRegistration.call

}
export default connect(mapStateToProps, mapStateToDispatch)(SignIn);