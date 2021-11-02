import React, { Component, Suspense } from "react";
import { HashRouter } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";

import 'antd/dist/antd.css';

import { createHashHistory } from "history";
import { syncHistoryWithStore } from "react-router-redux";
import { connect } from "react-redux";
import Loadable from "react-loadable";
import { Spin } from 'antd'
import 'wowjs/css/libs/animate.css';
import { WOW } from 'wowjs';

import { routes } from "./routes";

// setup fake backend
import { isUserAuthenticated, isUserAuthenticating } from "helpers/authUtils";


// Themes
import "./assets/scss/DefaultTheme.scss";
import 'react-sortable-tree/style.css';

// Lazy loading and code splitting -
// Derieved idea from https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const loading = () => (
  <div style={{ textAlign: 'center', height: '100vh', lineHeight: '100vh' }}>
    <Spin size='large' tip='잠시만 기다려주세요' />
  </div>
);

const NonAuthLayout = Loadable({
  loader: () => import("./components/NonAuthLayout"),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading,
});

const AuthenticatingLayout = Loadable({
  loader: () => import("./components/AuthenticatingLayout"),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading,
});

const AuthLayout = Loadable({
  loader: () => import("./components/AuthLayout"),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading,
});

/**
 * Exports the component with layout wrapped to it
 * @param {} WrappedComponent
 */
const withLayout = (WrappedComponent) => {
  const HOC = class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return connect()(HOC);
};

/**
 * Main app component
 */
class App extends Component {
  constructor(props) {
    super(props);
    let wow = new WOW({
      live: false
    });
    wow.init();
  }

  getLayout = () => {
    if (isUserAuthenticating() === "true")
      return AuthenticatingLayout;
    return isUserAuthenticated() ? AuthLayout : NonAuthLayout;
  };

  render() {
    const history = syncHistoryWithStore(
      createHashHistory(),
      this.props.historyStore

    );



    return (
      // rendering the router with layout
      <HashRouter history={history}>
        <React.Fragment>
          {routes.map((route, index) => {
            return (
              <route.route
                key={index}
                path={route.path}
                exact={route.exact}
                roles={route.roles}
                component={withLayout((props) => {
                  const Layout = this.getLayout();
                  return (
                    <Suspense fallback={loading()}>
                      <Layout {...props}>
                        <route.component {...props} />
                      </Layout>
                    </Suspense>
                  );
                })}
              />
            );
          })}
        </React.Fragment>

      </HashRouter>
    );
  }
}
export default connect(null, {})(App);