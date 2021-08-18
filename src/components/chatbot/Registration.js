import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { postRegisteration } from 'redux/actions'

const Registration = (props) => {

  const { steps } = props;

  // console.log(steps.email.value);


  useEffect(() => {
    const user_email = steps.email.value;
    const user_name = steps.name.value;
    const user_password = steps.password.value;
    const comp_name = steps.organization.value;
    const comp_domain = steps.domain.value

    console.log(user_password);

    props.postRegisteration(user_email, user_name, user_password, comp_name, comp_domain)
  }, [])

  // const handleOnClick = () => {
  //   props.history.push('/signin')
  // }
  return (
    <div>
      <h4>회원가입 되었습니다. 감사합니다.</h4>
    </div>
  )

}


const mapStateToProps = (state) => {
  const { changePasswordResponse, changePasswordError } = state.Auth;
  return { changePasswordResponse, changePasswordError };
}

const dispatchToProps = {
  postRegisteration: postRegisteration.call
}


export default connect(mapStateToProps, dispatchToProps)(Registration);