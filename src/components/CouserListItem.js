import React from 'react'

export default function CouserListItem({ list, handleonRemove }) {

  const { name, id } = list;
  const result = name.split('/')
  console.log(result)
  return (
    <div className='CouserListItem' style={{ display: 'flex', alignItems: 'center' }}>
      <div className='text'>{result[0]}<span>&#183;</span>{result[1]}</div>
      <div className='remove' style={{ marginLeft: '6px', cursor: 'pointer' }} onClick={() => handleonRemove(id)}>
        <img src={require('assets/icons/delete.png')} alt='delete_logo' />
      </div>
    </div>
  )
}
