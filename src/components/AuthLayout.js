import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getRefreshOauthToken, checkAccessToken } from 'redux/actions';
import 'antd/dist/antd.css';
import MyNavigation from "./styledcomponent/ MyNavigation";
import { useMediaQuery } from "react-responsive";
import { Layout } from 'antd'
import LeftMenu from "./common/LeftMenu";
import TopMenu from "./common/TopMenu";
import styles from '../assets/style/Main.module.css'
import RightMenu from "./common/RightMenu";
import { withRouter } from 'react-router-dom'
import CustomUp from "./styledcomponent/CustomUpButton";
import { Helmet } from "react-helmet";
const { Content, Sider, Footer } = Layout;


const AuthLayout = (props) => {

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  // 하단 NaviBar Show
  const [isNaviShow, setisNaviShow] = useState(false)
  const [isCashNaviShow, setisCashNaviShow] = useState(false)

  useEffect(() => {
    props.checkAccessToken()
    if (props.location.pathname === '/main/manage' || props.location.pathname === '/main/customer') {
      setisCashNaviShow(true)
    }
  }, [])

  useEffect(() => {
    // setisCashNaviShow(props.isCacheShowNaviBar)
    setisNaviShow(props.isShowNaviBar);
  }, [props.isShowNaviBar])

  //알림 badge 카운트 
  const badgeContent = 1

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Helmet>
        <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
      </Helmet>
      {isMobile ?
        <Layout style={{ backgroundColor: '#fff', }}>
          <div>
            {props.children}
            {/* <CustomUp /> */}
          </div>
          {(isNaviShow || isCashNaviShow) && <MyNavigation />}
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
                  <Sider width={360}>
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
  const { refTokenResponse, refTokenError, accesstokenerror, refreshtokenresponse, isShowNaviBar, isCacheShowNaviBar } = state.Auth;
  return { refTokenResponse, refTokenError, accesstokenerror, refreshtokenresponse, isShowNaviBar, isCacheShowNaviBar };
}

const mapDispatchToProps = {
  getRefreshOauthToken: getRefreshOauthToken.call,
  checkAccessToken: checkAccessToken.call
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthLayout));
