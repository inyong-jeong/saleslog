import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { removeAll } from 'helpers/authUtils';

const menuList = [{
  title: "홈",
  icon: "fe-grid",
  to: "/main"
}, {
  title: "일지",
  icon: "fe-book",
  to: "/main/manage"
}, {
  title: "일지작성",
  icon: "fe-edit",
  to: "/main/upload"
}, {
  title: "고객사",
  icon: "fe-clipboard",
  to: "/main/customer"
}, {
  title: "워크그룹",
  icon: "fe-clipboard",
  to: "/main/workgroup"
},
  // {
  //   title: "일정",
  //   icon: "fe-book-open",
  //   to: "/main"
  // }
];

function openMenu() {
  document.getElementsByTagName('body')[0].setAttribute("data-sidebar-size", "condensed");
}

function collapseMenu() {
  document.getElementsByTagName('body')[0].setAttribute("data-sidebar-size", "default");
}

function resizeCallback(event) {
  if (window.screen.width < 1024) {
    openMenu();
  } else {
    collapseMenu();
  }
}

function isActiveMenu(to, pathname) {
  return pathname === to ? true : false;
}

function passId(link, param) {
  return link.replace(':id', param);
}

function LeftSidebar(props) {
  const [collapsed, setCollpased] = useState(false);
  const [userOpen, setOpen] = useState(false);

  const onSignOutClick = () => {
    removeAll();
    props.history.push('/signin');
    // props.signOut(props.history);
  }

  useEffect(() => {
    if (collapsed)
      openMenu();
    else
      collapseMenu();
  }, [collapsed]);

  useEffect(() => {
    resizeCallback();
    window.addEventListener("resize", resizeCallback);

    return () => {
      window.removeEventListener("resize", resizeCallback);
    }
  }, []);



  return (
    <React.Fragment>
      <div className="left-side-menu">
        <div className="h-100 menuitem-active" data-simplebar="init">
          <div className="simplebar-wrapper">
            <div className="simplebar-height-auto-observer-wrapper">
              <div className="simplebar-mask">
                <div className="simplebar-offset">
                  <div className="simplebar-content-wrapper">

                    {/* user profile box */}
                    <div className="user-box text-center" onClick={() => setOpen(!userOpen)} style={{ cursor: 'pointer' }}>
                      {/* <ProfileThumbnail /> */}
                      <Dropdown isOpen={userOpen} toggle={() => setOpen(!userOpen)}>
                        <DropdownToggle tag="a" className="h5 mt-2 d-block text-dark">  <i className="fe-chevron-down"></i></DropdownToggle>
                        <DropdownMenu className="user-dropdown">
                          <DropdownItem className="notify-item" onClick={onSignOutClick}>
                            <i className="fe-log-out mr-1"></i>
                            <span>로그아웃</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <p className="user-title text-muted"> </p>
                    </div>
                    {/* menu list */}
                    <div className="simple-bar-content">
                      <div id="side-menu">
                        <ul>
                          {menuList.map((v, i) =>
                            <li key={v.to} className={"menu-item " + (isActiveMenu(v.to, props.location.pathname) ? "active" : "")}>
                              <Link to={v.to}>
                                <i className={v.icon}></i>
                                <span>{v.title}</span>
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="simplebar-placeholder" style={{ width: 'auto', height: '1528px' }}></div>
            </div>
          </div>
          <div className="btn-collapse">
            <button className="btn btn-white w-100" onClick={() => setCollpased(!collapsed)}>
              {collapsed ? '펼치기' : '접기'}
              <i className={collapsed ? "fe-chevrons-right" : "fe-chevrons-left"}></i>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {};
}

export default withRouter(connect(mapStateToProps, {})(LeftSidebar));
