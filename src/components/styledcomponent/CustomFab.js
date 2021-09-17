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
  margin: 0,
  top: 'auto',
  right: 200,
  bottom: 90,
  left: 'auto',
  position: 'fixed',
  zIndex: 10,
}
const CustomFab = ({ navigateTo }) => {

  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
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
          <div style={WEB_POS}>
            <Fab style={{ backgroundColor: '#000', color: '#fff' }} onClick={navigateTo}>
              <AddIcon />
            </Fab>
          </div>
      }

    </>
  );
}

export default CustomFab;