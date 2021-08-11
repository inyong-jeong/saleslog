// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import { connect } from 'react-redux';
// import { Spinner } from 'reactstrap';
// import { checkEmail, initForm, setUserForm } from 'redux/actions';
// import FormGenerator from './FormGenerator';
// import { Link } from 'react-router-dom';
// import Divider from 'components/Divider';
// import { userForm, userCompanyForm, companyForm, industryMediumCategory } from './form';

// function UserFormLayout(props) {
//   const [form, setForm] = useState(props.userType === "member" ? {form: userForm.concat(userCompanyForm) } : {form: userForm.concat(companyForm)});
//   const [error, setError] = useState(undefined);
//   const [verbose, setErrorVerbose] = useState('');
//   const [formState, setFormState] = useState({
//     'email': '',
//     'password': '',
//     'passwordConfirm': '',
//     'user_name': '',
//     'ph1': '',
//     'ph2': '',
//     'ph3': '',
//     'receive_email': null,
//     'organization_name': '',
//     'industry_large': '',
//     'industry_medium': '',
//     'ceo_name': '',
//     'address': '',
//     'address_detail': '',
//     'ph1_corp': '',
//     'ph2_corp': '',
//     'ph3_corp': '',
//     'fax1_corp': '',
//     'fax2_corp': '',
//     'fax3_corp': '',
//     'registration_number': ''
//   });
//   const [isFormValid, setFormValid] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!props.emailPassed) {
//       setError('이메일 중복을 확인해주세요');
//       return;
//     }
//     if (formState.password !== formState.passwordConfirm) {
//       setError('입력된 비밀번호와 비밀번호 확인이 다릅니다');
//       return;
//     } 
//     if (isFormValid) {
//       let form = {
//         'user': {
//           'email': formState.email,
//           'password': formState.password,
//           'user_name': formState.user_name,
//           'phone_number': `${formState.ph1}-${formState.ph2}-${formState.ph3}`,
//           'receive_email': formState.receive_email === "send" ? true : false,
//         },
//         'org': {
//           'organization_name': formState.organization_name,
//           'ceo_name': formState.ceo_name,
//           'address': formState.address,
//           'address_detail': formState.address_detail,
//           'industry_large': formState.industry_large,
//           'industry_medium': formState.industry_medium,
//           'registration_number': formState.registration_number,
//           'phone_number': `${formState.ph1_corp}-${formState.ph2_corp}-${formState.ph3_corp}`,
//           'fax_number': `${formState.fax1_corp}-${formState.fax2_corp}-${formState.fax3_corp}`,
//         }
//       }
//       props.handleSubmit(form);
//     } else {
//       setError(`${verbose}을(를) 확인해주세요`);
//     }
//   }

//   const handleCancelClcik = () => {
//     props.history.push('/signin');
//   }

//   const onFormValid = (isValid, verbose) => {
//     if (isValid){
//       console.log('valid');
//       setFormValid(true);
//     }
//     else {
//       console.log('not valid:', verbose.label);      
//       setErrorVerbose(verbose.label);  
//     }
//   }

//   const handleEmailOverlapCheck = (e) => {
//     e.preventDefault();
//     props.checkEmail(formState.email);
//   }

//   const handleLargeIndsChange = (e) => {
//     if (e.target.value !== '0') {
//       form.form[14].multiFields[1].options = industryMediumCategory[e.target.value];
//       setForm({...form});
//     }
//   }

//   useEffect(() => {
//     console.log(formState);
//   }, [formState]);

//   useEffect(() => {
//     props.initForm();
//   }, []);

//   useEffect(() => {
//     if (props.emailPassed === true) {
//       form.form[2].note = '사용가능한 이메일입니다.'
//       setForm({...form});
//     } else if (props.emailPassed === false) {
//       form.form[2].note = '사용불가능한 이메일입니다.'
//       setForm({...form});
//     }
//   }, [props.emailPassed]);

//   const handlePostCode = (e) => {
//     e.preventDefault();
//      new window.daum.Postcode({
//         oncomplete: function(data) {
//           var addr = ''; // 주소 변수
//           var extraAddr = ''; // 참고항목 변수

//           //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
//           if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
//             addr = data.roadAddress;
//           } else { // 사용자가 지번 주소를 선택했을 경우(J)
//             addr = data.jibunAddress;
//           }

//           // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
//           if(data.userSelectedType === 'R'){
//             // 법정동명이 있을 경우 추가한다. (법정리는 제외)
//             // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
//             if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
//                 extraAddr += data.bname;
//             }
//             // 건물명이 있고, 공동주택일 경우 추가한다.
//             if(data.buildingName !== '' && data.apartment === 'Y'){
//                 extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
//             }
//             // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
//             if(extraAddr !== ''){
//                 extraAddr = ' (' + extraAddr + ')';
//             }
//             // 조합된 참고항목을 해당 필드에 넣는다.
//             setFormState({
//               ...formState,
//               'address': `${addr}, ${data.zonecode}`,
//               'post_code': `${data.zonecode}`
//             });
//           } else {
//           }
//         }
//     }).open();
//   }

//   const handler = {
//     'email': handleEmailOverlapCheck,
//     'address': handlePostCode,
//     'industry_large': handleLargeIndsChange
//   };

//   return (
//     <React.Fragment>
//       <Helmet>
//         <title>회원가입</title>
//       </Helmet>
//       <div className="card">
//         <div className="card-body">
//           {<FormGenerator form={form} state={formState} setState={setFormState} handler={handler} onFormValid={onFormValid} disabled={props.signUpLoading}/>}
//           <form>
//             <p className="text-danger">{error}</p>
//             <div className="row justify-content-center mt-4">
//               <div className="col-6">
//                 <button className="btn btn-primary btn-block" onClick={handleSubmit} disabled={props.signUpLoading}>
//                 {props.signUpLoading && <Spinner color="white" size="sm" />}
//                 {!props.signUpLoading && "확인"}
//                 </button>
//               </div>
//               <div className="col-6">
//                 <button className="btn btn-white btn-block btn-border" onClick={handleCancelClcik} disabled={props.signUpLoading}>
//                 취소
//                 </button>
//               </div>            
//             </div>
//           </form>
//           <Divider className="mt-3" />
//           <div>
//             <Link to="/signin" className="btn btn-sm btn-link text-muted pl-0">
//                 <i className="mdi mdi-login text-danger"></i>
//                 이미 가입된 유저
//             </Link>
//           </div>          
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

// const mapStateToProps = (state) => {
//   const { emailPassed, userType, signUpLoading } = state.SignUp;
//   return { emailPassed, userType, signUpLoading };
// }

// export default connect(mapStateToProps, { checkEmail: checkEmail.call, initForm })(UserFormLayout);
