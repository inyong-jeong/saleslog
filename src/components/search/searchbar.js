import React, { useState, useRef, useEffect } from 'react'
import { Input } from "antd";
const { Search } = Input;



function SearchBar({ searchStr, onAddKeyword, SearchChange, SearchEnter, BlankEnter, clearKeyword, word }) {

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    setKeyword(word)
  }, [])

  console.log(keyword);
  const handleKeyword = (e) => {

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


  // const handleClearKeyword = () => {
  //   setKeyword('')
  // }
  // const hasKeyword = !!keyword

  // const ref = useRef();
  const handleOnClick = (e) => {
    console.log(e.type)
  }
  return (
    <>
      <div>
        {/* <Input
          placeholder="검색어를 입력해주세요"
          type='text'
          active={hasKeyword}
          value={keyword}
          onChange={handleKeyword}
          onKeyDown={handleEnter}
        /> */}
        <Search
          // ref={ref}
          onClick={handleOnClick}
          placeholder="검색어(고객명, 고객 담당자명, 장소명, 일지내용)"
          value={keyword}
          onChange={handleKeyword}
          // enterButton={handleEnter}
          onSearch={handleEnter}
          // searchKeyWord={keyword}
          // setsearchKeyWord={setKeyword}
          style={{
            width: '100%',
            marginBottom: 10,
            marginTop: 10,
          }} />
        {/* {keyword && <RemoveIcon onClick={handleClearKeyword} />} */}
      </div>
      {/* <SearchIcon onClick={handleEnter} style={{ cursor: 'pointer' }} /> */}
    </>
  )
}

export default SearchBar