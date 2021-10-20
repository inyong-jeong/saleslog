import React from 'react'
import styled from 'styled-components'
import { convertTimeToFormat } from 'helpers/timeUtils'
import { ReactComponent as SearchIcon } from 'assets/icons/log/search.svg'


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
  if (keywords.length === 0) {
    return <HistoryContainer>최근 검색된 기록이 없습니다.</HistoryContainer>
  }

  const setHistorySearch = (v) => {
    historyKeyword(v)
  }

  return (
    <HistoryContainer>
      <HeaderContainer>
        <Title>최근 검색어</Title>
        <RemoveText onClick={onClearKeywords} style={{ cursor: 'pointer' }}>전체삭제</RemoveText>
      </HeaderContainer>
      <ListContainer>
        {keywords.map(({ id, text }) => {
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
        })}
      </ListContainer>
    </HistoryContainer>
  )
}

export default History