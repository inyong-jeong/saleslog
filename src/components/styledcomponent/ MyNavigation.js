import React, { useState, useEffect } from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ReactComponent as Home } from '../../../src/assets/icons/main/home.svg'
import { ReactComponent as Customer } from '../../../src/assets/icons/main/customer.svg'
import { ReactComponent as Log } from '../../../src/assets/icons/main/log.svg'
import { ReactComponent as WorkGroup } from '../../../src/assets/icons/main/workgroup.svg'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';

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
        //console.log('value', value, 'path', location.pathname)

      }}
      showLabels>
      <BottomNavigationAction label="홈" icon={<Home />} value='main' />
      <BottomNavigationAction label="일지" icon={<Log />} value='main/manage' />
      <BottomNavigationAction label="고객" icon={<Customer />} value='main/customer' />
      <BottomNavigationAction label="워크그룹" icon={<WorkGroup />} value='main/workgroup' />

    </BottomNavigation>
  );
}

export default MyNavigation;