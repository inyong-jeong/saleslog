import React, { useState, useEffect } from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ReactComponent as Home } from '../../../src/assets/icons/main/home.svg'
import { ReactComponent as Customer } from '../../../src/assets/icons/main/customer.svg'
import { ReactComponent as Log } from '../../../src/assets/icons/main/log.svg'
import { ReactComponent as WorkGroup } from '../../../src/assets/icons/main/workgroup.svg'
import { ReactComponent as Calendar } from '../../../src/assets/icons/main/grayCalendar.svg'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    "& .MuiBottomNavigationAction-root": {
      "@media (max-width: 768px)": {
        minWidth: "auto",
        padding: "6px 0"
      }
    }
  }
})

const MyNavigation = () => {

  const classes = useStyles()

  const [value, setValue] = useState("");
  const history = useHistory();
  const pathname = history.location.pathname;

  useEffect(() => {
    setValue(pathname)
  }, [pathname])

  return (

    <BottomNavigation
      className={classes.root}
      value={value}
      onChange={(e, newValue) => {
        history.push(`${newValue}`)
        // setValue(newValue)
      }}
    //showLabels
    >

      <BottomNavigationAction label={<span style={{ fontSize: 10 }}>일지</span>} icon={<Log stroke="#666" />} value='/main/manage' />
      <BottomNavigationAction label={<span style={{ fontSize: 10 }}>고객</span>} icon={<Customer />} value='/main/customer' />
      <BottomNavigationAction label={<span style={{ fontSize: 10 }}>일정</span>} icon={<Calendar />} value='/main/calendar' />
      <BottomNavigationAction label={<span style={{ fontSize: 10 }}>대시보드</span>} icon={<Home />} value='/main' />
      <BottomNavigationAction label={<span style={{ fontSize: 10 }}>워크그룹</span>} icon={<WorkGroup />} value='/main/workgroup' />

    </BottomNavigation>


  );
}

export default MyNavigation;