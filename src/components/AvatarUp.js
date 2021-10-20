import React, { useState, useRef, useEffect } from 'react';
import { Avatar } from 'antd';
import { CameraOutlined, PlusOutlined } from '@ant-design/icons';

const AvatarUp = (props) => {
  const hiddenFileInput = useRef(null);
  const [imgsrc, setImgsrc] = useState('');

  useEffect(() => {
    setImgsrc(props.imgsrc);
  }, [props.imgsrc]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      {
        (imgsrc === undefined || imgsrc === '' || imgsrc === null) ?
          <Avatar
            shape={props.iconShape}
            size={(props.iconSize === undefined) ? 20 : props.iconSize}
            style={props.style}
            onClick={handleClick} >
            <div style={{ ...props.style, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <PlusOutlined style={{ fontSize: 25 }} />
            </div>
          </Avatar>
          :
          <Avatar
            shape={props.iconShape}
            size={(props.iconSize === undefined) ? 20 : props.iconSize}
            style={props.style}
            src={props.imgsrc}
          />
      }


      {// height prop으로 넘겨줄 것 
        props.hideIcon ? null :
          <Avatar
            size={26}
            style={{
              position: 'relative',
              left: -15,
              top: props.height / 2,
              backgroundColor: 'rgba(52, 52, 52, 0.5)',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={handleClick}>
            <CameraOutlined style={{ position: 'relative', left: 0, top: -5, fontSize: '13px' }} />
          </Avatar>}
      <input
        type="file"
        ref={hiddenFileInput}
        style={{ display: 'none' }}
        onChange={props.handleChange}
        accept='.png, .gif, .jpg'
      />
    </div>
  );
};

export default AvatarUp;