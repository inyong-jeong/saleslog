import React, { useState, useEffect } from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ReactComponent as Home } from '../../../src/assets/icons/main/home.svg'
import { ReactComponent as Customer } from '../../../src/assets/icons/main/customer.svg'
import { ReactComponent as Log } from '../../../src/assets/icons/main/log.svg'
import { ReactComponent as WorkGroup } from '../../../src/assets/icons/main/workgroup.svg'
import { ReactComponent as Calendar } from '../../../src/assets/icons/main/grayCalendar.svg'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { useHistory, useLocation } from 'react-router';

const MyNavigation = () => {

  const [value, setValue] = useState("");
  const history = useHistory();

  useEffect(() => {
    const pathname = history.location.pathname
    setValue(pathname)
  }, [])

  return (

    <BottomNavigation
      style={{
        borderTop: 'solid',
        borderColor: '#F6F6F6',
        borderWidth: 1,
        position: 'fixed',
        bottom: 0,
        width: '100%',
        justifyContent: 'space-evenly',
        zIndex: 50,
      }}
      value={value}
      onChange={(e, newValue) => {
        history.push(`${newValue}`)
        // setValue(newValue)
      }}
    //showLabels
    >

      <BottomNavigationAction label="홈" icon={<Home />} value='/main' />
      <BottomNavigationAction label="일지" icon={<Log />} value='/main/manage' />
      <BottomNavigationAction label="고객" icon={<Customer />} value='/main/customer' />
      <BottomNavigationAction label="일정" icon={<Calendar />} value='/main/calendar' />
      <BottomNavigationAction label="워크그룹" icon={<WorkGroup />} value='/main/workgroup' />

    </BottomNavigation>

  );
}

export default MyNavigation;