import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Upload, message } from 'antd';
import { CameraOutlined, PlusOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


const useStyles = makeStyles({
  circle: {
    left:-20, 
    top:35, 
    backgroundColor:'rgba(52, 52, 52, 0.5)', 
    alignItems:'center', 
    justifyContent:'center'
  },
  square: {
    left:-15, 
    top:43, 
    backgroundColor:'rgba(52, 52, 52, 0.5)', 
    alignItems:'center', 
    justifyContent:'center'
  },


})

// IconLabel=============
// 아이콘 형태 - iconShape ('':원모양 / 'square':사각모양)
// 아이콘 크기 - iconSize
const AvatarUp = (props) => {
  const classes = useStyles();
  const hiddenFileInput = useRef(null);
  const [imgsrc, setImgsrc] = useState('');   // 이미지 경로  
  const [loading, setLoading] = useState(false);

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
      { ((imgsrc===undefined || imgsrc==='')?true:false) && 
      <Avatar 
        shape={props.iconShape} 
        size={(props.iconSize===undefined)?20:props.iconSize} 
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <PlusOutlined style={{ fontSize: '50px'  }}  /> 
      </Avatar>
      }
      { ((imgsrc===undefined || imgsrc==='')?false:true) && 
      <Avatar 
        shape={props.iconShape} 
        size={(props.iconSize===undefined)?20:props.iconSize} 
        
      />
      }
      <Avatar size={26} className={ (props.iconShape==='square')?classes.square:classes.circle } 
      
      onClick={(e) => {
        e.preventDefault();
        
      }}
      
      >      
      <CameraOutlined style={{ position:'relative', left:0, top:-5, fontSize: '13px'  }}  />
      </Avatar>
      
      <div style={{ padding:5 , marginTop:2}}>{props.title}</div>
      <input type="file" name="fileup" ref={hiddenFileInput} style={{display:'none'}} 
      onChange={props.handleChange}
      />
    </div>
  );
};

export default AvatarUp;