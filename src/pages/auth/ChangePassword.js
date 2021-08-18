import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { changePassword } from 'redux/actions';
import Card from 'components/Card';
import RoundInputField from 'components/RoundInputField';
import { getCi } from "helpers/domainUtils";


function ChangePassword(props) {
  const [clicked] = useState(false);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const [error, setError] = useState();
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');


  const handleLandingPage = () => {
    props.history.push('/');
  }

  useEffect(() => {
    if (props.changePasswordError) {
      setError('이전 비밀번호와 동일합니다');
    }
  }, [props.changePasswordError]);

  useEffect(() => {
    if (props.changePasswordResponse) {
      props.history.goBack();
    }
  }, [props.changePasswordResponse]);

  const onChangePasswordClick = (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      setError('비밀번호 확인이 다릅니다.');
      return;
    }
    setError(null);
    const email = 'hyeyoun4@naver.com';
    const code = 'abcd'
    props.changePassword(code, email, newPassword);
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  }

  const cardStyle = {
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
      <div className="container-fluid">
        <div className="row" style={{ height: viewHeight }}>
          <div className="col-lg-4 col-md-3 col-sm-2">
          </div>
          <div className="col-lg-4 col-md-6 col-sm-8 align-self-center">
            <div className='card'>
              <div className='card-body' style={cardStyle}>
                <div style={ImgStyle}>
                  <img src={getCi()} className="auth-logo mb-3" alt="logo" onClick={handleLandingPage} />
                </div>
                <h5 className='mb-2'>비밀번호를 잊으셨나요?</h5>
                <h5 className='mb-4'>새로운 비밀번호를 입력해주세요.</h5>
                <form>
                  <div className='mb-2'>
                    <RoundInputField placeholder="새로운 비밀번호" type="id" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                  <div>
                    <RoundInputField placeholder="비밀번호 확인" type="id" value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} />
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <div className='mt-4'>
                    <button className="btn btn-primary" style={{ width: '343px' }} onClick={onChangePasswordClick}>
                      {clicked && <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>}
                      비밀번호 변경
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
          <div className="col-lg-4 col-md-3 col-sm-2">
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { user } = state.User;
  const { changePasswordResponse, changePasswordError } = state.Auth;
  return { user, changePasswordResponse, changePasswordError };
}

const dispatchToProps = {
  changePassword: changePassword.call
}

export default connect(mapStateToProps, dispatchToProps)(ChangePassword);