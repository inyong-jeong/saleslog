import React from 'react'
import styled from 'styled-components'
import { convertTimeToFormat } from 'helpers/timeUtils'

const HistoryContainer = styled.div`
  padding: 18px;
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
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const RemoveButton = styled.button`
  float: right;
  color: black;
  border: 1px solid black;
  padding: 3px 5px;
  border-radius: 15px;
`

const Date = styled.span`
  float: right;
  color: black;
  padding: 3px 5px;
`

const Keyword = styled.span`
  font-size: 18px;
  font-weight: 400;
`

function History({ keywords, onRemoveKeyword, onClearKeywords }) {
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
        {keywords.map(({ id, text }) => {
          return (
            <KeywordContainer key={id}>
              <Keyword>{text}</Keyword>
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