import React, { Component } from 'react';
import Select from 'react-select';

const selectStyle = {
  container: () => ({
    minHeight: '38px',
  }),
  control: () => ({
    minHeight: '38px'                                
  }),
  indicatorsContainer: () => ({
    display: 'none',
    minHeight: '38px'                                
  }),
  input: () => ({
    minHeight: '38px'                                                                
  }),
  menu: () => ({
    width: '100%',
    overflowY: 'scroll',
    maxHeight: '400px'
  }),
  menuList: () => ({
    width: '100%'
  }),
  menuPortal: () => ({
    width: '100%',
    overflow: 'scroll'
  })
}

export default function Select2(props) {
  return (
    <Select
      styles={selectStyle}
      options={props.options}
      placeholder={props.placeholder}
      onChange={props.onChange}
      noOptionsMessage={() => "선택 항목이 없습니다"}
      value={props.value}
      menuContainerStyle={{'zIndex': 999}}
    /> 
  );
}