import React from 'react';

function ConditionsList(props) {
  return (
    <React.Fragment>
      {props.conditions[0] && props.conditions.map((v, i) => 
        v.type === "account" ?
        <button 
          key={v.account_id + '' + i}
          onClick={() => props.onConditionClick(v, i)}
          className="btn btn-primary bg-white border-white text-primary waves-effect ml-1 mr-1 mb-1 d-inline-block">
          {v.label}
        </button> :
        <button 
          key={v.user_id + '' + i}
          onClick={() => props.onConditionClick(v, i)}
          className="btn btn-primary bg-white border-white text-primary waves-effect ml-1 mr-1 mb-1 d-inline-block">
          {v.label}
        </button>
      )}
      {props.conditions.length === 0 && <p>선택된 조건이 없습니다</p>}
    </React.Fragment>
  );
}

export default ConditionsList;