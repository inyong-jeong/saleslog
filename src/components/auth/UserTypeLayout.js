// import React, { useState } from 'react';
// import { Helmet } from 'react-helmet';
// import { Link } from 'react-router-dom';
// import Divider from 'components/Divider';

// function UserTypeLayout(props) {
//   const [userType, setUserType] = useState();

//   const handleValidSubmit = () => {
//     props.handleSubmit(userType);
//   }

//   const handleUserCardClick = (e) => {
//     setUserType(e.target.id);
//   }

//   return (
//     <React.Fragment>
//       <Helmet>
//         <title>사용자 구분</title>
//       </Helmet>
//       <div className="card">
//         <div className="card-body">
//           <p className="mb-2">2주 동안 무료 사용 가능합니다. 1주일 동안 5개 이상 작성 시, 더클랩에 알람이 갑니다.</p>
//           <h3>사용자 구분</h3>
//           <div className="row mt-3">
//             <div className="col-6">
//               <div id="manager" className="p-2 justify-content-center align-items-center user-card d-flex" onClick={handleUserCardClick}>
//                 <h4 className={userType === "manager" ? "" : "text-muted"}>
//                 관리자
//                 </h4>
//               </div>
//             </div>
//             <div className="col-6">
//               <div id="member" className="p-2 justify-content-center align-items-center user-card d-flex" onClick={handleUserCardClick}>
//                 <h4 className={userType === "member" ? "" : "text-muted"}>
//                 사원
//                 </h4>                
//               </div>
//             </div>
//             <div className="col-12 mr-3 ml-1 mt-4">
//               <button className="btn btn-outline-primary waves-effect btn-block btn-round login-btn" disabled={userType === undefined} onClick={handleValidSubmit}>
//               회원가입
//               </button>
//               <Divider className="mt-3"/>      
//               <div>
//                 <Link to="/signin" className="btn btn-sm btn-link text-muted pl-0">
//                     <i className="mdi mdi-login text-danger"></i>
//                     이미 가입된 유저
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

// export default UserTypeLayout;