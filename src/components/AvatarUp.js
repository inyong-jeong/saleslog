import React, { useState, useRef, useEffect } from 'react';
import { Avatar } from 'antd';
import { CameraOutlined, PlusOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';

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
  
  const [imgsrc, setImgsrc] = useState('');   // 이미지 경로  

  useEffect(() => {
    setImgsrc(props.imgsrc);
  }, [props.imgsrc]);

  
  return (
    <div onClick={(e) => {
      e.preventDefault();
    }}
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
      <Avatar size={26} className={ (props.iconShape==='square')?classes.square:classes.circle }   >      
      <CameraOutlined style={{ position:'relative', left:0, top:-5, fontSize: '13px'  }}  />
      </Avatar>
      
      <div style={{ padding:5 , marginTop:2}}>{props.title}</div>
    </div>
  );
};

export default AvatarUp;