import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import PolicyLayout from 'components/auth/PolicyLayout';
import UserTypeLayout from 'components/auth/UserTypeLayout';
import UserFormLayout from 'components/auth/UserFormLayout';
import SignUpCompleteLayout from 'components/auth/SignUpCompleteLayout';
import TableIndicator from 'components/auth/TableIndicator';
import { getCi } from 'helpers/domainUtils';
import { Link } from 'react-router-dom';
import { setPolicyCheck, setUserType, setUserForm, signUpUser } from 'redux/actions';


const SignUpRoute = ({ component: Component, handler: handlerProps, comepletedState: comepletedState, index: index, ...rest }) => {
  // access to prior
  if (index === 0 && comepletedState[0]) {
    return <Redirect to="/signup/usertype" />
  } else if (index === 1 && comepletedState[1]) {
    return <Redirect to="/signup/form" />
  } else if (index === 2 && comepletedState[2]) {
    return <Redirect to="/signup/complete" />
  }

  // access to forward
  if (comepletedState[0] === false && index > 0) {
    return <Redirect to="/signup/policy" />
  } else if (comepletedState[1] === false && index > 1) {
    return <Redirect to="/signup/usertype" />
  } else if (comepletedState[2] === false && index > 2) {
    return <Redirect to="/signup/form" />
  }
  return (
    <Route
      {...rest}
      render={routeProps => (
        <Component {...routeProps} {...handlerProps} />
      )}
    />
  );
}

function SignUp(props) {
  const handlePolicyCheckSubmit = () => {
    props.setPolicyCheck(true);
  }

  const handleUserTypeSubmit = (userType) => {
    props.setUserType(userType);
  }

  const handleUserFormSubmit = (userForm) => {
    if (props.userType === "manager") {
      props.signUpUser("manager", userForm);
    } else if (props.userType === "member") {
      props.signUpUser("member", userForm);
    }
  }

  const handleSignUpComplete = () => {
    props.setPolicyCheck(false);
    props.setUserType(null);
    props.setUserForm({});
    setSignUp([...INIT_STATE]);
    props.history.replace('/signin');
  }

  const INIT_STATE = [
    {
      to: '/signup/policy',
      title: '1. 이용약관 동의',
      complete: false,
      component: PolicyLayout,
      onClick: null,
      handler: {
        handleSubmit: handlePolicyCheckSubmit
      }
    },
    {
      to: '/signup/usertype',
      title: '2. 사용자 구분',
      complete: false,
      component: UserTypeLayout,
      onClick: null,
      handler: {
        handleSubmit: handleUserTypeSubmit
      }
    },
    {
      to: '/signup/form',
      title: '3. 회원정보',
      complete: false,
      onClick: null,
      component: UserFormLayout,
      handler: {
        handleSubmit: handleUserFormSubmit
      }
    },
    {
      to: '/signup/complete',
      title: '4. 가입완료',
      complete: false,
      component: SignUpCompleteLayout,
      handler: {
        handleSubmit: handleSignUpComplete
      }
    }
  ];

  const [signup, setSignUp] = useState(INIT_STATE);

  const setComplete = (index) => {
    let temp = [...signup];
    temp[index].complete = true;
    setSignUp(temp);
  }

  const componentDidMount = () => {
    signup[0].complete = props.policyCheck;
    signup[1].complete = props.userType !== null ? true : false;
    setSignUp([...signup]);
  }

  const onPolicyCheck = () => {
    if (props.policyCheck === true) {
      setComplete(0);
      props.history.replace('/signup/usertype');
    }
  }

  const onUserTypeCheck = () => {
    if (props.userType) {
      setComplete(1);
      props.history.replace('/signup/form');
    }
  }

  const onSignUpSuccess = () => {
    if (props.signUpResponse) {
      setComplete(2);
      props.history.replace('/signup/complete');
    }
  }

  useEffect(componentDidMount, []);
  useEffect(onPolicyCheck, [props.policyCheck]);
  useEffect(onUserTypeCheck, [props.userType]);
  useEffect(onSignUpSuccess, [props.signUpResponse]);
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-3 table-indicator justify-content-center">
            <TableIndicator
              className="position-fixed"
              table={signup}
              current={parseInt(signup.map((v, i) => v.to === props.location.pathname ? i.toString() : false).filter((v) => v)[0])}
            />
          </div>
          <div className="col-md-9 col-lg-6 signup-header">
            <div className="text-center mb-4">
              <img src={getCi()} className="auth-logo" alt="logo" height="72" />
            </div>
            <Switch>
              {signup.map((v, i) =>
                <SignUpRoute key={v.to} path={v.to} component={v.component} handler={v.handler} index={i} comepletedState={signup.map((v) => v.complete)} />
              )}
            </Switch>
          </div>
        </div>
        <footer style={{ height: '128px' }}>
        </footer>
        <Link to='/signin'>돌아가기</Link>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { policyCheck, userType, userForm, signUpResponse } = state.Auth;
  return { policyCheck, userType, userForm, signUpResponse };
}

export default connect(mapStateToProps, { setPolicyCheck, setUserType, setUserForm, signUpUser: signUpUser.call })(SignUp);
