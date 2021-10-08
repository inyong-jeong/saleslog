import { Avatar } from 'antd';
import React from 'react'
import cmm from 'constants/common';

export default function CouserListItem({ list, handleonRemove }) {

  const { name, id, thumb_url } = list;
  const result = name.split(' ')
  return (
    <div className='CouserListItem' style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar size='small' src={cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + thumb_url} /><span>&nbsp;</span>
      <div className='text'>{result[0]}<span>&#183;</span>{result[1]}</div>
      <div className='remove' style={{ marginLeft: '6px', cursor: 'pointer' }} onClick={() => handleonRemove(id)}>
        <img src={require('assets/icons/delete.png')} alt='delete_logo' />
      </div>
    </div>
  )
}
