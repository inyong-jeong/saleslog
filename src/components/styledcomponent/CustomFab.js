import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { useMediaQuery } from "react-responsive";

const MOBILE_POS = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 90,
  left: 'auto',
  position: 'fixed',
  zIndex: 10,
}
const WEB_POS = {
  zIndex: 10,
  position: 'relative',
  marginLeft: 650,
  marginBottom: 10,
}
const CustomFab = ({ navigateTo }) => {

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });


  return (
    <>
      {
        isMobile ?
          <div style={MOBILE_POS}>
            <Fab style={{ backgroundColor: '#000', color: '#fff' }} onClick={navigateTo}>
              <AddIcon />
            </Fab>
          </div>
          :
          <div style={{ bottom: 10, width: 700, position: 'fixed', zIndex: 10 }}>
            <div style={WEB_POS}>
              <Fab style={{ backgroundColor: '#000', color: '#fff' }} onClick={navigateTo}>
                <AddIcon />
              </Fab>
            </div>
          </div>
      }

    </>
  );
}

export default CustomFab;