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
import { withRouter } from 'react-router-dom'
import { LaptopWindowsOutlined } from '@material-ui/icons';
import CustomUp from "./styledcomponent/CustomUpButton";
import cmm from 'constants/common';

const { Content, Sider, Footer } = Layout;


const AuthLayout = (props) => {

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  // 하단 NaviBar Show
  const [isNaviShow, setisNaviShow] = useState(false)

  useEffect(() => {
    props.checkAccessToken()
  }, [])

  useEffect(() => {
    if (props.accesstokenerror === '토큰만료') {
      console.log('트큰만료:::::::::::::::::::::')
      const client_id = cmm.CLIENT_ID;    // 'saleslog.co';
      const client_secret = cmm.CLIENT_SECRET; // "8fba114f8291cf28e443c30aba7cce86";
      const grant_type = "refresh_token";
      props.getRefreshOauthToken(getOauthRefreshToken(), client_id, client_secret, grant_type)
    } else if (props.accesstokenerror === 'noToken') {
      console.log('notoken::::::::::::::::::')
      removeAll()
      props.history.push('/signin')
    }
  }, [props.accesstokenerror])


  //리프레쉬 토큰이 만료됐을 때 타미오면 확인 요망
  useEffect(() => {
    if (props.refreshtokenresponse == 'invalid_grant') {
      removeAll()
      props.history.push('/signin')
    } else if (props.refreshtokenresponse == 'ok') {
      console.log('리프래시::::::::::::::::::: ',props.refreshtokenresponse)
      window.location.reload();
    }
  }, [props.refreshtokenresponse])

  useEffect(() => {
    setisNaviShow(props.isShowNaviBar);
  }, [props.isShowNaviBar])

  //알림 badge 카운트 
  const badgeContent = 1

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ?
        <Layout style={{ backgroundColor: '#fff', }}>
          <div>
            {/* content-page 스타일 생략함  */}
            {props.children}
            {/* <CustomUp /> */}
          </div>
          {isNaviShow && <MyNavigation />}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthLayout));
