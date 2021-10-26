import React, { useState, useEffect } from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ReactComponent as Home } from '../../../src/assets/icons/main/home.svg'
import { ReactComponent as Customer } from '../../../src/assets/icons/main/customer.svg'
import { ReactComponent as Log } from '../../../src/assets/icons/main/log.svg'
import { ReactComponent as WorkGroup } from '../../../src/assets/icons/main/workgroup.svg'
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
        borderColor: '#f0f0f0',
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
        setValue(newValue)

      }}
      showLabels>
      <BottomNavigationAction label="홈" icon={<Home />} value='/main' style={{ color: '#666666', fontSize: '14px' }} />
      <BottomNavigationAction label="일지" icon={<Log />} value='/main/manage' style={{ color: '#666666', fontSize: '14px' }} />
      <BottomNavigationAction label="고객" icon={<Customer />} value='/main/customer' style={{ color: '#666666', fontSize: '14px' }} />
      <BottomNavigationAction label="워크그룹" icon={<WorkGroup />} value='/main/workgroup' style={{ color: '#666666', fontSize: '14px' }} />

    </BottomNavigation>

  );
}

export default MyNavigation;