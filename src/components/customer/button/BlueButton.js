import { Button } from "@material-ui/core";
import React from 'react';
const BlueButton = ({ name, type }) => {
  return (
    <Button
      type={type}
      style={{
        width: '100%',
        fontSize: 14,
        backgroundColor: '#333333',
        color: '#fff',
        borderRadius: "2px",
        margin: 10,
        boxSizing: 'border-box'
      }}>{name}</Button>
  );
}

export default BlueButton;