import React from 'react';

function Divider(props) {
  return (
    <div className={props.className}
      style={{
        color: '#DDDDDD',
        backgroundColor: '#DDDDDD',
        height: '1px',
      }} >
    </div>
  );
}

export default Divider;