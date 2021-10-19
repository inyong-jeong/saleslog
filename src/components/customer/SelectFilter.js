import React, { useState } from 'react';
import StyledSelect from '../styledcomponent/StyledSelect';

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

  const [selectedUser, setSelectedUser] = useState(inputs.users ? inputs.users : null)
  const [selectedSortyType, setSelectedSortType] = useState(inputs.order ? inputs.order : null)
  const [selectedGradeType, setSelectedGradeType] = useState(inputs.gradeType ? inputs.gradeType : null)

  const onChangeSortType = (value) => {
    setInputs({ ...inputs, order: value })
    setPage(1)
    setSelectedSortType(value)
  }
  const onChangeGradeType = (value) => {
    setInputs({ ...inputs, score: value })
    setPage(1)
    setSelectedGradeType(value)
  }
  const onChangeUsers = (value) => {
    setInputs({ ...inputs, users: value })
    setPage(1)
    setSelectedUser(value)
  }

  const options = []
  for (let result of gradeType) {
    options.push(<Option key={Object.values(result)}> {Object.keys(result)}</Option>)
  }

  const userNames = []
  if (users) {
    users.map(user => {
      userNames.push(<Option key={user.login_idx}>{user.user_name}</Option>)
    })
  }

  return (
    <div style={{ display: 'flex' }}>

      <StyledSelect
        showArrow
        showSearch={false}
        disabled={disabled}
        value={selectedGradeType}
        style={eachSelectStyle}
        placeholder="등급/단계"
        onChange={onChangeGradeType}
      >
        {options}
      </StyledSelect>

      <StyledSelect
        style={eachSelectStyle}
        showSearch
        value={selectedUser}
        placeholder="담당 사원"
        onChange={onChangeUsers} >
        <Option key={''}>전체</Option>)
        {userNames}
      </StyledSelect>

      <StyledSelect
        value={selectedSortyType}
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