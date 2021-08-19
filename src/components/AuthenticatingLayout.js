import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Spinner } from 'reactstrap';
import { getOauthToken } from 'redux/actions';

const AuthenticatingLayout = (props) => {

  useEffect(() => {
    props.history.push('/main')
  }, [])

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
  const { tokenResponse, refTokenResponse, tokenError, tokenExpired } = state.Auth;
  return { tokenResponse, refTokenResponse, tokenError, tokenExpired };
}

const dispatchToProps = {
  getOauthToken: getOauthToken.call
};

export default connect(mapStateToProps, dispatchToProps)(AuthenticatingLayout);
