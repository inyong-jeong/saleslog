import React, { useState, useEffect } from "react";
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
import { removeAll } from 'helpers/authUtils';
import SignUpModal from "../../components/SignUpModal";

const SignUpInvite = () => {

  const params = useParams()
  const state = useSelector(state => state.Auth)
  const history = useHistory()
  const dispatch = useDispatch()
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  const [userEmail, setUserEmail] = useState('')
  const [password, onChangePassword] = useInput('')
  const [passwordcheck, onChangePasswordCheck] = useInput('')
  const [user_name, onChangeUser_name] = useInput('')
  const [isTermChecked, setIsTermChecked] = useState(false)
  const [termDesc, setTermDesc] = useState('')

  const [passworderror, setPassWordError] = useState()
  const [usernameerror, setUsernameerror] = useState()

  useEffect(() => {
    removeAll();
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
    console.log('state.postCheckisRegisteredResponse ', state.postCheckisRegisteredResponse)
    if (state.postCheckisRegisteredResponse) {
      state.postCheckisRegisteredResponse = undefined;
      removeAll();
      return history.push('/signin');
    }
    return setUserEmail(decodeURIComponent(params.inviteEmail))
  }, [state.postCheckisRegisteredResponse])

  useEffect(() => {
    if (state.postInviteRegisteredResponse) {
      state.postInviteRegisteredResponse = null;
      return history.push('/congratulation');
    }

  }, [state.postInviteRegisteredResponse])

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  }

  const handleLandingPage = () => {
    history.push('/');
  }

  const handleChangeTerm = () => {
    setIsTermChecked(prev => !prev)
  }

  const handleOnSubmit = () => {

    if (user_name === '') {
      return setUsernameerror('????????? ????????? ?????????.')

    } else {
      setUsernameerror('')
    }

    if (password !== passwordcheck) {
      return setPassWordError('??????????????? ???????????? ????????????.')

    } else {
      setPassWordError('')
    }

    if (!(new RegExp(regex.password).exec(password))) {
      return setPassWordError('???????????? ????????? ????????????????????? (???????????? ?????? 8?????? ??????)')
    } else {
      setPassWordError('')
    }

    if (!isTermChecked) return setTermDesc('????????? ???????????? ?????????.')
    setTermDesc('')
    console.log('invite::',userEmail, params.inviteCode, user_name, params.useName)
    dispatch(postInviteRegistration.call(userEmail, params.inviteCode, user_name, password, params.useName))
    return
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
        <title>????????????</title>
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
                  <div className="form-group">
                    <RoundInputField
                      disabled
                      id="user_email"
                      title="?????????"
                      value={userEmail}
                      onChange={setUserEmail}
                    />
                  </div>
                  <div className="form-group">
                    <RoundInputField
                      id="name"
                      title="??????"
                      placeholder="?????? ??????"
                      value={user_name}
                      onChange={onChangeUser_name}
                    />
                    {usernameerror && <p className="text-danger mt-2">{usernameerror}</p>}
                  </div>
                  <div className="form-group">
                    <RoundInputField
                      id="password"
                      title="????????????"
                      placeholder="???????????? ?????? (???????????? ?????? 8?????? ??????)"
                      value={password}
                      type="password"
                      onChange={onChangePassword}
                    />
                  </div>
                  <div className="form-group">
                    <RoundInputField
                      id="passwordcheck"
                      title="????????????"
                      placeholder="???????????? ??????"
                      type='password'
                      value={passwordcheck}
                      onChange={onChangePasswordCheck}
                    />
                    {passworderror && <p className="text-danger mt-2">{passworderror}</p>}
                  </div>
                  <div className="form-group mt-3">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <StyledCheckbox
                        onChange={handleChangeTerm}
                        style={CheckBoxStyle}>
                        <span> </span>
                        ?????? ????????? ???????????? <span style={{ color: '#000000', textDecoration: 'underline' }}>??????????????? ????????? ?????? ??????,< br /> ???????????? ????????? ??????, ???????????? ????????????</span>??? ????????????< br /> ?????????.
                      </StyledCheckbox>
                    </div>
                    <SignUpModal />
                    {!isTermChecked ? <p className='text-danger mt-2 text-center'> ????????? ???????????? ?????????.</p> : null}

                  </div>
                  <div className="form-group">
                    <StyledButton
                      onClick={handleOnSubmit}>
                      ??????
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

export default SignUpInvite;

