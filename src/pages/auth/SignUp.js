import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from "react-helmet";
import { regex } from 'constants/regex';
import useInput from 'hooks/useInput';
import { postRegisteration, postAuthNumber } from 'redux/actions';
import { useHistory } from "react-router";
import StyledCheckbox from 'components/styledcomponent/Checkbox'
import StyledInput from 'components/styledcomponent/Input';
import StyledButton from 'components/styledcomponent/Button';
import RoundInputField from "components/RoundInputField";
import RoundHalfInputField from "components/RoundHalfInputField";
import { ReactComponent as WhiteLogo } from '../../../src/assets/icons/main/whiteLogo.svg'
import { successMessage, errorMessage } from 'constants/commonFunc';


const SignUp = (props) => {
  const state = useSelector(state => state.Auth)  
  const history = useHistory()
  const dispatch = useDispatch()
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  // 회원가입 인풋 상태 데이터
  const [useremail, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('')
  const [passwordcheck, onChangePasswordCheck] = useInput('')
  const [firstname, onChangeFirstName] = useInput('');
  const [lastname, onChangeLastName] = useInput('')
  const [authnumber, onChangeAuthNumber] = useInput('')
  const [myName, onChangeMyName] = useInput('')

  //조건 오류 상태 데이터
  const [term, setTerm] = useState(false)
  const [emailerror, setEmailError] = useState();
  const [authnumbererror, setAuthNumberError] = useState();
  const [passworderror, setPassWordError] = useState();
  const [usernameerror, setUsernameerror] = useState();
  const [compdomainerror, setCompDomainError] = useState();
  const [authnumberRes, setAuthnumberRes] = useState();
  

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  useEffect(() => {
    
    if (state.authNumberResponse) {
      console.log('인증메일 :::::::::::::::::',state.authNumberResponse)
      if (state.authNumberResponse == 'No Data !!') {
        setEmailError("이미 사용중인 메일입니다.");            
      } else {
        setEmailError("");            
        setAuthnumberRes(state.authNumberResponse);
        successMessage('인증메일이 발송되었습니다');
      }
      state.authNumberResponse = null;
    }
  }, [state.authNumberResponse]);


  
  // 함수 정의
  const onChangeTerm = useCallback((e) => {
    console.log('checked : ', e.target.checked);
    setTerm(e.target.checked);
  }, []);

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  };

  const handleLandingPage = () => {
    history.push('/');
  }

  const handleOnPostAuthNumber = () => {
    if (new RegExp(regex.email).exec(useremail)) {
      dispatch(postAuthNumber.call(useremail));
      //successMessage('인증메일이 발송되었습니다');
    } else {
      setEmailError("이메일 형식이 잘못되었습니다");
    }
  }

  const handleOnCheckNumber = () => {
    if (Number(authnumber) === authnumberRes) {
      setAuthNumberError('인증이 완료되었습니다.')
    } else {
      setAuthNumberError('인증번호가 틀렸습니다.')
    }
  }

  const handleOnSubmit = () => {
    if (myName === '') {
      setUsernameerror('이름을 입력해 주세요.')
      return;
    } else {
      setUsernameerror('')
    }

    
    if (!(new RegExp(regex.email).exec(useremail))) {
      setEmailError("이메일 형식이 잘못되었습니다");    
      return;
    } else {
      setEmailError("");    
    }

    if (Number(authnumber) !== authnumberRes) {
      setAuthNumberError('인증번호가 틀렸습니다.')
      return;
    } else {
      setAuthNumberError('')
    } 


    if (password !== passwordcheck) {      
      console.log(password, passwordcheck)
      setPassWordError('비밀번호가 일치하지 않습니다.')
      return;
    } else {
      setPassWordError('')
    }
    
    if (!(new RegExp(regex.password).exec(password))) {
      setPassWordError('비밀번호 형식이 잘못되었습니다 (특수문자 포함 8자리 이상)')
      return;
    } else {
      setPassWordError('')
    } 
    
    if (term === false) {
      setTerm('약관에 동의하여 주세요.')
      return;
    } else {
      setTerm('')
    } 
    
    dispatch(postRegisteration.call(useremail, password, myName))
    history.push('/workgroup');

  }

  // const handleOnSubmit = () => {
  //   props.postRegisteration('tss0822@naver.co', '1111', '인용', '정')
  //   // props.history.push('/workgroup');

  // }

  // 컴포넌트 스타일링

  const ViewStyle = {
    height: viewHeight,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
  };

  const CardStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex'
  }

  const ImgStyle = {
    textAlign: 'center',
    cursor: 'pointer'
  }

  const CheckBoxStyle = {
    fontSize: '14px',
    color: '#aaaaaa',
    fontWeight: 'normal'
  }

  const ButtonStyle = {
    width: '104px',
    marginLeft: '7px'
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <div className="container-md">
        <div className="row" style={ViewStyle}>
          <div className="col-xxl-4 col-xl-4 col-lg-2 col-md-2 col-sm-2"></div>
          <div className="col-xxl-4 col-xl-4 col-lg-8 col-md-8 col-sm-8 align-self-center ">
            <div className="card">
              <div className="card-body" style={CardStyle}>
                <div style={{ padding: 10, margin: 10, cursor: 'pointer' }} onClick={handleLandingPage}>
                  <WhiteLogo width={150} height={50} fill='black' />
                </div>
                <form>
                  <div className='mb-3'>

                  </div>
                  <div className="form-group">
                    {/* <RoundHalfInputField
                      id="user_name"
                      title="이름"
                      placeholder="이름"
                      value={firstname}
                      onChange={onChangeFirstName}
                    />
                    <span> </span>
                    <RoundHalfInputField
                      id="user_last_name"
                      title="성"
                      placeholder="성"
                      value={lastname}
                      onChange={onChangeLastName}
                    /> */}
                    <RoundInputField
                      id="name"
                      title="이름"
                      placeholder="이름 입력"
                      value={myName}
                      onChange={onChangeMyName}
                    />
                    {usernameerror && <p className="text-danger mt-2">{usernameerror}</p>}
                  </div>
                  <div className="form-group">
                    <RoundHalfInputField

                      id="user_email"
                      title="이메일"
                      placeholder="customer@example"
                      value={useremail}
                      onChange={onChangeId}
                    />
                    <StyledButton style={ButtonStyle} onClick={handleOnPostAuthNumber}>인증번호 전송</StyledButton>
                    {emailerror && <p className="text-danger mt-2">{emailerror}</p>}
                  </div>
                  <div className="form-group">
                    <RoundHalfInputField
                      style={{ width: '232px' }}
                      id="authnumber"
                      title="인증번호"
                      placeholder="인증번호 입력"
                      value={authnumber}
                      onChange={onChangeAuthNumber}
                    />
                    <StyledButton style={ButtonStyle} onClick={handleOnCheckNumber}>확인</StyledButton>
                    {authnumbererror && <p className="text-danger mt-2">{authnumbererror}</p>}
                  </div>
                  <div className="form-group">
                    <RoundInputField
                      id="password"
                      title="비밀번호"
                      placeholder="비밀번호 입력 (특수문자 포함 8자리 이상)"
                      value={password}
                      type="password"
                      onChange={onChangePassword}
                    />
                  </div>
                  <div className="form-group">
                    <RoundInputField
                      id="passwordcheck"
                      title="비밀번호"
                      placeholder="비밀번호 확인"
                      type='password'
                      value={passwordcheck}
                      onChange={onChangePasswordCheck}
                    />
                    {passworderror && <p className="text-danger mt-2">{passworderror}</p>}
                  </div>
                  <div className="form-group mt-3">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <StyledCheckbox
                        onChange={onChangeTerm}
                        style={CheckBoxStyle}>
                        <span> </span>
                        동의 버튼을 선택하면 <span style={{ color: '#000000', textDecoration: 'underline' }}>세일즈로그 서비스 이용 약관,< br /> 위치정보 서비스 약관, 개인정보 처리방침</span>에 동의하게< br /> 됩니다.
                      </StyledCheckbox>
                    </div>
                    {(!term) && <p className='text-danger mt-2 text-center'> 약관에 동의하여 주세요.</p>}

                  </div>
                  <div className="form-group">
                    <StyledButton
                      onClick={handleOnSubmit}>
                      다음
                    </StyledButton>
                  </div>
                </form>
                <div style={{ textAlign: 'center', fontColor: 'black' }}>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-2 col-md-2 col-sm-2"></div>
        </div>
      </div >
    </React.Fragment >
  );
}

export default SignUp;

// const mapStateToProps = (state) => {
//   const { authNumberResponse, authNumberError } = state.Auth;
//   return { authNumberResponse, authNumberError };
// };

// const mapStateToDispatch = {
//   postRegisteration: postRegisteration.call,
//   postAuthNumber: postAuthNumber.call
// }
// export default connect(mapStateToProps, mapStateToDispatch)(SignUp);