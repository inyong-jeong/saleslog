import React from 'react';

function RoundInputField(props) {

  const Styles = {
    width: props.width ? props.width : '343px',
    height: '48px',
    fontSize: '14px',
    border: '1px solid',
    borderColor: '#DDDDDD',
    padding: 10,
    outline: 'none'
  }


  return (
    <React.Fragment>
      {/* <label className="tk-form-label" htmlFor={props.id} value={props.value}>{props.title}</label> */}
      <input
        onKeyPress={props.onKeyPress}
        style={Styles}
        type={props.type}
        name={props.name}
        value={props.value}
        id={props.id}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={props.onChange} />
    </React.Fragment>
  );
}

export default RoundInputField;