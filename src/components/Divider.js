import React from 'react';

function Divider(props) {
  return (
    <div className={props.className}
        style={{
            color: '#000',
            backgroundColor: '#000',
            height: 1
        }} >
    </div>
  );
}

export default Divider;