import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from "react-helmet";
import { regex } from 'constants/regex';
import useInput from 'hooks/useInput';
import { postRegisteration, postAuthNumber } from 'redux/actions';
import { useHistory } from "react-router";
import StyledCheckbox from 'components/styledcomponent/Checkbox'
import StyledButton from 'components/styledcomponent/Button';
import RoundInputField from "components/RoundInputField";
import RoundHalfInputField from "components/RoundHalfInputField";
import { ReactComponent as WhiteLogo } from '../../../src/assets/icons/main/whiteLogo.svg'
import { successMessage, } from 'constants/commonFunc';
import SignUpModal from '../../components/SignUpModal';
const SignUp = () => {

  const state = useSelector(state => state.Auth)
  const history = useHistory()
  const dispatch = useDispatch()
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  // 회원가입 인풋 상태 데이터
  const [useremail, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('')
  const [passwordcheck, onChangePasswordCheck] = useInput('')
  // const [firstname, onChangeFirstName] = useInput('');
  // const [lastname, onChangeLastName] = useInput('')
  const [authnumber, onChangeAuthNumber] = useInput('')
  const [user_name, onChangeUser_name] = useInput('')

  //조건 오류 상태 데이터
  const [term, setTerm] = useState(false)
  const [termerror, setTermError] = useState()
  const [emailerror, setEmailError] = useState();
  const [authnumbererror, setAuthNumberError] = useState();
  const [passworderror, setPassWordError] = useState();
  const [usernameerror, setUsernameerror] = useState();
  // const [compdomainerror, setCompDomainError] = useState();
  const [authnumberRes, setAuthnumberRes] = useState();


  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  useEffect(() => {

    if (state.authNumberResponse) {
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
    if (user_name === '') {
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
      setTermError('약관에 동의하여 주세요.')
      return;
    } else {
      setTermError()
    }

    dispatch(postRegisteration.call(useremail, password, user_name))
    history.push('/workgroup');

  }

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

  const CheckBoxStyle = {
    fontSize: '14px',
    color: '#aaaaaa',
    fontWeight: 'normal'
  }

  const ButtonStyle = {
    width: '104px',
    marginLeft: '7px'
  }


  // console.log(inputRef.current.focus());

  useEffect(() => {
    const name = document.getElementById('name');
    const user_email = document.getElementById('user_email');
    const authnumber = document.getElementById('authnumber');
    const password = document.getElementById('password');
    const passwordcheck = document.getElementById('passwordcheck');


    name.addEventListener('focus', (e) => {
      setUsernameerror('')
    })

    user_email.addEventListener('focus', (e) => {
      setEmailError('')
    })

    authnumber.addEventListener('focus', (e) => {
      setAuthNumberError('')
    })

    password.addEventListener('focus', (e) => {
      setPassWordError('')
    })

    passwordcheck.addEventListener('focus', (e) => {
      setPassWordError('')
    })

  }, [])
    ;
  return (
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <div className="container-md">
        <div className="row" style={ViewStyle}>
          <div style={{ margin: 'auto' }}>
            <div style={{ width: 390, backgroundColor: '#fff', height: 640 }}>
              <div className="card-body" style={CardStyle}>
                <div style={{ padding: 10, margin: 10, cursor: 'pointer' }} onClick={handleLandingPage}>
                  <WhiteLogo width={150} height={50} fill='black' />
                </div>
                <form>
                  <div className='mb-3'>

                  </div>
                  <div className="form-group">
                    <RoundInputField
                      id="name"
                      title="이름"
                      type='text'
                      placeholder="이름 입력"
                      value={user_name}
                      onChange={onChangeUser_name}
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
                        동의버튼을 선택하면 <span style={{ color: '#000000', textDecoration: 'underline' }}>세일즈로그 서비스 이용 약관,< br />개인정보 처리방침</span>에 동의하게됩니다.
                      </StyledCheckbox>
                    </div>
                    <SignUpModal />
                    {termerror && <p className='text-danger mt-2 text-center'> 약관에 동의하여 주세요.</p>}

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
        </div>
      </div>
    </>
  );
}

export default SignUp;

