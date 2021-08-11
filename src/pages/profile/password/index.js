import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { changePassword } from 'redux/actions';
import Card from 'components/Card';
import InputField from 'components/InputField';

function ChangePassword(props) {
  const [clicked] = useState(false);
  const [error, setError] = useState();
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

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
    props.changePassword(props.user.email, newPassword);
  }

  const onCancleClick = (e) => {
    e.preventDefault();
    props.history.goBack();
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="page-title-box">
              <h4 className="page-title">비밀번호 변경</h4>
            </div>            
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Card>
              <div className="row">
                <InputField title="새로운 비밀번호" type="password" col={6} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className="row">
                <InputField title="비밀번호 확인" type="password" col={6} value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="row mt-4">
                <button className="btn btn-primary col-6" onClick={onChangePasswordClick}>
                {clicked &&<span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>}
                확인
                </button>
                <button className="btn btn-white col-6" onClick={onCancleClick}>취소</button>
              </div>
            </Card>
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