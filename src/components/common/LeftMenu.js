import React, { useState } from 'react'
import { useEffect } from 'react';
import { Menu, Switch, Divider } from 'antd';
import { ReactComponent as Home } from '../../../src/assets/icons/main/home.svg'
import { ReactComponent as Customer } from '../../../src/assets/icons/main/customer.svg'
import { ReactComponent as Log } from '../../../src/assets/icons/main/log.svg'
import { ReactComponent as WorkGroup } from '../../../src/assets/icons/main/workgroup.svg'
import { withRouter, useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function LeftMenu() {

  const [selectedKeys, setSelectedKeys] = useState('')
  const history = useHistory()
  useEffect(() => {
    //현재 location 
    const pathname = history.location.pathname
    setSelectedKeys(pathname)
  }, [])


  const menuList = [{
    title: "홈",
    icon: <Home />,
    to: "/main"
  }, {
    title: "일지",
    icon: <Log />,
    to: "/main/manage"
  }, {
    title: "고객",
    icon: <Customer />,
    to: "/main/customer"
  }, {
    title: "워크그룹",
    icon: <WorkGroup />,
    to: "/main/workgroup"
  },
  ];


  return (
    <>
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        defaultSelectedKeys={'/main'}
        selectedKeys={selectedKeys}
      >
        {
          menuList.map(value =>
            <Menu.Item key={value.to} icon={value.icon} >
              <Link to={value.to}>
                {value.title}
              </Link>
            </Menu.Item>
          )
        }

      </Menu>
    </>
  )
}
export default withRouter(LeftMenu)