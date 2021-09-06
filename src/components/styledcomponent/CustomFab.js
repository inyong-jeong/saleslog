import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
const FAB_POSITION = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 90,
  left: 'auto',
  position: 'fixed',
}
// floating action bar 
//클릭시 어디로 이동할지 prop으로 넘겨줌 
const CustomFab = ({ navigateTo }) => {

  return (
    <div style={FAB_POSITION}>
      <Fab style={{ backgroundColor: '#0000FF', color: '#fff' }} onClick={navigateTo}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export default CustomFab;