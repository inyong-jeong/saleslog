import { Button } from "@material-ui/core";
import React from 'react';

//테마로 적용될 기본 파란색 버튼
// 버튼 이름 prop으로 넘겨주고, type 있는경우 넘김 
const BlueButton = ({ name, type }) => {
  return (
    <Button
      type={type}
      style={{
        marginBottom: 14,
        width: '80%',
        fontSize: 16,
        backgroundColor: '#0000FF',
        color: '#fff',
        fontWeight: 'bold'
      }}>{name}</Button>
  );
}

export default BlueButton;