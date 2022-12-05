import React from 'react';

function InputField(props) {
  const col = props.col ? props.col : 4;
  const valid = props.valid;

  return (
    <React.Fragment>
        {props.title && <label htmlFor={props.id} className="col-3 col-form-label tk-reg-label">{props.title}</label>}
        <div className={`col-${col}`}>
            <input 
              type={props.type ? props.type : "text"} 
              className={"form-control tk-reg-control " + (valid ? "" : "tk-form-invalid")} 
              id={props.id}
              disabled={props.disabled}
              placeholder={props.placeholder}
              maxLength={props.maxLength}
              onChange={props.onChange}
              onBlur={props.onBlur}
              value={props.value} />
            <small className="d-block mt-1">{props.note}</small>
        </div>
    </React.Fragment>
  );
}

export default InputField;