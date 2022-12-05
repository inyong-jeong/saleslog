import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Helmet } from "react-helmet";
import { getCi } from "helpers/domainUtils";
import useInput from 'hooks/useInput';
import { postInvite } from 'redux/actions';
import { ReactComponent as WhiteLogo } from '../../assets/icons/main/whiteLogo.svg'
import { ReactComponent as BdayLogo } from '../../assets/icons/main/bday.svg'
import Select from 'react-select';
import StyledInput from 'components/styledcomponent/Input';
import StyledButton from 'components/styledcomponent/Button';
import cmm from "../../constants/common";
import { errorMessage, successMessage } from "constants/commonFunc";

const inVite = (props) => {
  const state = useSelector(state => state.Auth)
  const history = useHistory()
  const dispatch = useDispatch()
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  // 초대메일 인풋 상태 데이터
  const [invitemail, setInvitemail] = useState('')
  const [loginIdx, setLoginIdx] = useState()

  // 초대메일 인풋 상태 데이터
  const [memberstatus, setMemberStatus] = useState(9);
  const [compdomainerror, setCompDomainError] = useState();

  //조건 오류 상태 데이터
  const [inputerror, setInputerror] = useState();

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    if (state.postworkgroupResponse) {
      setLoginIdx(state.postworkgroupResponse.message);
    }

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);


  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  };

  const onChangeInViteMail = (e) => {
    setInvitemail(e.target.value);
  }

  //맴버 초대하기 클릭
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (cmm.isEmpty(memberstatus)) {
      setInputerror('멤버 권한을 선택하세요.')
      return;
    } else {
      setInputerror('')
    }

    if (cmm.isEmpty(invitemail)) {
      setInputerror('초대할 메일을 입력하세요.')
      return;
    } else {
      setInputerror('')
    }

    dispatch(postInvite.call(10000062, invitemail, memberstatus))
    //props.postInvite(loginIdx, invitemail, memberstatus)

  }

  // 맴버초대 fetch 후
  useEffect(() => {
    console.log('fetch 후:::', state.postinviteResponse)
    if (state.postinviteResponse) {
      if (state.postinviteResponse.message.state == 'OK') {
        successMessage('초대메일이 발송 되었습니다.')
        setInvitemail('')
        state.postinviteResponse = '';
        //props.history.push('/congratulation')
      } else {
        errorMessage('메일이 발송 되지 않았습니다. 메일주소를 확인 해 주세요.')
      }
    }
  }, [state.postinviteResponse])

  // 맴버 권한 선택 
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
    display: 'flex',

  }

  const memberStatusOption = [{ label: 'Master', value: 0 }, { label: 'Chief', value: 1 }, { label: 'Manager', value: 2 }, { label: 'Staff', value: 9 }];
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
          <div style={{ margin: 'auto' }}>
            <div style={{ width: 390, backgroundColor: '#fff' }}>
              <div className="card-body" style={CardStyle}>
                <WhiteLogo width={150} height={50} fill='black' />
                <form>
                  <div className='mb-3'>
                    <h4 style={{ textAlign: 'center', fontSize: 15, marginTop: 10, color: '#111' }}>
                      <BdayLogo /> &nbsp;
                      동료들과 함께 성과를 달성하세요!
                    </h4>
                  </div>
                  <div className="form-group" style={{ display: 'flex' }}>
                    <Select
                      placeholder="멤버 구분"
                      options={memberStatusOption}
                      //value={memberstatus}
                      onChange={onMemberStatus}
                      styles={selectStyle}
                    />
                    <StyledInput
                      id="invite"
                      title="초대 이메일"
                      placeholder="멤버의 이메일 주소를 입력하세요"
                      value={invitemail}
                      onChange={onChangeInViteMail}
                      style={{
                        width: '220px'
                      }}
                    />
                  </div>
                  {inputerror && <p className="text-danger mt-2">{inputerror}</p>}
                  <div className='mt-3'></div>
                  <div className="form-group">

                    <button
                      className="btn btn-outline-primary"
                      style={{ width: '343px', height: '48px', backgroundColor: '#fff', border: '1px solid #111', color: '#111' }}
                      onClick={handleOnSubmit}>
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
        </div>
      </div>
    </React.Fragment>
  );
}

export default inVite;

// const mapStateToProps = (state) => {
//   const { postworkgroupResponse, postinviteResponse } = state.Auth;
//   return { postworkgroupResponse, postinviteResponse };
// };

// const mapStateToDispatch = {
//   postInvite: postInvite.call,
// }
// export default connect(mapStateToProps, mapStateToDispatch)(inVite);