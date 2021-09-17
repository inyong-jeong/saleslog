import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getRefreshOauthToken, checkAccessToken } from 'redux/actions';
import { getOauthRefreshToken, removeAll } from 'helpers/authUtils';
import 'antd/dist/antd.css';
import MyNavigation from "./styledcomponent/ MyNavigation";
import { useMediaQuery } from "react-responsive";
import { Layout } from 'antd'
import LeftMenu from "./common/LeftMenu";
import TopMenu from "./common/TopMenu";
import styles from '../assets/style/Main.module.css'
import RightMenu from "./common/RightMenu";
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52

const { Content, Sider, Footer } = Layout;


const AuthLayout = (props) => {

  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  // 하단 NaviBar Show
  const [isNaviShow, setisNaviShow] = useState(false)

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

  useEffect(() => {
    setisNaviShow(props.isShowNaviBar);
  }, [props.isShowNaviBar])
  const badgeContent = 100
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ?
        <Layout style={{ backgroundColor: '#fff', }}>
          <div>
            {/* content-page 스타일 생략함  */}
            {props.children}
          </div>
          <MyNavigation />
        </Layout>
        :
        <div>
          <TopMenu
            badgeContent={badgeContent}
          />
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Layout className={styles.content}>
              <Content>
                <Layout style={{ backgroundColor: '#fff' }}>
                  <Sider width={180} style={{ borderRight: 'solid', borderWidth: 1, borderColor: '#EAEAEA' }}>
                    <LeftMenu />
                  </Sider>
                  <Content style={{ margin: 10, minHeight: '100vh' }}>
                    {props.children}
                  </Content>
                  <Sider width={282}>
                    <RightMenu />
                  </Sider>
                </Layout>
              </Content>
            </Layout>
          </div>
        </div>
      }
      <Footer />
    </Layout>
  );
}

const mapStateToProps = (state) => {
  const { refTokenResponse, refTokenError, accesstokenerror, refreshtokenresponse, isShowNaviBar } = state.Auth;
  return { refTokenResponse, refTokenError, accesstokenerror, refreshtokenresponse, isShowNaviBar };
}

const mapDispatchToProps = {
  getRefreshOauthToken: getRefreshOauthToken.call,
  checkAccessToken: checkAccessToken.call
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
