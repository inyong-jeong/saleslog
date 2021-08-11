import React, { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { loginAction } from '../reducers/user';
import StyledInput from '../components/styledcomponent/Input';
import StyledButton from '../components/styledcomponent/Button';
import Standard from './standard';
import StyledCheckbox from '../components/styledcomponent/Checkbox';
// import Image from 'next/image';
// import Logo from '../public/asset/img/logo.jpg';

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(() => {
    dispatch(loginAction({
      id,
      password,
    }));
  }, [id, password]);

  return (
    <div>
      <Form onFinish={onSubmitForm} style={{ padding: '20px', alignItems: "center", justifyContent: "center", flexDirection: 'column', display: "flex" }}>
        <div>
          {/* <Image src={Logo} alt="logo of the saleslog"></Image> */}
        </div>
        <div>
          {/* <label htmlFor="user-id">아이디</label> */}
          <br />
          <StyledInput name="user-id" placeholder="이메일 주소 입력" value={id} onChange={onChangeId} required />
        </div>
        <div>
          {/* <label htmlFor="user-password">비밀번호</label> */}
          <br />
          <StyledInput name="user-password" style={{ marginBottom: '5px' }} placeholder="비밀번호 입력(영문,숫자포함 8자리)" value={password} onChange={onChangePassword} type="password" required />
        </div>
        <div >
          <StyledCheckbox >로그인 상태 유지</StyledCheckbox>
        </div>
        <div>
          <StyledButton type="primary" style={{ color: Standard.colors.blue, background: Standard.colors.white, marginBottom: '14px', marginTop: '5px' }} htmlType="submit" loading={false}>로그인</StyledButton>
        </div>
        <div>
          <Link href="/signup">
            <a>
              <StyledButton type="primary" style={{ color: Standard.colors.white, background: Standard.colors.blue }} htmlType="submit" loading={false}>회원가입</StyledButton>
            </a>
          </Link>
        </div>
        <div style={{ marginTop: '10px' }}>
          <StyledButton style={{ width: '100px', height: '21px', borderColor: 'white', backgroundColor: Standard.colors.white, color: Standard.colors.black }}>아이디 찾기</StyledButton>
          <StyledButton style={{ width: '100px', height: '21px', borderColor: 'white', backgroundColor: Standard.colors.white, color: Standard.colors.black }}>비밀번호 찾기</StyledButton>
        </div>
      </Form >
    </div>
  );
};

export default LoginForm;