import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { changePassword } from 'redux/actions';
import RoundInputField from 'components/RoundInputField';
import { ReactComponent as WhiteLogo } from '../../../src/assets/icons/main/whiteLogo.svg'
import StyledButton from 'components/styledcomponent/Button'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { regex } from 'constants/regex';

const { confirm } = Modal;

function ChangePassword(props) {
  let pattern1 = /[0-9]/;
  let pattern2 = /[a-zA-Z]/;
  let pattern3 = /[!@#$%^&*()-_+=~`;:]/;
  const state = useSelector(state => state.Auth);
  let changeresponse = state.changeresponse
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const [error, setError] = useState();
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const handleLandingPage = () => {
    props.history.push('/');
  }

  const onLoginPageClick = () => {
    confirm({
      title: '성공적으로 비밀번호가 변경됐습니다',
      icon: <ExclamationCircleOutlined />,
      content: '세일즈로그 로그인 페이지로 이동합니다.',
      cancelText: '취소',
      okText: '확인',
      onOk() {
        props.history.push('/signin')
      },
      onCancel() {
      },
    })
  }

  useEffect(() => {
    if (props.changePasswordError) {
      setError('이전 비밀번호와 동일합니다');
    }
  }, [props.changePasswordError]);

  //비밀번호가 성공적으로 변경되면 팝업창 띄우기.
  useEffect(() => {
    if (changeresponse) {
      // props.history.goBack();
      onLoginPageClick();
      state.changeresponse = false;
    }
  }, [changeresponse]);

  const onChangePasswordClick = (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      setError('비밀번호 확인이 다릅니다.');
      return;
    } else if (!pattern1.test(newPassword) || !pattern2.test(newPassword) || !pattern3.test(newPassword) || newPassword.length < 8) {
      setError('비밀번호 형식이 잘못되었습니다 (특수문자 포함 8자리 이상)')
      return;
    }
    else {
      props.changePassword(props.match.params.code, decodeURIComponent(props.match.params.email), newPassword);
    }
    setError(null);
  }
  console.log(newPassword)
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

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row" style={{ height: viewHeight }}>
          <div className="col-lg-3 col-md-3 col-sm-2">
          </div>
          <div className="col-lg-6 col-md-6 col-sm-8 align-self-center">
            <div className='card'>
              <div className='card-body' style={cardStyle}>
                <div style={{ padding: 10, margin: 10, cursor: 'pointer' }} onClick={handleLandingPage}>
                  <WhiteLogo width={150} height={50} fill='black' />
                </div>
                <h5 className='mb-2'>비밀번호를 잊으셨나요?</h5>
                <h5 className='mb-2'>새로운 비밀번호를 입력해주세요.</h5>
                <form>
                  <div className='mb-2'>
                    <RoundInputField placeholder="새로운 비밀번호 (특수문자 포함 8자리 이상)" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                  <div>
                    <RoundInputField placeholder="비밀번호 확인" type="password" value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} />
                  </div>
                  <div className='mt-2'>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                  <div className='mt-2 mb-2'>
                    <StyledButton onClick={onChangePasswordClick}>
                      비밀번호 변경
                    </StyledButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-2">
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { changePasswordResponse, changePasswordError } = state.Auth;
  return { changePasswordResponse, changePasswordError };
}

const dispatchToProps = {
  changePassword: changePassword.call
}

export default connect(mapStateToProps, dispatchToProps)(ChangePassword);