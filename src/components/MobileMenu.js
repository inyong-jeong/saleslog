import React from 'react';
import { useMediaQuery } from 'react-responsive';

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
    fontSize: '12px',
    listStyle: 'none',
    justifyContent: ' space-around',
    position: 'fixed',
    bottom: '0px',
    backgroundColor: 'yellow',
    height: '50px',
    alignItems: 'center',
    width: '100%'
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
        <ul style={MobileStyles}>
          <li style={{ width: '52px', border: '1px solid black' }}>대시보드</li>
          <li style={{ width: '52px' }}>영업일지</li>
          <li style={{ width: '52px' }}>일지작성</li>
          <li style={{ width: '52px' }}>설정</li>
          <li style={{ width: '52px' }}>기타</li>
        </ul>
      </Mobile>
      {/* <Default>
        <ul style={{ display: 'flex', color: 'blue', justifyContent: ' space-around' }}>
          <li style={{ width: '60px' }}><Link href="/"><a>대시보드</a></Link></li>
          <li style={{ width: '60px' }}><Link href="/profile"><a>영업일지</a></Link></li>
          <li style={{ width: '60px' }}><Link href="/login"><a>일지작성</a></Link></li>
          <li style={{ width: '60px' }}><Link href="/signup"><a>설정</a></Link></li>
          <li style={{ width: '60px' }}><Link href="/"><a>기타</a></Link></li>
        </ul>
      </Default> */}
    </>
  );
};

export default MobileMenu;