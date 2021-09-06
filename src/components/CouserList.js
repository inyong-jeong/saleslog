import React from 'react'
import CouserListItem from 'components/CouserListItem'

export default function CouserList({ lists, handleonRemove }) {
  return (
    <div className='UserList'>
      {lists.map(list => (
        <CouserListItem list={list} key={list.id} handleonRemove={handleonRemove} />
      ))}

    </div>
  )
}
