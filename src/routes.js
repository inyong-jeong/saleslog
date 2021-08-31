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


const LandingRoute = ({ component: Component, roles, ...rest }) => (
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