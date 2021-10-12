import React from 'react'
import UcouserListItem from 'components/UcouserListItem'

export default function UcouserList({ lists, handleonRemove }) {
  return (
    <div className='UserList'>
      {lists && lists.map(list => (
        <UcouserListItem list={list} key={list.id} handleonRemove={handleonRemove} />
      ))}

    </div>
  )
}
