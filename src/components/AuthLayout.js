import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from 'reactstrap';
import Card from 'components/Card';
import { getUser, authorizeRequest, getRefreshToken, tokenExpired, getRefreshOauthToken } from 'redux/actions';

import { getUserId, getOauthRefreshToken, getOauthAccessToken } from 'helpers/authUtils';
import StyledButton from 'components/styledcomponent/Button';
import StyledCheckbox from 'components/styledcomponent/Checkbox';
import StyledInput from 'components/styledcomponent/Input';


// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Navbar = React.lazy(() => import("./Navbar"));
const LeftSidebar = React.lazy(() => import("./LeftSidebar"));

const AuthLayout = (props) => {

  setInterval(() => {
    // console.log(1)
    const client_id = 'saleslog.co';
    const client_secret = "8fba114f8291cf28e443c30aba7cce86";
    const grant_type = "refresh_token";
    props.getRefreshOauthToken(getOauthRefreshToken(), client_id, client_secret, grant_type)
  }, 60 * 1000 * 60)
  // const shadowStyle = {
  //   position: 'fixed',
  //   top: '0',
  //   zIndex: '9999',
  //   width: '100vw',
  //   textAligh: 'center',
  //   height: '100vh',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)'
  // }
  // const handleOnClick = () => {
  //   const client_id = 'saleslog.co';
  //   const client_secret = "8fba114f8291cf28e443c30aba7cce86";
  //   const grant_type = "refresh_token";
  //   console.log(client_secret);
  //   props.getRefreshOauthToken(getOauthRefreshToken(), client_id, client_secret, grant_type)
  // }

  useEffect(() => {
    const client_id = 'saleslog.co';
    const client_secret = "8fba114f8291cf28e443c30aba7cce86";
    const grant_type = "refresh_token";
    props.getRefreshOauthToken(getOauthRefreshToken(), client_id, client_secret, grant_type)
  }, [getOauthAccessToken()])
  // constructor(props) {
  //   super(props);
  //   this.state = { authorizeAgain: false };
  //   props.getUser(getUserId());
  // }

  // componentDidUpdate(prevProps) {
  //   // if client failed to get user infomation
  //   if (prevProps.error !== this.props.error) {
  //     try {
  //       const error = JSON.parse(this.props.error);
  //       if (error.errorCode === 16) {
  //         // Invalid Token, Retry Login
  //         this.retrySingIn();
  //       }
  //       if (error.errorCode === 18) {
  //         // Expired Token, Request Token Refresh
  //         this.props.getRefreshToken();
  //       }
  //     } catch (e) { }
  //   }
  //   if (prevProps.refTokenResponse !== this.props.refTokenResponse) {
  //     // received new access token and refresh token
  //     window.location.reload();
  //   }
  //   if (prevProps.refTokenError !== this.props.refTokenError) {
  //     // Error on Refresh Token
  //     this.retrySingIn();
  //   }
  // }

  // retrySingIn() {
  //   this.disableWindow();
  //   this.props.tokenExpired(true);
  //   this.props.authorizeRequest(window.location.href);
  // }

  // disableWindow() {
  //   this.setState({ authorizeAgain: true });
  //   document.body.setAttribute("style", "pointer-event: none");
  // }


  // const children = this.props.children || null;

  return (
    <React.Fragment>
      {/* {this.state.authorizeAgain && <div style={shadowStyle}>
        <Card>
          <Spinner color="primary" />
          인증창으로 이동중입니다...
        </Card>
      </div>} */}
      <div id="wrapper">
        <Navbar />
        <LeftSidebar />
        <div className="content-page">
          {props.children}
          {/* <button onClick={handleOnClick}>test</button>// */}
        </div>
        <footer>
        </footer>
      </div>
    </React.Fragment>
  );
}




const mapStateToProps = (state) => {
  const { user, error } = state.User;
  const { refTokenResponse, refTokenError } = state.Auth;
  return { user, error, refTokenResponse, refTokenError };
}

const mapDispatchToProps = {
  getUser: getUser.call,
  getRefreshToken: getRefreshToken.call,
  tokenExpired,
  authorizeRequest,
  getRefreshOauthToken: getRefreshOauthToken.call
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
