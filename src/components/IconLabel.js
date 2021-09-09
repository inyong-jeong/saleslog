import React from 'react';
import { Avatar } from 'antd';
import { useHistory } from 'react-router';
import { red } from '@material-ui/core/colors';

const IconLabel = (props) => {
  const history = useHistory();

  return (
    <div onClick={(e) => {
      e.preventDefault();
      if (props.pathUri !== undefined) {
        history.push(`/${props.pathUri}`)
      }
    }}
    style={{ 
      display: 'flex',
      verticalAlign: 'middle',
      alignItems: 'center',
    }}
    >
      { ((props.isIcon===undefined)?true:false) && 
      <Avatar 
        shape={(props.iconShape===undefined)?"square":props.iconShape} 
        size={(props.iconSize===undefined)?20:props.iconSize} 
        />
      }
      <div style={{ padding:5 , marginTop:2}}>{props.title}</div>
    </div>
  );
};

export default IconLabel;