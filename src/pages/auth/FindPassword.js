import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { findPassword } from 'redux/actions';
import { regex } from 'constants/regex';
import RoundInputField from 'components/RoundInputField';
import { getCi } from "helpers/domainUtils";
import { ReactComponent as WhiteLogo } from '../../../src/assets/icons/main/whiteLogo.svg'
import StyledButton from '../../components/styledcomponent/Button';
function FindPassword(props) {

  const state = useSelector(state => state.Auth);
  let findresponse = state.findresponse;

  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const [email, setEmail] = useState('');
  const [alarm, setAlarm] = useState();

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  }

  useEffect(() => {
    if (findresponse) {
      setAlarm('비밀번호 재설정 메일이 발송되었습니다');
      findresponse = false;
    }
    // setAlarm(null)
  }, [findresponse])
  const handleValidSubmit = (e) => {
    e.preventDefault();
    if (new RegExp(regex.email).exec(email)) {
      props.findPassword(email);
    } else {
      setAlarm("이메일 형식이 잘못되었습니다");
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


  return (
    <div className="container-fluid" style={{ height: viewHeight }}>
      <div className="row" style={{ height: viewHeight }}>
        <div className="col-lg-3 col-md-3 col-sm-2">
        </div>
        <div className="col-lg-6 col-md-6 col-sm-8 align-self-center">
          <div className="card">
            <div className="card-body" style={CardStyle}>
              <div style={{ padding: 10, margin: 10, cursor: 'pointer' }} onClick={handleLandingPage}>
                <WhiteLogo width={150} height={50} fill='black' />
              </div>
              <form>
                <div className="form-group mr-3 ml-1">
                  <RoundInputField
                    id="email"
                    title="이메일"
                    placeholder="이메일 주소를 입력해주세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {alarm && <p className="text-danger mt-2">{alarm}</p>}
                </div>
                <div className="form-group mr-3 ml-1 mt-3">
                  <StyledButton onClick={handleValidSubmit}>
                    비밀번호 찾기
                  </StyledButton>
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
        <div className="col-lg-3 col-md-3 col-sm-2">
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {

// }

export default connect(null, { findPassword: findPassword.call })(FindPassword);