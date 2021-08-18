import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { postAuthNumber } from 'redux/actions'

const AuthNumberCheck = (props) => {

  const { steps } = props;

  // console.log(steps.email.value);



  console.log(steps.authnumber.value);
  // useEffect(() => {
  //   const email = steps.email.value;
  //   console.log(email);
  //   props.postAuthNumber(email)
  // }, [])

  // const handleOnClick = () => {
  //   props.history.push('/signin')
  // }


  const Valid = ({ children }) => {

    const InputAuthNumber = steps.authnumber.value;
    const AuthNumber = props.authNumberResponse;

    // console.log('인풋 넘버 ', typeof (InputAuthNumber))
    // console.log('인증번호', typeof (AuthNumber))
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
      <h4>인증이 확인되었습니다.</h4>
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

export default connect(mapStateToProps, dispatchToProps)(AuthNumberCheck);