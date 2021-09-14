import React from "react";
import { Helmet } from "react-helmet";
import MobileMenu from 'components/MobileMenu';


function DashBoard(props) {

  return (
    <React.Fragment>
      <Helmet>
        세일즈로그 - 메인페이지
      </Helmet>
      <div>홈 화면</div>
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





