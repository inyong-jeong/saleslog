import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
// import MyNavigation from './customer/ MyNavigation';

const MOBILE_TAB_SIZE = '45px'

const MobileMenu = () => {

  const DeskTopStyles = {
    visibility: 'hidden'
  }

  const TabletStyles = {
    visibility: 'hidden'
  }

  const MobileStyles = {
    display: 'flex',
    color: 'black',
    fontSize: '10px',
    listStyle: 'none',
    justifyContent: 'space-around',
    position: 'fixed',
    bottom: '0px',
    backgroundColor: "#ececec",
    height: '70px',
    alignItems: 'center',
    width: '100%',
    padding: '7px',
  }

  const bottomTabTextStyle = {
    textAlign: 'center',
  }
  const tabWrapperStyle = {
    flex: 1,
    margin: '10px'
  }
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }

  // const Default = ({ children }) => {
  //   const isNotMobile = useMediaQuery({ minWidth: 768 })
  //   return isNotMobile ? children : null
  // }




  return (
    <>
      <Desktop>
        <ul style={DeskTopStyles}>
          <li style={{ width: '60px' }}>대시보드</li>
          <li style={{ width: '60px' }}>영업일지</li>
          <li style={{ width: '60px' }}>영업일지</li>
          <li style={{ width: '60px' }}>영업일지</li>
          <li style={{ width: '60px' }}>영업일지</li>
          <li style={{ width: '60px' }}>영업일지</li>
          <li style={{ width: '60px' }}>일지작성</li>
          <li style={{ width: '60px' }}>설정</li>
          <li style={{ width: '60px' }}>기타</li>
        </ul>
      </Desktop>
      <Tablet>
        <ul style={TabletStyles}>
          <li style={{ width: '60px' }}>대시보드</li>
          <li style={{ width: '60px' }}>영업일지</li>
          <li style={{ width: '60px' }}>일지작성</li>
          <li style={{ width: '60px' }}>설정</li>
          <li style={{ width: '60px' }}>기타</li>
        </ul>
      </Tablet>

      <Mobile>
        {/* <MyNavigation /> */}
      </Mobile>
    </>
  );
};

export default MobileMenu;