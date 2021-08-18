import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { findPassword } from 'redux/actions';
import { regex } from 'constants/regex';
import RoundInputField from 'components/RoundInputField';
import { getCi } from "helpers/domainUtils";

function FindPassword(props) {
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const [email, setEmail] = useState('');
  const [error, setError] = useState();

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  }

  const handleValidSubmit = (e) => {
    e.preventDefault();
    if (new RegExp(regex.email).exec(email)) {
      props.findPassword(email);
    } else {
      setError("이메일 형식이 잘못되었습니다");
    }
  }
  const handleLandingPage = () => {
    props.history.push('/');
  }

  useEffect(() => {
    if (props.findPasswordResponse) {
      props.history.push('/changepwsucceed');
    }
  }, [props.findPasswordResponse]);

  const CardStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex'
  }

  const ButtonStyle = {
    width: '343px'
  }

  const ImgStyle = {
    textAlign: 'center',
    cursor: 'pointer'
  }

  return (
    <div className="container-fluid" style={{ height: viewHeight }}>
      <div className="row" style={{ height: viewHeight }}>
        <div className="col-lg-4 col-md-3 col-sm-2">
        </div>
        <div className="col-lg-4 col-md-6 col-sm-8 align-self-center">
          <div className="card">
            <div className="card-body" style={CardStyle}>
              <div style={ImgStyle}>
                <img src={getCi()} className="auth-logo mb-3" alt="logo" onClick={handleLandingPage} />
              </div>
              <form>
                <div className="form-group mr-3 ml-1">
                  <RoundInputField
                    id="email"
                    title="이메일"
                    placeholder="이메일주소를 입력해주세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && <p className="text-danger mt-2">{error}</p>}
                </div>
                <div className="form-group mr-3 ml-1 mt-3">
                  <button className="btn btn-outline-primary" style={ButtonStyle} onClick={handleValidSubmit}>
                    비밀번호 찾기
                  </button>
                </div>
              </form>

              <div>
                <Link to="/signin" className="btn btn-sm btn-link text-muted pl-0">
                  로그인
                </Link>
                <Link to="/signup" className="btn btn-sm btn-link text-muted pl-0">
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-3 col-sm-2">
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {

// }

export default connect(null, { findPassword: findPassword.call })(FindPassword);