import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Input } from "antd";
const { Search } = Input;

const horizontalCenter = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const Container = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 1px solid black;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
`

const SearchIcon = styled.span`
  ${horizontalCenter}
  right: 24px;
  width: 24px;
  height: 24px;
  background-position: -356px -260px;
  display: inline-block;
  overflow: hidden;
  color: transparent;
  vertical-align: middle;
  background-image: url(https://s.pstatic.net/static/www/m/uit/2020/sp_search.623c21.png);
  background-size: 467px 442px;
  background-repeat: no-repeat;
`

//글자를 입력하면 RemoveIcon이 나오게 되고 누르면 input의 value값이 사라집니다
const RemoveIcon = styled.span`
  ${horizontalCenter}
  right: 0px;
  width: 20px;
  height: 20px;
  background-position: -389px -29px;
  display: inline-block;
  overflow: hidden;
  color: transparent;
  vertical-align: top;
  background-image: url(https://s.pstatic.net/static/www/m/uit/2020/sp_search.623c21.png);
  background-size: 467px 442px;
  background-repeat: no-repeat;
`

const InputContainer = styled.div`
  position: relative;
`

// const Input = styled.input`
//   width: 100%;
//   background-color: #fff;
//   font-weight: 700;
//   font-size: 20px;
//   box-sizing: border-box;

// `

function SearchBar({ onAddKeyword, SearchChange, SearchEnter }) {

  const [keyword, setKeyword] = useState('')

  const handleKeyword = (e) => {
    setKeyword(e.target.value)
    SearchChange(e.target.value)
  }

  console.log(keyword)

  const handleEnter = (e) => {
    console.log(e)
    if (keyword) {
      onAddKeyword(keyword)
      setKeyword('')
      SearchEnter(false)
    }
  }

  const handleClearKeyword = () => {
    setKeyword('')
  }
  const hasKeyword = !!keyword

  const ref = useRef();
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
          placeholder="검색어(고객사명, 고객사 담당자명, 장소명, 일지내용)"
          allowClear
          value={keyword}
          onChange={handleKeyword}
          // enterButton={handleEnter}
          onSearch={handleEnter}
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