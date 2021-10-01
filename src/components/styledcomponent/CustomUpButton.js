import { ArrowUpwardOutlined } from '@material-ui/icons';
import { BackTop } from 'antd';
import React from 'react';
import { useMediaQuery } from "react-responsive";

const CustomUp = () => {

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: '50%',
    color: '#000',
    backgroundColor: '#dfdfdf',
    color: '#fff',
    textAlign: 'center',
  };

  const mobileStyle = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: '50%',
    color: '#000',
    backgroundColor: '#dfdfdf',
    textAlign: 'center',
    margin: 0,
    top: 'auto',
    right: 26,
    bottom: 170,
    left: 'auto',
    position: 'fixed',
    zIndex: 10,
  };

  return (
    <>
      {
        isMobile ?
          <BackTop>
            <div style={mobileStyle}><ArrowUpwardOutlined /></div>
          </BackTop>
          :
          <BackTop>
            <div style={style}><ArrowUpwardOutlined /></div>
          </BackTop>
      }
    </>
  );
}

export default CustomUp;