import React from 'react';

function PolicyCheckButton(props) {
  return (
    <div className="checkbox-large">
      <input id={props.id} type="checkbox" checked={props.checked} onChange={props.onChange}/>
      {props.checked && <img className="check-icon" src="/images/check.svg" width="30" heigth="30" alt="check button" />}
      <label className="policy-check-label">
      {props.title ? props.title : '위 이용 약관에 동의합니다.'}
      </label>
      {props.required && <label className="text-primary" style={{paddingLeft: '12px', fontWeight: '400'}}>
      (필수)
      </label>}
    </div>
  );
}

export default PolicyCheckButton;