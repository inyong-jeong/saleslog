import React, { useState } from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Business, CalendarToday, Create, GroupWork, Home } from '@material-ui/icons';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    padding: 8, // iphone 11 이후 밑에 바있음 패딩 줘서 조금 올려야함 
    width: '100%',
    position: 'fixed',
    bottom: 0,
  }
});

const MyNavigation = () => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const history = useHistory();

  return (
    <BottomNavigation
      className={classes.root}
      value={value}
      onChange={(e, newValue) => {
        history.push(`/${newValue}`)
        setValue(newValue)

      }}
      showLabels>
      <BottomNavigationAction label="홈" value="main" icon={<Home />} />
      <BottomNavigationAction label="일지" value="main/manage" icon={<Create />} />
      <BottomNavigationAction label="고객" value="main/customer" icon={<Business />} />
      <BottomNavigationAction label="워크그룹" value="main/workgroup" icon={<GroupWork />} />

    </BottomNavigation>
  );
}

export default MyNavigation;