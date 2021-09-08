import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRefreshOauthToken, checkAccessToken } from 'redux/actions';
import { getOauthRefreshToken, removeAll } from 'helpers/authUtils';
import 'antd/dist/antd.css';
import MyNavigation from "./styledcomponent/ MyNavigation";
import { useMediaQuery } from "react-responsive";

// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
// const Navbar = React.lazy(() => import("./Navbar"));
const LeftSidebar = React.lazy(() => import("./LeftSidebar"));

const AuthLayout = (props) => {

  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });


  useEffect(() => {
    props.checkAccessToken()
  }, [])

  useEffect(() => {
    if (props.accesstokenerror === '토큰만료') {
      const client_id = 'saleslog.co';
      const client_secret = "8fba114f8291cf28e443c30aba7cce86";
      const grant_type = "refresh_token";
      props.getRefreshOauthToken(getOauthRefreshToken(), client_id, client_secret, grant_type)
    }
  }, [props.accesstokenerror])

  useEffect(() => {
    if (props.refreshtokenresponse) {
      removeAll()
    }

  }, [props.refreshtokenresponse])

  return (
    <React.Fragment>
      <div id="wrapper">
        {/* <Navbar /> */}
        <LeftSidebar />
        <div className="content-page">
          {props.children}
        </div>
        <footer>
        </footer>
        {isMobile && <MyNavigation />}

      </div>
    </React.Fragment>
  );
}




const mapStateToProps = (state) => {
  const { refTokenResponse, refTokenError, accesstokenerror, refreshtokenresponse } = state.Auth;
  return { refTokenResponse, refTokenError, accesstokenerror, refreshtokenresponse };
}

const mapDispatchToProps = {
  getRefreshOauthToken: getRefreshOauthToken.call,
  checkAccessToken: checkAccessToken.call
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
