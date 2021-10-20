import React, { useState, useRef, useEffect } from 'react'
import { Input } from "antd";
const { Search } = Input;



function SearchBar({ searchStr, onAddKeyword, SearchChange, SearchEnter, BlankEnter, clearKeyword, word, Focus, focused }) {

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    setKeyword(word)
  }, [])

  const handleKeyword = (e) => {
    console.log(e)
    setKeyword(e.target.value)
    SearchChange(e.target.value)
  }

  const handleEnter = (e) => {
    console.log('handelEnter:::::::::::::::::::', e)
    if (keyword || keyword === '') {
      console.log(keyword)
      onAddKeyword(keyword)
      // setKeyword('')
      SearchEnter(false)
      BlankEnter(keyword)
    }
  }

  //최신검색어 선택시 
  const searchEnter = (v) => {
    console.log('searchEnter:::::::::::::::::::', v)
    if (v || v === '') {
      onAddKeyword(v)
      // setKeyword('')
      SearchEnter(false)
      BlankEnter(v)
    }
  }


  // 검색어가 바뀔때
  useEffect(() => {
    console.log('searchStr:::', searchStr)
    if (searchStr && searchStr !== '') {
      setKeyword(searchStr);
      searchEnter(searchStr);
      clearKeyword();
    }
  }, [searchStr])

  // useEffect(() => {
  //   const searchbar = document.getElementById('searchbar');
  //   searchbar.addEventListener('click', (e) => {
  //     Focus(!focused)
  //   })


  // }, [])

  // const handleClearKeyword = () => {
  //   setKeyword('')
  // }
  // const hasKeyword = !!keyword
  // const ref = useRef();
  const handleOnClick = (e) => {
    console.log(e.type)
    if (e.type === 'click') {
      Focus(!focused)
    }
  }
  return (
    <>
      <div>

        <Search
          id='searchbar'
          // allowClear
          onClick={handleOnClick}
          placeholder="검색어(고객, 고객담당자, 제목, 내용)"
          value={keyword}
          onChange={handleKeyword}
          onSearch={handleEnter}
          style={{
            width: '100%',
            marginTop: 10,
          }} />
      </div>
    </>
  )
}

export default SearchBar