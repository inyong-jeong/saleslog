import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import { getCi } from "helpers/domainUtils";
import useInput from 'hooks/useInput';
import { postInvite } from 'redux/actions';

import Select from 'react-select';

import StyledInput from 'components/styledcomponent/Input';
import StyledButton from 'components/styledcomponent/Button';

function inVite(props) {
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  // 초대메일 인풋 상태 데이터

  const [invitemail, onChangeInViteMail] = useInput('')

  // 초대메일 인풋 상태 데이터
  const [memberstatus, setMemberStatus] = useState(0);
  const [compdomainerror, setCompDomainError] = useState();

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  useEffect(() => {
    if (props.postinviteResponse === 'OK') {
      props.history.push('/congratulation')
    }
  }, [props.postinviteResponse])

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  };


  const handleLandingPage = () => {
    props.history.push('/');
  }

  const handleOnSubmit = () => {
    // const log_idx = props.postworkgroupResponse;
    // props.postInvite(log_idx, invitemail, memberstatus)
    props.postInvite(10000023, 'jy.park@theklab.co', memberstatus)


  }

  const onMemberStatus = (option) => {
    console.log(option.value);
    setMemberStatus(option.value)
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

  const memberStatusOption = [{ label: '관리자', value: 0 }, { label: '치프매니저', value: 1 }, { label: '매니저', value: 2 }, { label: '세일즈맨', value: 9 }];
  const selectStyle = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid black',
      width: '120px'
    }),
    control: (defaultStyle) => ({ ...defaultStyle, width: '120px', height: '48px', borderColor: 'black', marginRight: '3px' }),
    indicatorSeparator: () => { }
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
                    <h4><strong>동료들과 함께 성과를 달성하세요!</strong></h4>
                  </div>
                  <div className="form-group" style={{ display: 'flex' }}>
                    <Select
                      placeholder="멤버 구분"
                      options={memberStatusOption}
                      // value={memberstatus}
                      onChange={onMemberStatus}
                      styles={selectStyle}
                    />
                    <StyledInput
                      id="invite"
                      title="초대이메일"
                      placeholder="멤버의 이메일 주소를 써주세요"
                      // value={}
                      onChange={onChangeInViteMail}
                      style={{
                        width: '220px'
                      }}
                    />

                  </div>
                  <div className='mt-3'></div>
                  <div className="form-group">
                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px' }}
                      onClick={handleOnSubmit}
                    >
                      초대장 보내기
                    </button>
                  </div>
                  <div className="form-group mt-3">
                    <StyledButton onClick={() => { props.history.push('/congratulation') }}>나중에 초대하기</StyledButton>
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
  const { postworkgroupResponse, postinviteResponse } = state.Auth;
  return { postworkgroupResponse, postinviteResponse };
};

const mapStateToDispatch = {
  postInvite: postInvite.call,
}
export default connect(mapStateToProps, mapStateToDispatch)(inVite);