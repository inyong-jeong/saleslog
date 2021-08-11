import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter, Switch, Route } from 'react-router-dom';
import { getOrganization, getUserTree, getUsers } from 'redux/actions';
import { connect } from 'react-redux';

import ProfileThumbnail from 'components/ProfileThumbnail';

import InfoTable from 'components/organization/InfoTable';
import UserTable from 'components/organization/UserTable';

const MEMBER = 'team-members';
const ORGANIZATION = 'organization-info';
const GROUP = 'group';

const organizationForm = [{
  id: 'organization_name',
  label: '기업명'
}, {
  id: 'password',
  label: '사업자등록번호',
}, {
  id: 'industry',
  label: '산업분류'
}];

function Organization(props) {
  const [selectedTab, setSelectedTab] =  useState('team-members');
  const btnState = (v) => { return selectedTab === v ? "btn-primary" : "btn-light" }
  const onTabClick = (e) => { 
    if (e.target.id === ORGANIZATION)
      props.history.push(`${props.match.url}/organization`);
    else if (e.target.id === MEMBER)
      props.history.push(`${props.match.url}/member`);
    else
      props.history.push(`${props.match.url}/group`);
    setSelectedTab(e.target.id); 
  }

  useEffect(() => {
    props.getOrganization(props.user.org_id);
    props.getUsers(props.user.org_id);
    props.getUserTree(props.user.user_id);
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>세일즈로그 - 조직</title>
      </Helmet>
      <div className="container">
        
        <div className="row">
          <div className="col">
            <div className="page-title-box">
              <h4 className="page-title">조직</h4>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body mt-4 mb-4">
                <div className="row">
                  <div className="col-2">
                    <div className="d-flex justify-content-center">
                      <ProfileThumbnail />
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <button className="btn btn-xs font-8 btn-secondary">이미지 변경</button>
                    </div>
                  </div>
                  <div className="col-10">
                    <div className="">
                      <p className="mb-2 font-15">@theklab</p>                  
                      <h4 className="mb-2">{props.organization.organization_name}<button className="ml-4 btn btn-xs btn-round btn-secondary"></button></h4>
                      <p className="mb-2"></p>
                      <p className="mb-2"></p>
                    </div>
                  </div>
                </div> 
              </div> 
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="btn-group mb-2">
              <button id={ORGANIZATION} type="button" className={"btn btn-sm " + btnState(ORGANIZATION)} onClick={onTabClick}>
                조직 정보 관리
              </button>
              <button id={MEMBER} type="button" className={"btn btn-sm " + btnState(MEMBER)} onClick={onTabClick}>
                맴버 관리
              </button>
              <button id={GROUP} type="button" className={"btn btn-sm " + btnState(GROUP)} onClick={onTabClick}>
                그룹 관리
              </button>              
            </div>
          </div>
        </div>

        <Switch>
          <Route path={`${props.match.url}/organization`} render={() => <InfoTable organizationForm={organizationForm} organization={props.organization}/>} />
          <Route path={`${props.match.url}/member`} render={() => <UserTable userTree={props.tree} userList={props.users} />}  />
          <Route path={`${props.match.url}/group`} render={() => <UserTable userTree={props.tree} userList={props.users} />}  />
        </Switch>

      </div>
    </React.Fragment>);
}

const mapStateToProps = (state) => {
  const { user, tree } = state.User;
  const { organization, users } = state.Organization;
  return { user, organization, tree, users };
}
//  getUser: getUser.call,

const dispatchToProps = {
  getOrganization: getOrganization.call,
  getUserTree: getUserTree.call,
  getUsers: getUsers.call
}

export default withRouter(connect(mapStateToProps, dispatchToProps)(Organization));
