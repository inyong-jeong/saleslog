import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Spin } from 'antd'
import { getOauthToken, } from 'redux/actions';
import { isUserAuthenticated, getOauthCode, isUserAuthorized } from 'helpers/authUtils';
import { removeAll } from 'helpers/authUtils';

const AuthenticatingLayout = (props) => {

  const handletoken = () => {
    const client_id = 'saleslog.co';
    const client_secret = '8fba114f8291cf28e443c30aba7cce86';
    const grant_type = 'authorization_code';
    props.getOauthToken(getOauthCode(), client_secret, client_id, grant_type)
  }

  useEffect(() => {
    if (isUserAuthorized() === true) {
      handletoken();
    }
  }, [isUserAuthorized()])

  useEffect(() => {
    if (isUserAuthenticated() === true) {
      props.history.push('/main');
    }
  }, [isUserAuthenticated()])

  return (
    <div style={{ textAlign: 'center', height: '100vh', lineHeight: '100vh' }}>
      <Spin size='large' tip='Loading...' />
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

export default connect(mapStateToProps, dispatchToProps)(AuthenticatingLayout);
