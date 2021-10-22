import React, { useState, useRef, useEffect } from 'react'
import { Input } from "antd";
import { SET_KEYWORD } from 'constants/actionTypes';
import { useDispatch } from 'react-redux';
const { Search } = Input;



function SearchBar({ searchStr, onAddKeyword, SearchChange, SearchEnter, BlankEnter, clearKeyword, word, Focus, focused }) {

  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('')

  // const array = ['삼성', '기아', '현대', '애플'];
  // console.log(keyword);
  // array.map((option) => option.children.toLowerCase().indexOf(keyword.toLowerCase()))
  // console.log(keyword && array.mapchildren.toLowerCase().indexOf(keyword.toLowerCase()));

  useEffect(() => {
    dispatch({
      type: SET_KEYWORD,
      payload: keyword && keyword.toLowerCase()
    })
  }, [keyword]);

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