import React from 'react'
import CouserListItem from 'components/CouserListItem'

export default function CouserList({ lists, handleonRemove }) {
  return (
    <div className='UserList'>
      {lists && lists.map(list => (
        <CouserListItem list={list} key={list.login_idx} handleonRemove={handleonRemove} />
      ))}

    </div>
  )
}
