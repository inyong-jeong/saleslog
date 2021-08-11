import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authorizeRequest } from 'redux/actions';
import Footer from 'components/Footer';

function TempLanding(props) {
  const [clicked, setClicked] = useState(false);
  const onSignInClick = (e) => {
    setClicked(true);
    props.authorizeRequest();
  } 

  return (
    <React.Fragment>
      <div className="container d-flex flex-column" style={{height: '100vh'}}>
        <div className="row justify-content-center my-auto">
          <div className="col-4 text-center">
            <div className="mt-3 mb-3">
              <img
                src="images/common/sl-logo-ko.png"
                width="140"
                alt="header-logo"
              />
            </div>
            <div className="mt-3 mb-3">
              <p className="">세일즈로그 임시 페이지 입니다.</p>
            </div>
            <button className="btn w-100 btn-outline-primary waves-effect mr-2" onClick={onSignInClick} disabled={clicked}>
            {clicked &&<span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>}
            로그인
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default connect(null, { authorizeRequest })(TempLanding);