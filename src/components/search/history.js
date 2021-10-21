import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { convertTimeToFormat } from 'helpers/timeUtils'
import { ReactComponent as SearchIcon } from 'assets/icons/log/search.svg'
import { useSelector } from 'react-redux'

const HistoryContainer = styled.div`

  padding: 16px;
  height: 150px;
  width:100%;
  overflow: auto;
  border-right: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  botder-top: none;
  z-index : 1;
  position: absolute;
  background-color: white;

`
const HeaderContainer = styled.div`
  overflow: hidden;
`
const Title = styled.span`
  float: left;
  font-weight: 400;
  color: #666;
`
const RemoveText = styled.span`
  float: right;
  color: black;
`

const ListContainer = styled.ul`
  margin: 10px 0;
  
`

const KeywordContainer = styled.li`

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const RemoveButton = styled.span`
  float: right;
  color: #818181;
  font-size: 10px;
  margin-top : 1px;
  padding: 3px 5px;
`

const Date = styled.span`
  float: right;
  color: #818181;
  padding: 3px 5px;
`

const Keyword = styled.span`
  font-size: 12px;
`


function History({ keywords, onRemoveKeyword, onClearKeywords, historyKeyword }) {

  const [filterList, setFilterList] = useState([]);
  const state = useSelector(state => state.SalesLog);
  let KeyWord = state.keyword;

  const setHistorySearch = (v) => {
    historyKeyword(v)
  }

  useEffect(() => {
    setFilterList(getKeyword(keywords, KeyWord))
  }, [KeyWord])

  // keywords 단어  반환
  function getKeyword(keywords, keyword) {
    let result = []
    let resultArray = keywords.map((v) => v.text);
    for (let i = 0; i < resultArray.length; i++) {
      if (resultArray[i].indexOf(keyword) >= 0) {
        result = result.concat(resultArray[i]);
      }
    }
    result = new Set(result); //중복되는 배열 요소 제거
    return [...result];
  }

  // getKeword에서 리턴된 배열요소와 일치하는 label의 요소 반환
  function sortSameLabel(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < keywords.length; j++) {
        if (keywords[j].text.toLowerCase() === array[i].toLowerCase()) {
          result = result.concat(keywords[j]);
        }
      }
    }
    return result;
  }

  // console.log(filterList)
  // console.log(sortSameLabel(filterList))

  if (keywords.length === 0) {
    return <HistoryContainer>최근 검색된 기록이 없습니다.</HistoryContainer>
  }
  return (
    <HistoryContainer>
      <HeaderContainer>
        <Title>최근 검색어</Title>
        <RemoveText onClick={onClearKeywords} style={{ cursor: 'pointer' }}>전체삭제</RemoveText>
      </HeaderContainer>
      <ListContainer>
        {filterList.length > 0 ?
          sortSameLabel(filterList).map(({ id, text }) => {
            return (
              <KeywordContainer key={id} className='search_history'>
                {/* <span className='search_history'> */}
                <SearchIcon /><span>&nbsp;</span>
                <Keyword onClick={() => setHistorySearch(text)}>{text}</Keyword>
                {/* </span> */}
                <RemoveButton
                  onClick={() => {
                    onRemoveKeyword(id)
                  }}
                >
                  삭제
                </RemoveButton>
                <Date>{convertTimeToFormat(id)}</Date>

              </KeywordContainer>
            )
          })
          :
          keywords.map(({ id, text }) => {
            return (
              <KeywordContainer key={id} className='search_history'>
                {/* <span className='search_history'> */}
                <SearchIcon /><span>&nbsp;</span>
                <Keyword onClick={() => setHistorySearch(text)}>{text}</Keyword>
                {/* </span> */}
                <RemoveButton
                  onClick={() => {
                    onRemoveKeyword(id)
                  }}
                >
                  삭제
                </RemoveButton>
                <Date>{convertTimeToFormat(id)}</Date>
              </KeywordContainer>
            )
          })
        }
      </ListContainer>
    </HistoryContainer>
  )
}

export default History