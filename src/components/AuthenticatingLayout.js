import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Spinner } from 'reactstrap';
import { getAccessToken, getRefreshToken, getOauthToken } from 'redux/actions';
import { authorizeRequest } from 'redux/actions';
import { removeAccessToken, removeUserId, removeAllInfo, getOauthCode } from 'helpers/authUtils';
import { isUserAuthenticated } from '../helpers/authUtils';

const AuthenticatingLayout = (props) => {


  // componentDidUpdate(prevProps) {
  //   if (prevProps.tokenResponse !== this.props.tokenResponse) {
  //     window.location.reload();
  //   }
  //   if (prevProps.refTokenResponse !== this.props.refTokenResponse) {
  //     window.location.reload();
  //   }
  //   if (prevProps.tokenError !== this.props.tokenError) {
  //     removeAccessToken();
  //     removeUserId();
  //     this.props.authorizeRequest(window.location.href);
  //   }
  //   if (prevProps.tokenExpired !== this.props.tokenExpired) {
  //     removeAccessToken();
  //     removeUserId();
  //     this.props.authorizeRequest(window.location.href);
  //   }
  //   if (!this.props.tokenResponse) {
  //     this.props.getAccessToken();
  //   }
  // }

  // componentDidMount() {
  //   const client_id = 'saleslog.co';
  //   const client_secret = '8fba114f8291cf28e443c30aba7cce86';
  //   const grant_type = 'authorization_code';
  //   this.props.getOauthToken(getOauthCode(), client_secret, client_id, grant_type);
  // }
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
  getAccessToken: getAccessToken.call,
  getRefreshToken: getRefreshToken.call,
  authorizeRequest: authorizeRequest,
  getOauthToken: getOauthToken.call
};

export default connect(mapStateToProps, dispatchToProps)(AuthenticatingLayout);
