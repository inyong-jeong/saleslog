import React from 'react';
import StyledSelect from '../styledcomponent/StyledSelect';
import { useRef } from 'react';
const { Option } = StyledSelect
const eachSelectStyle = {
  flex: 1,
  margin: 3,
}

const SelectFilter = ({
  users,
  inputs,
  setInputs,
  disabled,
  gradeType,
  setPage,
}) => {

  const memberInputRef = useRef()

  const onChangeSortType = (value) => {
    setInputs({ ...inputs, order: value })
    setPage(1)
  }
  const onChangeGradeType = (value) => {
    setInputs({ ...inputs, score: value })
    setPage(1)
  }
  const onChangeUsers = (value) => {
    memberInputRef.current.blur()
    setInputs({ ...inputs, users: value })
    setPage(1)
  }

  const options = []
  for (let result of gradeType) {
    options.push(<Option key={Object.values(result)}> {Object.keys(result)}</Option>)
  }

  let userNames = []

  if (users) {
    users.map(user => {
      userNames.push(<Option key={user.login_idx} value={user.login_idx}>{user.user_name}</Option>)
    })
  }

  return (
    <div style={{ display: 'flex' }}>

      <StyledSelect
        showArrow
        showSearch={false}
        disabled={disabled}
        value={inputs.score ? inputs.score : null}
        style={eachSelectStyle}
        placeholder="등급/단계"
        onChange={onChangeGradeType}>
        {options}
      </StyledSelect>

      <StyledSelect
        ref={memberInputRef}
        style={eachSelectStyle}
        showSearch
        value={inputs.users ? inputs.users : null}
        placeholder="담당 멤버"
        onChange={onChangeUsers}
        filterOption={(input, option) =>
          option.children.includes(input.trim())
        }
      >
        <Option key={''}>전체</Option>)
        {userNames}
      </StyledSelect>

      <StyledSelect
        value={inputs.order ? inputs.order : null}
        style={eachSelectStyle}
        placeholder="최근 등록순"
        onChange={onChangeSortType}>
        <Option value="1">최근 등록순</Option>
        <Option value="2">고객명순</Option>
      </StyledSelect>
    </div>
  );
}

export default SelectFilter;