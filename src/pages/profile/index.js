import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import ProfileThumbnail from 'components/ProfileThumbnail';


const profileForm = [{
  id: 'email',
  label: '이메일'
}, {
  id: 'password',
  label: '비밀번호',
  btn: true
}, {
  id: 'group_name',
  label: '부서명'
}];

const contactForm = [{
  id: 'phone_number',
  label: '전화번호'
},{
  id: 'organization_name',
  label: '소속'
}];


function Profile(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>
        세일즈로그 - 개인페이지
        </title>
      </Helmet>
      <div className="container-fluid">

        <div className="row">
          <div className="col">
            <div className="page-title-box">
              <h4 className="page-title">전체요약</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body mt-4 mb-4">
                <div className="row">
                  <div className="col-lg-2 col-md-3 col-sm-4 col-xs-auto">
                    <div className="d-flex justify-content-center">
                      <ProfileThumbnail />
                    </div>
                  </div>
                  <div className="col-lg-10 col-md-9 col-sm-7">
                    <div className="">
                      <p className="mb-2 font-15">@{props.user.email}</p>                  
                      <h4 className="mb-2">{props.user.user_name}<button className="ml-4 btn btn-xs btn-round btn-secondary" disabled={true}>{props.user.title}</button></h4>
                      <p className="mb-2">{props.user.dept_name}</p>
                      <p className="mb-2">{props.user.team_name}</p>
                    </div>
                  </div>
                </div> 
              </div> 
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="card">
              <div className="card-body">
                
                <h4 className="header-title">
                  프로필
                </h4> 

                {profileForm.map((v, i) => {
                  return (
                    <div key={v.id} className="row mb-2">
                      <label className="col-3 text-dark">{v.label}</label>
                      <div className="col-9">
                        <p>{props.user[v.id]}</p>
                        {v.btn && <button className="btn btn-xs btn-secondary"><Link to={`/main/profile/${props.user.user_id}/password`} className="text-white">비밀번호 변경</Link></button>}                       
                      </div>
                    </div>                    
                  );
                })}

              </div> 
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="card">
              <div className="card-body">
                
                <h4 className="header-title">
                  연락처
                </h4>

                {contactForm.map((v, i) => {
                  return (
                    <div key={v.id} className="row mb-2">
                      <label className="col-4">{v.label}</label>
                      <div className="col-8">
                        <p>{props.user[v.id]}</p>
                      </div>
                    </div>                    
                  );
                })}

              </div> 
            </div>
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { user } = state.User;
  return { user };
};


export default connect(mapStateToProps, null)(Profile);