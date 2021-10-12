import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from "react-helmet";
import { regex } from 'constants/regex';
import useInput from 'hooks/useInput';
import { postInviteRegistration, postCheckIsRegistered } from 'redux/actions';
import { useHistory } from "react-router";
import StyledCheckbox from 'components/styledcomponent/Checkbox'
import StyledButton from 'components/styledcomponent/Button';
import RoundInputField from "components/RoundInputField";
import { ReactComponent as WhiteLogo } from '../../../src/assets/icons/main/whiteLogo.svg'
import { useParams } from "react-router";

const SignUpInvite = () => {

  const params = useParams()
  const state = useSelector(state => state.Auth)
  const history = useHistory()
  const dispatch = useDispatch()
  const [viewHeight, setViewHeight] = useState(window.innerHeight);


  // 회원가입 인풋 상태 데이터
  const [userEmail, setUserEmail] = useState('')
  const [password, onChangePassword] = useInput('')
  const [passwordcheck, onChangePasswordCheck] = useInput('')
  const [firstname, onChangeFirstName] = useInput('');
  const [lastname, onChangeLastName] = useInput('')
  const [authnumber, onChangeAuthNumber] = useInput('')
  const [user_name, onChangeUser_name] = useInput('')

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

    dispatch(postCheckIsRegistered.call(
      {
        user_email: decodeURIComponent(params.inviteEmail),
        invite_code: params.inviteCode,
        use_name: params.useName
      }))
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };

  }, []);

  useEffect(() => {
    if (state.postCheckisRegisteredResponse) {
      history.push('/signin')
      return
    }
    setUserEmail(decodeURIComponent(params.inviteEmail))

    // history.push('/signin')


  }, [state.loading])


  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked);
  }, []);

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  };

  const handleLandingPage = () => {
    history.push('/');
  }

  const handleOnSubmit = () => {

    if (user_name === '') {
      setUsernameerror('이름을 입력해 주세요.')
      return;
    } else {
      setUsernameerror('')
    }

    if (Number(authnumber) !== authnumberRes) {
      setAuthNumberError('인증번호가 틀렸습니다.')
      return;
    } else {
      setAuthNumberError('')
    }


    if (password !== passwordcheck) {
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

    dispatch(postInviteRegistration.call(userEmail, params.inviteCode, user_name, password, params.useName))
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

  return (
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      { // response check 
        <div className="container-md">
          <div className="row" style={ViewStyle}>
            <div style={{ margin: 'auto' }}>
              <div style={{ width: 390, backgroundColor: '#fff', height: 640 }}>
                <div className="card-body" style={CardStyle}>
                  <div style={{ padding: 10, margin: 10, cursor: 'pointer' }} onClick={handleLandingPage}>
                    <WhiteLogo width={150} height={50} fill='black' />
                  </div>
                  <form>
                    <div className="form-group">
                      <RoundInputField
                        disabled
                        id="user_email"
                        title="이메일"
                        value={userEmail}
                        onChange={setUserEmail}
                      />
                    </div>
                    <div className="form-group">
                      <RoundInputField
                        id="name"
                        title="이름"
                        placeholder="이름 입력"
                        value={user_name}
                        onChange={onChangeUser_name}
                      />
                      {usernameerror && <p className="text-danger mt-2">{usernameerror}</p>}
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
          </div>
        </div>
      }
    </>
  );
}

export default SignUpInvite;

