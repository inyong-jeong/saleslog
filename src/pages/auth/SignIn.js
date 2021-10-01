import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import RoundInputField from "components/RoundInputField";
import { isUserAuthorized } from 'helpers/authUtils';
import useInput from 'hooks/useInput';
import { Input } from 'antd'
import { authorize, getOauthToken, postRegisteration, postInvite, postInviteRegistration } from 'redux/actions';
import { ReactComponent as WhiteLogo } from '../../../src/assets/icons/main/whiteLogo.svg'
import StyledButton from 'components/styledcomponent/Button'
import { errorMessage, successMessage } from "../../constants/commonFunc";

function SignIn(props) {
  const [loading, setLoading] = useState(false);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  const [username, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('')
  const [platform, setPlatForm] = useState('pc');

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
    if (!username.length > 0 || !password.length > 0) {
      //antd errorMessage  안먹음.. 확인필요 
      return alert('이메일 주소와 비밀번호를 입력하세요.')
    }
    e.preventDefault();
    const client_id = 'saleslog.co';
    const redirect_uri = 'https://auth.theklab.co/oauth/client_auth';
    const response_type = 'code';
    const grant_type = 'authorization_code';
    const state = 'myState';
    props.authorize(username, password, client_id, redirect_uri, response_type, grant_type, state, platform)
  }

  useEffect(() => {
    if (isUserAuthorized()) {
      props.history.push('/authing')
    }
  }, [isUserAuthorized()])

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      setPlatForm("mobile");
    } else {
      setPlatForm("pc");
    }
  }, []);

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
                      value={username}
                      onChange={onChangeId}
                    />
                  </div>

                  <RoundInputField
                    id="password"
                    title="비밀번호"
                    placeholder="비밀번호 입력 (영문,숫자 포함 8자리)"
                    value={password}
                    type="password"
                    onChange={onChangePassword}
                  />
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

const mapStateToProps = (state) => {
  const { loading, authcodeResponse, authcodeError } = state.Auth;
  return { loading, authcodeResponse, authcodeError };
};

const mapStateToDispatch = {
  authorize: authorize.call,
  getOauthToken: getOauthToken.call,
  postRegisteration: postRegisteration.call,
  postInvite: postInvite.call,
  postInviteRegistration: postInviteRegistration.call

}
export default connect(mapStateToProps, mapStateToDispatch)(SignIn);