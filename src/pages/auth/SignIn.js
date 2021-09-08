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

function SignIn(props) {
  const [loading, setLoading] = useState(false);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  const [username, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('')

  //renewal 

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  };

  const handleOnClick = () => {
    props.history.push('/signup')
  }

  const handleLandingPage = () => {
    props.history.push('/');
  }


  const handleOnLogin = (e) => {
    e.preventDefault();
    const client_id = 'saleslog.co';
    const redirect_uri = 'https://auth.theklab.co/oauth/client_auth';
    const response_type = 'code';
    const grant_type = 'authorization_code';
    const state = 'myState';
    props.authorize(username, password, client_id, redirect_uri, response_type, grant_type, state)
  }

  const authcode = isUserAuthorized();

  useEffect(() => {
    if (authcode === true) {
      props.history.push('/authing')
    }
  }, [authcode])



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
    display: 'flex'
  }

  const ImgStyle = {
    textAlign: 'center',
    cursor: 'pointer'
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
                      onClick={(e) => {
                        handleOnLogin(e)
                      }}
                    >
                      로그인
                    </button>

                  </div>
                  {/* <div className="form-group mt-3">

                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px' }}
                      disabled={loading}
                      onClick={handletoken}
                    >
                      엑세스토큰테스트
                    </button>
                  </div> */}
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
      </div>
    </React.Fragment >
  );
}

const mapStateToProps = (state) => {
  const { loading, authcodeResponse } = state.Auth;
  return { loading, authcodeResponse };
};

const mapStateToDispatch = {
  authorize: authorize.call,
  getOauthToken: getOauthToken.call,
  postRegisteration: postRegisteration.call,
  postInvite: postInvite.call,
  postInviteRegistration: postInviteRegistration.call

}
export default connect(mapStateToProps, mapStateToDispatch)(SignIn);