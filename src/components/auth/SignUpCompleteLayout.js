import React from 'react';
import { Helmet } from 'react-helmet';


function SignUpCompleteLayout(props) {
  return (
    <div>
      <Helmet>
        <title>가입 완료</title>
      </Helmet>
      <div className="card">
        <div className="card-body text-center">
          <h4>가입이 완료되었습니다.</h4>
          <p className="m-2">기입된 이메일로 확인 메일이 전송되었습니다. 확인 후 로그인 가능합니다.</p>
          <button className="btn btn-primary" onClick={props.handleSubmit}>돌아가기</button>
        </div>
      </div>
    </div>
  );
}

export default SignUpCompleteLayout;