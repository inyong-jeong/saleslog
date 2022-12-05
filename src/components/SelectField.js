import React, { useState } from 'react';
import Select from 'react-select';

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
        <Select value={value} onChange={onChange} options={props.options} className="tk-reg-control tk-reg-select" />
      </div>
    </React.Fragment>
  );
}

export default SelectField;