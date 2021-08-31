import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import MobileMenu from 'components/MobileMenu';

function DashBoard(props) {

  return (
    <React.Fragment>
      <Helmet>
        세일즈로그 - 메인페이지
      </Helmet>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
          </div>
        </div>
      </div>
      <div className="row">
        <MobileMenu />
      </div>
    </React.Fragment>
  );
}



export default (DashBoard);
