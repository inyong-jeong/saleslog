import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { findPassword } from 'redux/actions';
import { regex } from 'constants/regex';
import StyledInput from 'components/styledcomponent/Input';
import StyledButton from 'components/styledcomponent/Button';
import { Form, Modal } from 'antd';


function FindId(props) {

  //state change logic

  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  const updateWindowDimensions = () => {
    setViewHeight(window.innerHeight);
  }

  const handleValidSubmit = (e) => {
    e.preventDefault();
    if (new RegExp(regex.email).exec(email)) {
      props.findPassword(email);
    } else {
      setError("이메일 형식이 잘못되었습니다");
    }
  }

  const showModal = () => {
    setIsModalVisible(true);
    console.log(1)
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (props.findPasswordResponse) {
      props.history.push('/changepwsucceed');
    }
  }, [props.findPasswordResponse]);

  //styles
  const ButtonStyle = {
    width: '104px',
    marginLeft: '7px'
  }

  const CheckButtonStyle = {
    width: '104px',
    marginLeft: '7px',
    backgroundColor: '#D0CFDD',
    border: 'none'
  }

  const FormStyle = {
    backgroundColor: 'white',
    padding: '30px'
  }

  const InputStyle = {
    width: "232px",
    fontSize: '16px'
  }


  return (
    <div className="container-fulid">
      <div className="row" style={{ height: viewHeight }}>
        <div className="col-lg-4 col-md-3 col-sm-2"></div>
        <div className="d-flex col-lg-4 col-md-6 col-sm-8 align-self-center justify-content-center">
          <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          <Form style={FormStyle}>
            <div className="form-group mr-1 ml-1">
              <StyledInput
                style={InputStyle}
                id="email"
                title="이메일"
                placeholder="휴대전화 번호 입력"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <StyledButton style={ButtonStyle}>인증번호 전송</StyledButton>
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
            <div className="form-group mr-1 ml-1 mb-5">
              <StyledInput
                style={InputStyle}
                id="email"
                title="이메일"
                placeholder="인증번호 입력"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <StyledButton style={CheckButtonStyle}>확인</StyledButton>
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
            <div className="form-group mr-1 ml-1 mt-3 mb-2">
              <StyledButton onClick={showModal}>아이디 찾기</StyledButton>
            </div>
            <div className="ml-1">
              <Link to="/signin" className="btn btn-sm btn-link text-muted pl-0">
                로그인
              </Link>
              <Link to="/signup" className="btn btn-sm btn-link text-muted pl-0">
                회원가입
              </Link>
            </div>

          </Form>

        </div>
        <div className="col-lg-4 col-md-3 col-sm-2"></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps, { findPassword: findPassword.call })(FindId);