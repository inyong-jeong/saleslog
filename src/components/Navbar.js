import React, { useState, useRef, useEffect } from "react";
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getNotifications, putNotification, searchSalesLog, getsearchsalesLog } from "redux/actions";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { getUserId } from 'helpers/authUtils';
import { calculateDiff } from 'helpers/timeUtils';


function openMenu() {
  document.getElementsByTagName('body')[0].setAttribute("data-sidebar-size", "default");
  document.getElementsByTagName('body')[0].setAttribute("data-sidebar-mode", "mobile");
}

function collapseMenu() {
  document.getElementsByTagName('body')[0].setAttribute("data-sidebar-size", "default");
  document.getElementsByTagName('body')[0].setAttribute("data-sidebar-mode", "default");
}

function NavBar(props) {
  const [unReadCount, setUnReadCount] = useState(0);
  const [notiOpen, setNoitOpen] = useState(false);
  const [notiItems, setNotiItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navBarRef = useRef();
  const [contentValue, setContentValue] = useState("");

  document.getElementsByTagName('body')[0].setAttribute("data-sidebar-size", "default");

  useEffect(() => {
    // props.getNotifications(getUserId(), 0);
    //  hideOnClickOutside(navBarRef.current);
    collapseMenu();
  }, []);


  useEffect(() => {
    const cnt = props.notifications.filter((v) => !v.checked).length;
    setUnReadCount(cnt > 9 ? 9 : cnt);
    setNotiItems(props.notifications);
  }, [props.notifications]);

  const onNotiClick = (index) => {
    let noti = notiItems[index];
    if (!noti.checked)
      props.putNotification(noti.noti_id);
    setUnReadCount(unReadCount - 1);
    if (noti.behavior !== "delete") {
      if (noti.noti_type === "saleslog") {
        props.history.push(`/main/manage/saleslog/${noti.entity_id}`);
      } else if (noti.noti_type === "comments") {

      }
    }
  }

  const onSeeAllNotiClick = (e) => {
    e.preventDefault();
    props.history.push('/main/notification');
  }

  const onMobileCollapseClick = (e) => {
    e.preventDefault();
    if (!collapsed) {
      openMenu();
      setCollapsed(true);
    }
    else {
      collapseMenu();
      setCollapsed(false);
    }
  }

  // function hideOnClickOutside(element) {
  //   const outsideClickListener = event => {
  //       if (!element.contains(event.target)) {
  //         collapseMenu();
  //       }
  //   }
  //   document.addEventListener('click', outsideClickListener)
  // }

  const onSearch = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const keyword = contentValue;
      props.getsearchsalesLog(keyword);
      props.history.push(`/main/search/result`)
    }
  }

  const onContentChange = (event) => {
    setContentValue(event.currentTarget.value);
  };

  return (
    <React.Fragment>
      <div className="nav-bar" ref={navBarRef} >
        <div className="container-fluid">
          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li className="">
              <button className="button-menu-mobile waves-effect waves-light" onClick={onMobileCollapseClick}>
                <i className="fe-menu"></i>
              </button>
            </li>
          </ul>
          <div className="row">
            <div className="search-bar col-lg-12 col-md-10">
              <i className="fe-search noti-icon"></i>
              <input
                type="text"
                name="search"
                className="form-control border-0"
                placeholder="영업기록을 검색하세요."
                value={contentValue}
                onChange={onContentChange}
                onKeyPress={onSearch} />
              {/* <DropdownToggle data-toggle='search-box' style={{'display': 'none'}}></DropdownToggle> */}
              {/* <DropdownMenu>
                  <DropdownItem>검색결과</DropdownItem>
                  <DropdownItem>영업</DropdownItem>
                  <DropdownItem>영업일지</DropdownItem>
                  <DropdownItem>영업기록</DropdownItem>
                  <DropdownItem>영업내용</DropdownItem>
                </DropdownMenu> */}
            </div>
          </div>
          <ul className="float-right nav-icons">
            <li className="d-inline-block">
            </li>
            <li className="d-inline-block">
              <Dropdown isOpen={notiOpen} toggle={() => setNoitOpen(!notiOpen)}>
                <DropdownToggle tag="a" className="nav-link">
                  <i className="fe-bell noti-icon">
                  </i>
                  {unReadCount > 0 && <span className="badge badge-danger rounded-circle noti-icon-badge">{unReadCount}</span>}
                </DropdownToggle>
                <DropdownMenu style={{ minWidth: '320px' }} right>
                  <DropdownItem><h5>알림</h5></DropdownItem>
                  <div style={{ height: '240px', overflow: 'scroll' }}>
                    {notiItems.length === 0 && <DropdownItem>새로운 알림이 없습니다</DropdownItem>}
                    {notiItems.map((v, i) => (
                      <DropdownItem key={v.noti_id} className="notify-item" onClick={() => onNotiClick(i)}>
                        <div className="notify-icon">
                          <img src="/images/common/img_profile.png" className="img-fluid avatar-sm rounded-circle" alt="" /> </div>
                        <div>
                          <p className="notify-details font-weight-bold">{v.user_name}</p>
                          <p className="text-muted mb-0 user-msg">
                            <small>{v.note}</small>
                          </p>
                          <p className="text-primary mb-0 user-msg">
                            <small>{calculateDiff(v.creation_date)}</small>
                          </p>
                        </div>
                        <div>
                          {!v.checked && <span className="badge badge-primary rounded-circle noti-item-badge"> </span>}
                        </div>

                        {/* <span className="badge badge-danger rounded-circle"></span> */}
                      </DropdownItem>
                    ))}
                  </div>
                  <DropdownItem className="text-center pt-2 pb-2" onClick={onSeeAllNotiClick}>모든 알림 보기</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
            <li className="d-block">
              <Link to="/main/settings" className="nav-link waves-effect">
                <i className="fe-settings noti-icon"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { notifications } = state.Notification;
  const { salesLogList, searchsalesLogList } = state.SalesLog;
  return { notifications, salesLogList, searchsalesLogList }
}

const dispatchToProps = {
  getNotifications: getNotifications.call,
  putNotification: putNotification.call,
  searchSalesLog: searchSalesLog,
  getsearchsalesLog: getsearchsalesLog.call
}

export default withRouter(connect(mapStateToProps, dispatchToProps)(NavBar));
