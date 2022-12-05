import React from 'react';

function InputField(props) {
  const col = props.col ? props.col : 4;
  const onChange = (e) => {
    props.onChange(props.id, e.target.id);
  }

  return (
    <React.Fragment>
      {props.title && <label htmlFor={props.id} className="col-3 col-form-label tk-reg-label">{props.title}</label>}        
      <div className={`col-${col}`}>
        {props.selection.map((v, i) => 
        <div key={i} className="radio radio-primary radio-info form-check-inline">
          <input type="radio" id={v.id} value={v.value} name="radioInline" checked={v.checked} onChange={onChange}/>
          <label htmlFor={v.id}>{v.label}</label>
        </div>)}
      </div>
    </React.Fragment>
  );
}

export default InputField;