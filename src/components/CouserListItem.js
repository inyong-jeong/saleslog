import React from 'react'

export default function CouserListItem({ list, handleonRemove }) {

  const { name, id } = list;
  return (
    <div className='CouserListItem' style={{ display: 'flex', alignItems: 'center' }}>
      <div className='text'>{name}</div>
      <div className='remove' style={{ marginLeft: '6px', cursor: 'pointer' }} onClick={() => handleonRemove(id)}>
        <img src={require('assets/icons/delete.png')} alt='delete_logo' />
      </div>
    </div>
  )
}
