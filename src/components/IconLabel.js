import React from 'react';
import { Avatar } from 'antd';
import { useHistory } from 'react-router';

const IconLabel = (props) => {
  const history = useHistory();

  return (
    <div onClick={(e) => {
      e.preventDefault();
      if (props.pathUri !== undefined) {
        history.push(`/${props.pathUri}`)
      }
    }}
    >
      <Avatar 
        shape={(props.iconShape===undefined)?"square":props.iconShape} 
        size={(props.iconSize===undefined)?20:props.iconSize} 
        />
      <label style={{ padding:5 }}>{props.title}</label>
    </div>
  );
};

export default IconLabel;