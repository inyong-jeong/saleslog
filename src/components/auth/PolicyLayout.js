import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PolicyScroll from 'components/PolicyScroll';
import PolicyCheckButton from 'components/PolicyCheckButton';
import { Link } from 'react-router-dom';

const defaultPolicy = [
{
  id: 'term_use',
  title: "이용 약관"
},
{
  id: 'privacy_for_provide',
  title: "정보 제공을 위한 개인정보 수집 및 이용 동의"
},
{
  id: 'privacy_polciy',
  title: "개인정보처리방침"
},
{
  id: 'privacy_col',
  title: "개인정보 수집 및 동의"
},
];


function PolicyLayout(props) {
  const [policy, setPolicy] = useState(defaultPolicy);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [policyCheck, setPolicyCheck] = useState({
    term_use: false,
    privacy_for_provide: false,
    privacy_polciy: false,
    privacy_col: false,
  });

  const fetchFiles = () => {
    fetch('https://s3.ap-northeast-2.amazonaws.com/saleslog.co/term_use.txt').then((resp) => resp.text()).then((body) => {
      // policy[0].content = body;
      setPolicy([...policy]);
    });
    fetch('https://s3.ap-northeast-2.amazonaws.com/saleslog.co/privacy.txt').then((resp) => resp.text()).then((body) => {
      // policy[2].content = body;
      setPolicy([...policy]);
    });
  }
  
  useEffect(fetchFiles, []);

  const setState = (e) => {
    setPolicyCheck({
      ...policyCheck,
      [e.target.id]: e.target.checked
    });
  }

  const checkAll = (e) => {
    let temp = {};
    policy.map((v) => temp[v.id] = e.target.checked);
    setIsCheckAll(!isCheckAll);
    setPolicyCheck(temp);
  }

  const isValid = () => {
    let valid = true;
    Object.keys(policyCheck).forEach((v, i) => {
      if (!policyCheck[v]) {
        valid = false;
        return;
      }
    });
    return valid;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>약관 동의</title>
      </Helmet>    
      <div className="text-center">
        <PolicyCheckButton 
          title="세일즈로그 이용약관, 정보제공을 위한 개인정보 수집 및 이용 동의, 개인정보처리방침, 개인정의 수집 및 이용에 모두 동의합니다."
          checked={isCheckAll}
          onChange={checkAll}/>
      </div>
      {policy.map((v, i) => 
        <PolicyScroll
          key={v.id}
          id={v.id}
          title={v.title}
          content={v.content}
          checked={policyCheck[v.id]}
          onChange={setState}
          required={true}
          />
      )}
      <div className="row justify-content-center mt-4">
        <div className="col-6">
          <button className="btn btn-primary btn-block" onClick={props.handleSubmit} disabled={!isValid()}>확인</button>
        </div>
        <div className="col-6">
          <button className="btn btn-white btn-border btn-block"><Link to="/signin">취소</Link></button>
        </div>
      </div>
  </React.Fragment>
  );
}

export default PolicyLayout;
