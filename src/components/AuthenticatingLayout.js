import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Spinner } from 'reactstrap';
import { getOauthToken, } from 'redux/actions';
import { isUserAuthenticated, getOauthCode, isUserAuthorized } from 'helpers/authUtils';
import { removeAll } from 'helpers/authUtils';
import { POST_WORKGROUP_SUCCESS } from '../constants/actionTypes';

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
    } else {
      removeAll();
      props.history.push('/')
    }
  }, [])

  useEffect(() => {
    if (isUserAuthenticated() === true) {
      props.history.push('/main');
    }
  }, [isUserAuthenticated()])

  return (
    <div className="container">
      <div className="text-center" style={{ position: "fixed", top: "50%", left: "50%" }}>
        <Spinner color="primary" />
        <div>
          <span>인증 중입니다...</span>
        </div>
      </div>
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
