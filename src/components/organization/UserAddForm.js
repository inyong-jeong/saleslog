import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import InputField from 'components/InputField';
import SelectField from 'components/SelectField';

function UserAddForm(props) {
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [receiveEmail] = useState(false); 

  const onSaveClick = () => {

  }

  const onCancelClick = () => {

  }

  useEffect(() => {

  }, []);

  return (
    <React.Fragment>
      <div className="row">
        <InputField title="이름" value={userName} onChnage={(e) => setUserName(e.target.value)}/>
      </div>
      <div className="row">
        <InputField title="직급" value={title} onChnage={(e) => setTitle(e.target.value)}/>
      </div>
      <div className="row">
        <InputField title="전화번호" value={phoneNum} onChnage={(e) => setPhoneNum(e.target.value)} />
      </div>
      <div className="row">
        <SelectField title="매니저" options={[{label: '', value: ''}]} />
      </div>
      <div className="row">
        <InputField title="이메일 수신" value={receiveEmail} />
      </div>
      <div className="row">
        <SelectField title="권한" options={[{label: '', value: ''}]}/>
      </div>
      <div className="row mt-4">
        <div className="col-3"></div>
        <div className="col">
          <button className="btn btn-primary" onClick={onSaveClick}>저장</button>
          <button className="btn btn-white" onClick={onCancelClick}>취소</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(UserAddForm);