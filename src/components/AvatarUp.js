import React, { useState, useRef, useEffect } from 'react';
import { Avatar } from 'antd';
import { CameraOutlined, PlusOutlined } from '@ant-design/icons';

// IconLabel=============
// 아이콘 형태 - iconShape ('':원모양 / 'square':사각모양)
// 아이콘 크기 - iconSize
const AvatarUp = (props) => {
  const hiddenFileInput = useRef(null);
  const [imgsrc, setImgsrc] = useState('');   // 이미지 경로  

  useEffect(() => {
    setImgsrc(props.imgsrc);
  }, [props.imgsrc]);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };


  // const handleChange = event => {
  //   const fileUploaded = event.target.files[0];
  //   console.log('fileinfo',fileUploaded);

  // };

  return (
    <div
      style={{
        display: 'flex',
        verticalAlign: 'middle',
        alignItems: 'center',
      }}
    >
      {((imgsrc === undefined || imgsrc === '' || imgsrc === null) ? true : false) &&
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            shape={props.iconShape}
            size={(props.iconSize === undefined) ? 20 : props.iconSize}
            style={props.style}
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            <PlusOutlined 
              style={{ 
                position: 'relative', 
                marginTop:5,
                top: (props.iconSize === undefined)? props.height / 2 - 30:0, 
                fontSize: '50px' ,

              }} />
          </Avatar>

        </div>
      }
      {((imgsrc === undefined || imgsrc === '' || imgsrc === null) ? false : true) &&
        <Avatar
          shape={props.iconShape}
          size={(props.iconSize === undefined) ? 20 : props.iconSize}
          style={props.style}
          src={props.imgsrc}

        />
      }
      {/* 카메라 
      height 를 prop으로 넘겨주세요!!
      */}
      {props.hideIcon ? '' : <Avatar size={26} style={{
        position: 'relative',
        left: -15,
        top: props.height / 2,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
      }}
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}>
        <CameraOutlined style={{ position: 'relative', left: 0, top: -5, fontSize: '13px' }} />
      </Avatar>}


      <div style={{ padding: 5, marginTop: 2 }}>{props.title}</div>
      <input type="file" ref={hiddenFileInput} style={{ display: 'none' }}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default AvatarUp;