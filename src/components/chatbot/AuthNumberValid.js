import React from 'react';
import { connect } from 'react-redux';
import { postAuthNumber } from 'redux/actions'

const AuthNumberValid = (props) => {

  const { steps } = props;

  const Valid = ({ children }) => {

    const InputAuthNumber = steps.authnumber.value;
    const AuthNumber = props.authNumberResponse;

    if (Number(InputAuthNumber) === AuthNumber) {
      return children
    } else if (Number(InputAuthNumber) > 9999) {
      return <h4>인증번호는 4자리입니다. 다시입력해주세요.</h4>
    } else if (isNaN(Number(InputAuthNumber))) {
      return <h4>인증번호가 숫자가 아닙니다. 다시입력해주세요.</h4>
    }
    else {
      return <h4>인증번호가 틀렸습니다. 다시입력해주세요.</h4>
    }
  }

  return (
    <Valid>
      <h4>잠시만 기다려 주세요.</h4>
    </Valid>
  )
}

const mapStateToProps = (state) => {
  const { authNumberResponse, authNumberError } = state.Auth;
  return { authNumberResponse, authNumberError };
}

const dispatchToProps = {
  postAuthNumber: postAuthNumber.call
}

export default connect(mapStateToProps, dispatchToProps)(AuthNumberValid);