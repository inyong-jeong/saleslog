import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Spin } from 'antd'
import { getOauthToken, } from 'redux/actions';
import { isUserAuthenticated, getOauthCode, isUserAuthorized } from 'helpers/authUtils';
import { removeAll } from 'helpers/authUtils';
import { withRouter } from 'react-router-dom';
import { errorMessage, successMessage } from "constants/commonFunc";

const AuthenticatingLayout = (props) => {

  // 토큰 발급요청
  const handletoken = () => {
    const client_id = 'saleslog.co';
    const client_secret = '8fba114f8291cf28e443c30aba7cce86';
    const grant_type = 'authorization_code';
    props.getOauthToken(getOauthCode(), client_secret, client_id, grant_type)
  }


  // useEffect(() => {
  //   //console.log('authenticatingLayout::[]:a★★★:')
    
  // }, [])


  useEffect(() => {
    //console.log('isUserAuthorized()::::',isUserAuthorized())
    if (isUserAuthorized() === true) {
      handletoken();
    } else if (isUserAuthorized() === false) {
      console.log('LOGIN PUSH :: AuthenticatingLayout isUserAuthorized ', isUserAuthorized())
      removeAll();
      props.history.push('/signin')
    }
  }, [isUserAuthorized()])

  useEffect(() => {
    //console.log('isUserAuthenticated():토큰여부확인:::',isUserAuthenticated())
    if (isUserAuthenticated() === true) {
      props.history.push('/main');
    } else {
      
    }
  }, [isUserAuthenticated()])

  useEffect(() => {
    //console.log('accesstokenResponse()::::',props.accesstokenResponse)
    if (props.accesstokenResponse) {
      //console.log('authing:::',props.accesstokenResponse)
      if (props.accesstokenResponse == 'invalid_grant') {
        //errorMessage('인증코드 오류입니다. 다시 로그인 해 주세요')
        
        console.log('LOGIN PUSH :: props.accesstokenResponse invalid_grant ', props.accesstokenResponse)
        removeAll();
        props.history.push('/signin');
      }
    }
  }, [props.accesstokenResponse])



  return (
    <div style={{ textAlign: 'center', height: '100vh', lineHeight: '100vh' }}>
      <Spin size='large' tip='잠시만 기다려 주세요...' />
    </div>
  );

}

const mapStateToProps = (state) => {
  const { authcodeResponse, accesstokenResponse } = state.Auth;
  return { authcodeResponse, accesstokenResponse };
}

const dispatchToProps = {
  getOauthToken: getOauthToken.call
};

export default withRouter(connect(mapStateToProps, dispatchToProps)(AuthenticatingLayout));
