import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { signOut } from 'redux/actions';
import { removeAll } from 'helpers/authUtils';

// import { isLearningLogAvailable } from "helpers/domainUtils";

import ProfileThumbnail from 'components/ProfileThumbnail';

const menuList = [{
  title: "대시보드",
  icon: "fe-grid",
  to: "/main"
}, {
  title: "영업일지",
  icon: "fe-book",
  to: "/main/manage"
}, {
  title: "일지작성",
  icon: "fe-edit",
  to: "/main/upload"
}, {
  title: "리포트",
  icon: "fe-clipboard",
  to: "/main/report"
}, {
  title: "공지사항",
  icon: "fe-book-open",
  to: "/main/board"
}
];

// {
//   title: "출장보고서",
//   icon: "fe-edit",
//   to: "/main/tripreport"
// },
// , {
//   title: "인사관리",
//   icon: "fe-users",
//   to: "/main/organization/:id/member"
// }

// , {
//   title: "고객사",
//   icon: "fe-user",
//   to: "/main/account"
// }

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

  const onLogoClick = (e) => {
    e.preventDefault();
    props.history.push('/');
  }

  const onProfileClick = (e) => {
    e.preventDefault();
    props.history.push(`/main/profile/${props.user.user_id}`);
  }

  return (
    <React.Fragment>
      <div className="left-side-menu">
        <div className="h-100 menuitem-active" data-simplebar="init">
          <div className="simplebar-wrapper">
            <div className="simplebar-height-auto-observer-wrapper">
              <div className="simplebar-mask">
                <div className="simplebar-offset">
                  <div className="simplebar-content-wrapper">

                    {/* logo */}
                    <div className="side-bar-logo text-center" onClick={onLogoClick}>
                      <img className="logo-lg" src='/images/common/logo.png' alt="" />
                      <img className="logo-sm" src='/images/common/logo-sm.png' alt="" />
                    </div>

                    {/* user profile box */}
                    <div className="user-box text-center" onClick={() => setOpen(!userOpen)} style={{ cursor: 'pointer' }}>
                      <ProfileThumbnail />
                      <Dropdown isOpen={userOpen} toggle={() => setOpen(!userOpen)}>
                        <DropdownToggle tag="a" className="h5 mt-2 d-block text-dark">{props.user.user_name} <i className="fe-chevron-down"></i></DropdownToggle>
                        <DropdownMenu className="user-dropdown">
                          <DropdownItem className="notify-item" onClick={onProfileClick}>
                            <i className="fe-user mr-1"></i>
                            <span>개인페이지</span>
                          </DropdownItem>
                          <DropdownItem className="notify-item" onClick={onSignOutClick}>
                            <i className="fe-log-out mr-1"></i>
                            <span>로그아웃</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <p className="user-title text-muted">{props.user.title}</p>
                    </div>
                    {/* menu list */}
                    <div className="simple-bar-content">
                      <div id="side-menu">
                        <ul>
                          {menuList.map((v, i) =>
                            <li key={v.to} className={"menu-item " + (isActiveMenu(v.to, props.location.pathname) ? "active" : "")}>
                              <Link to={passId(v.to, props.user.org_id)}>
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
  const { user } = state.User;
  return { user };
}

export default withRouter(connect(mapStateToProps, { signOut })(LeftSidebar));
