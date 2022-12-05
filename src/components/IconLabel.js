import React from 'react';
import { Avatar } from 'antd';
import { useHistory } from 'react-router';

// IconLabel=============
// 텍스트 - title
// 아이콘 보이기 - isIcon (true/false)
// 아이콘 형태 - iconShape ('':원모양 / 'square':사각모양)
// 아이콘 크기 - iconSize
// 링크  - pathUri
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
      {((props.isIcon === undefined) ? true : false) &&
        <Avatar
          src={props.src}
          shape={(props.iconShape === undefined) ? "square" : props.iconShape}
          size={(props.iconSize === undefined) ? 20 : props.iconSize}
        />
      }
      <div style={{ padding: 5, marginTop: 2 }}>{props.title}</div>
    </div>
  );
};

export default IconLabel;