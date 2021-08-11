import React, { useState } from 'react';

function SelectField(props) {
  const col = props.col ? props.col : 4;
  const [value, setValue] = useState(props.options[0].value);

  const onChange = (e) => {
    setValue(e.target.value);
    if (props.onChange)
      props.onChange(e);
  }

  return (
    <React.Fragment> 
      {props.title && <label htmlFor={props.id} className="col-3 col-form-label tk-reg-label">{props.title}</label>}
      <div className={`col-${col}`}>
      <select id={props.id} className="form-control tk-reg-control" onChange={onChange} value={value}>
        {props.options && props.options.map((v, i) => {
          return (
            <option key={props.id + "_options_" +  i} value={v.value}>{v.label}</option>
          );
        })}
      </select>
      </div>
    </React.Fragment>
  );
}

export default SelectField;