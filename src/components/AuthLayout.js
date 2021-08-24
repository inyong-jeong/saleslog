import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRefreshOauthToken } from 'redux/actions';
import { getOauthRefreshToken, isUserAuthenticated } from 'helpers/authUtils';
import MobileMenu from 'components/MobileMenu'

// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Navbar = React.lazy(() => import("./Navbar"));
const LeftSidebar = React.lazy(() => import("./LeftSidebar"));
const isTokenValid = isUserAuthenticated();

const AuthLayout = (props) => {

  useEffect(() => {
    if (!isTokenValid) {
      const client_id = 'saleslog.co';
      const client_secret = "8fba114f8291cf28e443c30aba7cce86";
      const grant_type = "refresh_token";
      props.getRefreshOauthToken(getOauthRefreshToken(), client_id, client_secret, grant_type)
    }
  }, [isTokenValid])

  return (
    <React.Fragment>
      <div id="wrapper">
        {/* <Navbar /> */}
        <LeftSidebar />
        <div className="content-page">
          {props.children}
          {/* <button onClick={handleOnClick}>test</button>// */}
        </div>
        <footer>
        </footer>
        {/* <MobileMenu /> */}
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
  getRefreshOauthToken: getRefreshOauthToken.call
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
