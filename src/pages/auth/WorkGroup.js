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

  // const handleOnSubmit = () => {

  //   if (comp_name.length >= 20) {
  //     setCompNameError('이름은 최대 20자 이내여야 합니다.')
  //   } else if (comp_domain.lengh >= 20) {
  //     setCompDomainError('영문자, 숫자, 대시(-)를 포함해 4~20자 이내여야 합니다.')
  //   }
  //   else {
  //     props.postWorkGroup(props.email, comp_name, comp_domain)
  //   }
  // }

  const handleOnSubmit = () => {
    // props.history.push('/invite');
    console.log(props.email)
    props.postWorkGroup('jy.park@theklab.co', '생성', 'tesseasdsee')

  }


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
                    <h3><strong>동료들과 함께 일하고 소통할 <br />워크스페이스를 만들어보세요</strong></h3>
                  </div>
                  <div className="form-group">
                    <h4 style={{ paddingBottom: '7px' }}> <strong>워크스페이스의 이름을 지어볼까요?</strong></h4>
                    <RoundInputField
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
                    <h4 style={{ paddingBottom: '7px' }}> <strong>워크스페이스의 URL 주소를 정해주세요</strong></h4>
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
                    <h4 style={{ paddingBottom: '7px' }}> <strong>워크스페이스 이름과 URL 주소는 언제든지 <br /> 워크스페이스 설정페이지에서 변경할 수 <br />  있습니다.</strong></h4>
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px' }}
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
  const { authNumberResponse, authNumberError, email } = state.Auth;
  return { authNumberResponse, authNumberError, email };
};

const mapStateToDispatch = {
  postRegisteration: postRegisteration.call,
  postAuthNumber: postAuthNumber.call,
  postWorkGroup: postWorkGroup.call
}
export default connect(mapStateToProps, mapStateToDispatch)(WorkGroup);