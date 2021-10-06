import React, { useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import { getCi } from "helpers/domainUtils";
import { regex } from 'constants/regex';
import useInput from 'hooks/useInput';
import { postRegisteration, postAuthNumber, postWorkGroup } from 'redux/actions';

//import { proxyPath } from '@theklab/saleslog/src/proxy';

import StyledCheckbox from 'components/styledcomponent/Checkbox'
import StyledInput from 'components/styledcomponent/Input';
import StyledButton from 'components/styledcomponent/Button';
import RoundInputField from "components/RoundInputField";
import RoundHalfInputField from "components/RoundHalfInputField";
import { ReactComponent as WhiteLogo } from '../../../src/assets/icons/main/whiteLogo.svg'
import { ReactComponent as BdayLogo } from '../../../src/assets/icons/main/bday.svg'

function WorkGroup(props) {
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  // 워크그룹 인풋 상태 데이터

  const [comp_name, onChangeCompName] = useInput('')
  const [comp_domain, onChangeCompDomain] = useInput('')

  //조건 오류 상태 데이터
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

  // 함수 정의

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  };

  // const handleOnClick = () => {
  //   props.history.push('/signup')
  // }

  const handleLandingPage = () => {
    props.history.push('/');
  }





  // const handleOnSubmit = () => {
  //   if (comp_name.length >= 20) {
  //     setCompNameError('이름은 최대 20자 이내여야 합니다.')
  //   } else if (comp_domain.lengh >= 20) {
  //     setCompDomainError('영문자, 숫자, 대시(-)를 포함해 4~20자 이내여야 합니다.')
  //   }
  //   else {
  //   }
  // }

  const handleOnSubmit = () => {

    if (comp_name.length >= 20) {
      setCompNameError('이름은 최대 20자 이내여야 합니다.')
      return;
    } else {
      setCompNameError('')
    }

    if (comp_domain.lengh >= 20) {
      setCompDomainError('영문자, 숫자, 대시(-)를 포함해 4~20자 이내여야 합니다.')
      return;
    } else {
      setCompDomainError('');
    }

    props.postWorkGroup(props.email, comp_name, comp_domain)

  }

  // const handleOnSubmit = () => {
  //   // props.history.push('/invite');
  //   console.log(props.email)
  //   props.postWorkGroup(props.email, '생성', 'tesseasdsee')


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

  return (
    <>
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
                    <h4 style={{ textAlign: 'center', fontSize: 15, marginTop: 10, color: '#111' }}>
                      <BdayLogo /> &nbsp; 동료들과  함께 일하고 소통할  워크스페이스를 만들어보세요!
                    </h4>
                  </div>
                  <div className="form-group">
                    <div className='mb-3' />
                    <h4 style={{ fontSize: 15, marginTop: 10, color: '#111', marginBottom: 5, }}>
                      워크스페이스의 이름을 지어볼까요?
                    </h4>
                    <StyledInput
                      id="workgroup"
                      title="워크그룹"
                      placeholder="워크그룹 이름"
                      value={comp_name}
                      onChange={onChangeCompName}
                    />
                    {compnameerror && <p className="text-danger mt-2">{compnameerror}</p>}
                  </div>
                  <div className='mt-3'></div>
                  <div className="form-group">
                    <h4 style={{ fontSize: 15, marginTop: 10, color: '#111', marginBottom: 5, }}>
                      워크스페이스의 URL 주소를 정해주세요.
                    </h4>
                    <StyledInput
                      style={{ width: '300px', fontSize: '16px' }}
                      id="domain"
                      title="도메인"
                      placeholder="your-workspace-url"
                      value={comp_domain}
                      onChange={onChangeCompDomain}
                    />
                    <span style={{ fontSize: '16px', color: 'black' }}> .saleslog.co</span>
                    {compdomainerror && <p className="text-danger mt-2">{compdomainerror}</p>}
                  </div>
                  <div className="form-group mt-3">
                    <h4 style={{ fontSize: 14, marginTop: 10, color: '#333', marginBottom: 5, textAlign: 'center' }}>
                      워크스페이스 이름과 URL 주소는 언제든지 워크스페이스 설정페이지에서 변경할 수 있습니다.
                    </h4>
                  </div>
                  <div className="form-group">
                    <StyledButton onClick={handleOnSubmit} >
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
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { authNumberResponse, authNumberError, email } = state.Auth;
  return { authNumberResponse, authNumberError, email };
};

const mapStateToDispatch = {
  postRegisteration: postRegisteration.call,
  postAuthNumber: postAuthNumber.call,
  postWorkGroup: postWorkGroup.call
}
export default connect(mapStateToProps, mapStateToDispatch)(WorkGroup);