import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { postAuthNumber } from 'redux/actions'

const Post = (props) => {

  const { steps } = props;

  // console.log(steps.email.value);


  useEffect(() => {
    const email = steps.email.value;
    console.log(email);
    props.postAuthNumber(email)
  }, [])

  // const handleOnClick = () => {
  //   props.history.push('/signin')
  // }
  return (
    <div>
      <h4>인증번호를 보내드렸어요. 인증번호를 입력해주세요.</h4>
    </div>
  )

}


const mapStateToProps = (state) => {
  const { changePasswordResponse, changePasswordError } = state.Auth;
  return { changePasswordResponse, changePasswordError };
}

const dispatchToProps = {
  postAuthNumber: postAuthNumber.call
}

// export default connect(mapStateToProps, dispatchToProps)(ChangePassword);

export default connect(mapStateToProps, dispatchToProps)(Post);