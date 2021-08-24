import React from 'react';
import { Redirect } from "react-router-dom";
import { Route } from 'react-router-dom';
import {
  isUserAuthenticated,
  setUserAuthenticating,
  isUserAuthenticating,
  setUserId,
  setAuthCode,
  getOauthCode
} from './helpers/authUtils';


// lazy load all the views
const Landing = React.lazy(() => import('./pages/landing'));

// auth
const Profile = React.lazy(() => import('./pages/profile'));
const Password = React.lazy(() => import('./pages/profile/password'));
const SignIn = React.lazy(() => import('./pages/auth/SignIn'));
const FindPassword = React.lazy(() => import('./pages/auth/FindPassword'));
const FindPasswordSucceed = React.lazy(() => import('./pages/auth/FindPasswordSucceed'));
const ChangePassword = React.lazy(() => import('./pages/auth/ChangePassword'));
const SignUp = React.lazy(() => import('./pages/auth/SignUp'));
const ConfirmError = React.lazy(() => import('./pages/confirm/Error'));
const ConfirmSucceed = React.lazy(() => import('./pages/confirm/Succeed'));
const FindId = React.lazy(() => import('./pages/auth/FindId'));
const Authing = React.lazy(() => import('./components/AuthenticatingLayout'));
const WorkGroup = React.lazy(() => import('./pages/auth/WorkGroup'));
const InVite = React.lazy(() => import('./pages/auth/InVite'));
const CongratuLation = React.lazy(() => import('./pages/auth/CongratuLation'));





// handle auth and authorization
const Home = React.lazy(() => import('./pages/main/home'));
const Manage = React.lazy(() => import('./pages/manage'));
const SalesLog = React.lazy(() => import('./pages/manage/saleslog'));
const Organization = React.lazy(() => import('./pages/organization'));
const Upload = React.lazy(() => import('./pages/manage/upload'));
const Notification = React.lazy(() => import('./pages/notification'));
const Report = React.lazy(() => import('./pages/report'));
const Settings = React.lazy(() => import('./pages/settings'));
// practice
const Board = React.lazy(() => import('./pages/board'));
const Article = React.lazy(() => import('./pages/board/article'));
const Register = React.lazy(() => import('./pages/board/register'));
const Search = React.lazy(() => import('./pages/search/result.js'));
const Needs = React.lazy(() => import('./pages/needs/result.js'));
const TripReport = React.lazy(() => import('./pages/tripreport'));
const TripLog = React.lazy(() => import('./pages/tripreport/triplog'));





// const checkAuthCode = () => {
//   let queryStrings = window.location.href;
//   let authCodeRegex = new RegExp('(?!code=)[A-z0-9_-]{128}(?=&)');
//   let userIdRegex = new RegExp('user_id=[a-z0-9]{32}');
//   let authCode = authCodeRegex.exec(queryStrings);
//   let userId = userIdRegex.exec(queryStrings)
//   if (authCode) {
//     setAuthCode(authCode[0]);
//     setUserId(userId[0].split('=')[1]);
//     window.location.search = "";
//     return true;
//   } else {
//     return false;
//   }
// }

// const CheckAuthCode = () => {
//   if (getOauthCode()) {
//     return true;
//   } else {
//     return false;
//   }
// }

const AuthRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
    return <Component {...props} />
  }} />
);

const LandingRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
    // if (CheckAuthCode()) {
    //   redirect when received auth code
    //   setUserAuthenticating(true);
    //   return <Redirect to={{ pathname: '/main' }} />
    // }
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
    // const _isUserAuthenticating = isUserAuthenticating();
    // if (!(_isUserAuthenticating === "true")) 

    if (props.match.path.startsWith('/main') && !isTokenValid) {
      return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    }
    return <Component {...props} />
  }} />
);


const routes = [

  //Mai Route
  { path: '/main', name: 'Home', component: Home, route: MainRoute, exact: true },
  { path: '/main/settings', name: 'Settings', component: Settings, route: MainRoute, exact: true },
  { path: '/main/manage/saleslog/:id', name: 'SalesLog', component: SalesLog, route: MainRoute, exact: true },
  { path: '/main/manage', name: 'Manage', component: Manage, route: MainRoute, exact: true },
  { path: '/main/upload', name: 'Upload', component: Upload, route: MainRoute, exact: true },
  { path: '/main/upload/:id', name: 'Upload', component: Upload, route: MainRoute, exact: true },
  { path: '/main/organization/:id', name: 'Organization', component: Organization, route: MainRoute },
  { path: '/main/report', name: 'Report', component: Report, route: MainRoute, exact: true },
  { path: '/main/report/account', name: 'Report', component: Report, route: MainRoute, exact: true },
  { path: '/main/notification', name: 'Notification', component: Notification, route: MainRoute, exact: true },
  { path: '/main/profile/:id', name: 'Profile', component: Profile, route: MainRoute, exact: true },
  { path: '/main/profile/:id/password', name: 'Password', component: Password, route: MainRoute, exact: true },
  { path: '/main/board', name: 'Board', component: Board, route: MainRoute, exact: true },
  { path: '/main/board/register', name: 'Register', component: Register, route: MainRoute, exact: true },
  { path: '/main/board/article/:id', name: 'Article', component: Article, route: MainRoute, exact: true },
  { path: '/main/search/result', name: 'search', component: Search, route: MainRoute, exact: true },
  { path: '/main/needs/result', name: 'needs', component: Needs, route: MainRoute, exact: true },
  { path: '/main/tripreport', name: 'TripReport', component: TripReport, route: MainRoute, exact: true },
  { path: '/main/tripreport/triplog/:id', name: 'TripReport', component: TripLog, route: MainRoute, exact: true },

  //landing Route
  { path: "/", name: 'Landing', component: Landing, route: LandingRoute, exact: true },
  { path: '/signin', name: 'SignIn', component: SignIn, route: LandingRoute, exact: true },
  { path: '/findpw', name: 'FindPassword', component: FindPassword, route: LandingRoute, exact: true },
  { path: '/findpwsucceed', name: 'FindPasswordSucceed', component: FindPasswordSucceed, route: LandingRoute, exact: true },
  { path: '/change_pw', name: 'ChangePassword', component: ChangePassword, route: LandingRoute, exact: true },
  { path: '/signup', name: 'SignUp', component: SignUp, route: LandingRoute, exact: true },
  { path: '/confirm/error', name: 'ConfirmError', component: ConfirmError, route: LandingRoute, exact: true },
  { path: '/confirm/succeed', name: 'ConfirmSucceed', component: ConfirmSucceed, route: LandingRoute, exact: true },
  { path: '/findid', name: 'FindId', component: FindId, route: LandingRoute, exact: true },
  { path: '/authing', name: 'Authing', component: Authing, route: LandingRoute, exact: true },
  { path: '/authing', name: 'Authing', component: Authing, route: LandingRoute, exact: true },
  { path: '/workgroup', name: 'WorkGroup', component: WorkGroup, route: LandingRoute, exact: true },
  { path: '/invite', name: 'InVite', component: InVite, route: LandingRoute, exact: true },
  { path: '/congratulation', name: 'CongratuLation', component: CongratuLation, route: LandingRoute, exact: true },


  // {
  //   path: "/", exact: true,
  //   component: () => <Redirect to="/signin" />,
  //   route: AuthRoute
  // }
];

export { routes };