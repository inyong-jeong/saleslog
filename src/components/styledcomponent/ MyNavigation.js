import React, { useState, useEffect } from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ReactComponent as Home } from '../../../src/assets/icons/main/home.svg'
import { ReactComponent as Customer } from '../../../src/assets/icons/main/customer.svg'
import { ReactComponent as Log } from '../../../src/assets/icons/main/log.svg'
import { ReactComponent as WorkGroup } from '../../../src/assets/icons/main/workgroup.svg'
import { ReactComponent as Calendar } from '../../../src/assets/icons/main/grayCalendar.svg'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { useHistory } from 'react-router';

const MyNavigation = () => {

  const [value, setValue] = useState("");
  const history = useHistory();
  const pathname = history.location.pathname;

  useEffect(() => {
    setValue(pathname)
  }, [pathname])

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
        paddingLeft: 10,
        paddingRight: 10,
      }}
      value={value}
      onChange={(e, newValue) => {
        history.push(`${newValue}`)
        // setValue(newValue)
      }}
    //showLabels
    >
      
      <BottomNavigationAction label={<span style={{fontSize:11}}>일지</span>} icon={<Log />} value='/main/manage' />
      <BottomNavigationAction label={<span style={{fontSize:11}}>고객</span>} icon={<Customer />}  value='/main/customer' />
      <BottomNavigationAction label={<span style={{fontSize:11}}>일정</span>} icon={<Calendar />}  value='/main/calendar' />
      <BottomNavigationAction label={<span style={{fontSize:10}}>워크그룹</span>} icon={<WorkGroup />}  value='/main/workgroup' />
      <BottomNavigationAction label={<span style={{fontSize:10}}>대시보드</span>} icon={<Home />}  value='/main' />

    </BottomNavigation>

  );
}

export default MyNavigation;