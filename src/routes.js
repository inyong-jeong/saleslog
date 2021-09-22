import React from 'react';
import { Redirect } from "react-router-dom";
import { Route } from 'react-router-dom';
import { isUserAuthenticated } from './helpers/authUtils';


//로그인 관련 컴포넌트
const Landing = React.lazy(() => import('./pages/landing'));
const SignIn = React.lazy(() => import('./pages/auth/SignIn'));
const FindPassword = React.lazy(() => import('./pages/auth/FindPassword'));
const FindPasswordSucceed = React.lazy(() => import('./pages/auth/FindPasswordSucceed'));
const ChangePassword = React.lazy(() => import('./pages/auth/ChangePassword'));
const SignUp = React.lazy(() => import('./pages/auth/SignUp'));
const FindId = React.lazy(() => import('./pages/auth/FindId'));
const Authing = React.lazy(() => import('./components/AuthenticatingLayout'));
const WorkGroup = React.lazy(() => import('./pages/auth/WorkGroup'));
const InVite = React.lazy(() => import('./pages/auth/InVite'));
const CongratuLation = React.lazy(() => import('./pages/auth/CongratuLation'));



//메인 화면 관련 컴포넌트
const Home = React.lazy(() => import('./pages/main/home'));
const Manage = React.lazy(() => import('./pages/manage'));
const SalesLog = React.lazy(() => import('./pages/manage/saleslog'));
const Upload = React.lazy(() => import('./pages/manage/upload'));
const Temporary = React.lazy(() => import('./pages/manage/upload/temporary'));

//고객, 고객담당자 관련 route 
const Customer = React.lazy(() => import('./pages/customer'))
const CustomerAdd = React.lazy(() => import('./pages/customer/register'))
const CustomerManagerRegister = React.lazy(() => import('./pages/customer/registerManager'))
const CustomerDetails = React.lazy(() => import('./pages/customer/profile'))
const CustomerEdit = React.lazy(() => import('./pages/customer/edit'))
const ManagerProfile = React.lazy(() => import('./pages/customer/profile/manager'))
const ManagerEdit = React.lazy(() => import('./pages/customer/edit/manager'))

//워크그룹, 그룹 수정 , 그룹 나가기
const Workgroup = React.lazy(() => import('./pages/workgroup'))
const WorkgroupReg = React.lazy(() => import('./pages/workgroup/register'))
const WorkgroupUpd = React.lazy(() => import('./pages/workgroup/update'))
const WorkgroupDeptReg = React.lazy(() => import('./pages/workgroup/dept'))
const WorkgroupMember = React.lazy(() => import('./pages/workgroup/member'))
const WorkgroupMemberInvite = React.lazy(() => import('./pages/workgroup/member/invite'))
const WorkgroupMemberProfile = React.lazy(() => import('./pages/workgroup/member/profile'))
const WorkgroupOut = React.lazy(() => import('./pages/workgroup/outwgroup'))
const WorkgroupDel = React.lazy(() => import('./pages/workgroup/delwgroup'))
const WorkgroupChg = React.lazy(() => import('./pages/workgroup/chgwgroup'))

//프로필 , 공지사항
const myProfile = React.lazy(() => import('./pages/etc/profile'))
const wgroupNotice = React.lazy(() => import('./pages/etc/notice/group'))
const wgroupNoticeRegi = React.lazy(() => import('./pages/etc/notice/group/register'))
const wgroupNoticeDetail = React.lazy(() => import('./pages/etc/notice/group/detail'))
const wgroupNoticeUpd = React.lazy(() => import('./pages/etc/notice/group/update'))
const systemNotice = React.lazy(() => import('./pages/etc/notice/system'))
const systemNoticeRegi = React.lazy(() => import('./pages/etc/notice/system/register'))
const systemNoticeDetail = React.lazy(() => import('./pages/etc/notice/system/detail'))
const systemNoticeUpd = React.lazy(() => import('./pages/etc/notice/system/update'))


//const systemNoticeList = React.lazy(() => import('./pages/etc/notice/system/list'))

// 설정 등
const AppInfo = React.lazy(() => import('./pages/appInfo'))
const NotificationSetting = React.lazy(() => import('./pages/settings/notification'))

//지원센터 
const SupportPage = React.lazy(() => import('./pages/support'))
const MyInquiryDetails = React.lazy(() => import('./pages/support/detail'))

const LandingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    const isTokenValid = isUserAuthenticated();
    if (props.match.path === '/' && isTokenValid) {
      // redirect to main
      return <Redirect to={{ pathname: '/main', state: { from: props.location } }} />
    }
    return <Component {...props} />
  }} />
);

const MainRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
    const isTokenValid = isUserAuthenticated();
    if (props.match.path.startsWith('/main') && !isTokenValid) {
      return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    }
    return <Component {...props} />
  }} />
);

const routes = [
  //Main Route
  { path: '/main', name: 'Home', component: Home, route: MainRoute, exact: true },
  { path: '/main/manage/saleslog/:id', name: 'SalesLog', component: SalesLog, route: MainRoute, exact: true },
  { path: '/main/manage', name: 'Manage', component: Manage, route: MainRoute, exact: true },
  { path: '/main/upload', name: 'Upload', component: Upload, route: LandingRoute, exact: true },
  { path: '/main/upload/:id', name: 'Upload', component: Upload, route: MainRoute, exact: true },
  // { path: '/main/upload/temporary/:id', name: 'Temporary', component: Temporary, route: MainRoute, exact: true },
  //고객사 
  { path: '/main/customer', name: 'Customer', component: Customer, route: MainRoute, exact: true },
  { path: '/main/customer/register', name: 'CustomerAdd', component: CustomerAdd, route: MainRoute, exact: true },
  { path: '/main/customer/register_manager/:accId/:managerId', name: 'ManagerRegister', component: CustomerManagerRegister, route: MainRoute, exact: true },
  { path: '/main/customer/details/:accId/:managerId', name: 'CustomerDetails', component: CustomerDetails, route: MainRoute, exact: true },
  { path: '/main/customer/edit/:accId/:managerId', name: 'CustomerEdit', component: CustomerEdit, route: MainRoute, exact: true },
  { path: '/main/manager/profile/:accId/:singleId', name: 'ManagerProfile', component: ManagerProfile, route: MainRoute, exact: true },
  { path: '/main/manager/editManager/:singleId/:accId', name: 'ManagerEdit', component: ManagerEdit, route: MainRoute, exact: true },

  //워크그룹 
  { path: '/main/workgroup', name: 'Workgroup', component: Workgroup, route: MainRoute, exact: true },
  { path: '/main/workgroup/register', name: 'WorkgroupReg', component: WorkgroupReg, route: MainRoute, exact: true },
  { path: '/main/workgroup/update', name: 'WorkgroupUpd', component: WorkgroupUpd, route: MainRoute, exact: true },
  { path: '/main/workgroup/dept', name: 'WorkgroupDeptReg', component: WorkgroupDeptReg, route: MainRoute, exact: true },
  { path: '/main/workgroup/member', name: 'WorkgroupMember', component: WorkgroupMember, route: MainRoute, exact: true },
  { path: '/main/workgroup/member/invite', name: 'WorkgroupMemberInvite', component: WorkgroupMemberInvite, route: MainRoute, exact: true },
  { path: '/main/workgroup/member/profile/:memberId', name: 'WorkgroupMemberProfile', component: WorkgroupMemberProfile, route: MainRoute, exact: true },
  { path: '/main/workgroup/outwgroup', name: 'WorkgroupOut', component: WorkgroupOut, route: MainRoute, exact: true },
  { path: '/main/workgroup/delwgroup', name: 'WorkgroupDel', component: WorkgroupDel, route: MainRoute, exact: true },
  { path: '/main/workgroup/chgwgroup', name: 'WorkgroupChg', component: WorkgroupChg, route: MainRoute, exact: true },

  //기타 (프로필 수정 및 공지사항)
  { path: '/main/etc/profile', name: 'myProfile', component: myProfile, route: MainRoute, exact: true },
  { path: '/main/etc/notice/group', name: 'wgroupNotice', component: wgroupNotice, route: MainRoute, exact: true },
  { path: '/main/etc/notice/group/register', name: 'wgroupNoticeRegi', component: wgroupNoticeRegi, route: MainRoute, exact: true },
  { path: '/main/etc/notice/group/detail/:noticeId', name: 'wgroupNoticeDetail', component: wgroupNoticeDetail, route: MainRoute, exact: true },
  { path: '/main/etc/notice/group/update/:noticeId', name: 'wgroupNoticeUpd', component: wgroupNoticeUpd, route: MainRoute, exact: true },
  { path: '/main/etc/notice/system', name: 'systemNotice', component: systemNotice, route: MainRoute, exact: true },
  { path: '/main/etc/notice/system/register', name: 'systemNoticeRegi', component: systemNoticeRegi, route: MainRoute, exact: true },
  { path: '/main/etc/notice/system/detail/:noticeId', name: 'systemNoticeDetail', component: systemNoticeDetail, route: MainRoute, exact: true },
  { path: '/main/etc/notice/system/update/:noticeId', name: 'systemNoticeUpd', component: systemNoticeUpd, route: MainRoute, exact: true },
  
  
  //프로필 및 설정 등
  { path: '/main/information', name: 'AppInfo', component: AppInfo, route: MainRoute, exact: true },
  { path: '/main/notification', name: 'NotificationSetting', component: NotificationSetting, route: MainRoute, exact: true },

  //지원
  { path: '/main/support', name: 'SupportPage', component: SupportPage, route: MainRoute, exact: true },
  { path: '/main/support/details/:id', name: 'MyInquiryDetails', component: MyInquiryDetails, route: MainRoute, exact: true },


  //landing Route
  { path: "/", name: 'Landing', component: Landing, route: LandingRoute, exact: true },
  { path: '/signin', name: 'SignIn', component: SignIn, route: LandingRoute, exact: true },
  { path: '/findpw', name: 'FindPassword', component: FindPassword, route: LandingRoute, exact: true },
  { path: '/findpwsucceed', name: 'FindPasswordSucceed', component: FindPasswordSucceed, route: LandingRoute, exact: true },
  { path: '/change_pw', name: 'ChangePassword', component: ChangePassword, route: LandingRoute, exact: true },
  { path: '/signup', name: 'SignUp', component: SignUp, route: LandingRoute, exact: true },
  { path: '/findid', name: 'FindId', component: FindId, route: LandingRoute, exact: true },
  { path: '/authing', name: 'Authing', component: Authing, route: LandingRoute, exact: true },
  { path: '/workgroup', name: 'WorkGroup', component: WorkGroup, route: LandingRoute, exact: true },
  { path: '/invite', name: 'InVite', component: InVite, route: LandingRoute, exact: true },
  { path: '/congratulation', name: 'CongratuLation', component: CongratuLation, route: LandingRoute, exact: true },
];

export { routes };