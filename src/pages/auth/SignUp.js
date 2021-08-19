import React, { useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { Spinner } from "reactstrap";
import { Helmet } from "react-helmet";
import { getCi } from "helpers/domainUtils";
import { regex } from 'constants/regex';
import useInput from 'hooks/useInput';
import { postRegisteration, postAuthNumber } from 'redux/actions';

import { proxyPath } from '@theklab/saleslog/src/proxy';

import StyledCheckbox from 'components/styledcomponent/Checkbox'
import StyledInput from 'components/styledcomponent/Input';
import StyledButton from 'components/styledcomponent/Button';
import RoundInputField from "components/RoundInputField";
import RoundHalfInputField from "components/RoundHalfInputField";

function SignIn(props) {
  const [alaramText, setAlarmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  // 회원가입 데이터
  const [useremail, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('')
  const [passwordcheck, onChangePasswordCheck] = useInput('')
  const [firstname, onChangeFirstName] = useInput('');
  const [lastname, onChangeLastName] = useInput('')
  const [authnumber, onChangeAuthNumber] = useInput('')
  const [comp_name, onChangeCompName] = useInput('')
  const [comp_domain, onChangeCompDomain] = useInput('')

  //조건 오류
  const [term, setTerm] = useState(false)
  const [termError, setTermError] = useState()
  const [emailerror, setEmailError] = useState();
  const [authnumbererror, setAuthNumberError] = useState();
  const [passworderror, setPassWordError] = useState();
  const [compnameerror, setCompNameError] = useState();
  const [compdomainerror, setCompDomainError] = useState();

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  // useEffect(() => {
  //   if (props.error) {
  //     setLoading(false);
  //   }
  // }, [props.error]);

  const onChangeTerm = useCallback((e) => {
    console.log('checked : ', e.target.checked);
    setTerm(e.target.checked);
  }, []);

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  };

  // const handleOnClick = () => {
  //   props.history.push('/signup')
  // }

  const handleLandingPage = () => {
    props.history.push('/');
  }

  const handleOnPostAuthNumber = () => {
    if (new RegExp(regex.email).exec(useremail)) {
      props.postAuthNumber(useremail)
    } else {
      setEmailError("이메일 형식이 잘못되었습니다");
    }
  }

  const handleOnCheckNumber = () => {
    if (Number(authnumber) === props.authNumberResponse) {
      setAuthNumberError('인증이 완료되었습니다.')
    } else {
      setAuthNumberError('인증번호가 틀렸습니다.')
    }
  }

  const handleOnSubmit = () => {
    if (password !== passwordcheck) {
      setPassWordError('비밀번호가 일치하지 않습니다.')
    } else if (!(new RegExp(regex.password).exec(password))) {
      setPassWordError('비밀번호 형식이 잘못되었습니다.')
    } else if (term === false) {
      setTermError('약관에 동의하여 주세요.')
    } else if (Number(authnumber) !== props.authNumberResponse) {
      setAuthNumberError('인증번호가 틀렸습니다.')
    } else if (!(new RegExp(regex.email).exec(useremail))) {
      setEmailError("이메일 형식이 잘못되었습니다");
    } else if (comp_name.length >= 20) {
      setCompNameError('이름은 최대 20자 이내여야 합니다.')
    } else if (comp_domain.lengh >= 20) {
      setCompDomainError('영문자, 숫자, 대시(-)를 포함해 4~20자 이내여야 합니다.')
    }
    else {
      props.postRegisteration(useremail, password, firstname, lastname, comp_name, comp_domain)
    }
  }

  // const handleOnSubmit = () => {
  //   props.postRegisteration('jeong@theklab.co', '1111', '인용', '정', 'comp_name', 'comp-domain')
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
    fontSize: '16px',
    color: 'black'
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
                <div style={ImgStyle}>
                  <img src={getCi()} className="auth-logo mb-3" alt="logo" onClick={handleLandingPage} />
                </div>
                <form>
                  <div className='mb-3'>
                    <h2><strong>회원가입</strong></h2>
                  </div>
                  <div className="form-group">
                    <RoundHalfInputField
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
                    />
                  </div>
                  <div className="form-group">
                    <StyledInput
                      style={{ width: '232px', fontSize: '16px' }}
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
                    <StyledInput
                      style={{ width: '232px', fontSize: '16px' }}
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
                      placeholder="비밀번호 입력(특수문자 포함 8자리 이상)"
                      value={password}
                      type="password"
                      onChange={onChangePassword}
                    />
                  </div>
                  <div className="form-group">
                    <RoundInputField
                      id="password"
                      title="비밀번호"
                      placeholder="비밀번호 확인"
                      type='password'
                      value={passwordcheck}
                      onChange={onChangePasswordCheck}
                    />
                    {passworderror && <p className="text-danger mt-2">{passworderror}</p>}
                  </div>
                  <h4 style={{ marginBottom: '4px' }}> <strong>동료들과 함께 일하고 소통할 워크그룹을 <br /> 만들어보세요</strong></h4>
                  <div className="form-group">
                    <RoundInputField
                      id="workgroup"
                      title="워크그룹"
                      placeholder="워크그룹 이름"
                      value={comp_name}
                      onChange={onChangeCompName}
                    />
                    {compnameerror && <p className="text-danger mt-2">{compnameerror}</p>}
                  </div>
                  <div className="form-group">
                    <StyledInput
                      style={{ width: '230px', fontSize: '16px' }}
                      id="domain"
                      title="도메인"
                      placeholder="your-workspace-url"
                      value={comp_domain}
                      onChange={onChangeCompDomain}
                    />
                    <span style={{ fontSize: '16px', color: 'black' }}>.saleslog.co</span>
                    {compdomainerror && <p className="text-danger mt-2">{compdomainerror}</p>}
                  </div>
                  <div className="form-group mt-3">
                    <StyledCheckbox
                      onChange={onChangeTerm}
                      style={CheckBoxStyle}>
                      동의 버튼을 선택하면 세일즈로그 서비스이용 약관,< br /> 위치정보서비스 약관, 개인정보처리 방침에 동의하게< br /> 됩니다.
                    </StyledCheckbox>
                    {(!term) && <h5 className='text text-danger'> 약관에 동의하여 주세요.</h5>}
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px' }}
                      disabled={loading}
                      onClick={handleOnSubmit}
                    >
                      다음
                    </button>
                  </div>
                </form>
                <div style={{ textAlign: 'center', fontColor: 'black' }}>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-2 col-md-2 col-sm-2"></div>
        </div>
      </div>
    </React.Fragment >
  );
}

const mapStateToProps = (state) => {
  const { error, authNumberResponse, authNumberError } = state.Auth;
  return { error, authNumberResponse, authNumberError };
};

const mapStateToDispatch = {
  postRegisteration: postRegisteration.call,
  postAuthNumber: postAuthNumber.call
}
export default connect(mapStateToProps, mapStateToDispatch)(SignIn);