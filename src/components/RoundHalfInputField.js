import React from 'react';

function RoundHalfInputField(props) {

  const Styles = {
    width: '170px',
    height: '48px',
    fontSize: '16px',
    border: '1px solid black'
  }


  return (
    <React.Fragment>
      {/* <label className="tk-form-label" htmlFor={props.id} value={props.value}>{props.title}</label> */}
      <input style={Styles}
        type={props.type}
        name={props.name}
        id={props.id}
        className="tk-form-control"
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={props.onChange} />
    </React.Fragment>
  );
}

export default RoundHalfInputField;