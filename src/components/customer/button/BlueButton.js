import { Button } from "@material-ui/core";
import React from 'react';
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