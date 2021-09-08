import React from 'react';
import StyledSelect from '../styledcomponent/StyledSelect';
const { Option } = StyledSelect;

function onSearch(val) {
  console.log('filter name search::: ', val)
}

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

  const onChangeSortType = (value) => {
    setInputs({ ...inputs, order: value })
    setPage(1)
  }
  const onChangeGradeType = (value) => {
    setInputs({ ...inputs, score: value })
    setPage(1)
  }
  const onChangeUsers = (value) => {
    setInputs({ ...inputs, users: value })
    setPage(1)
  }

  //등급 옵션 
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
  const handleDeselect = e => {
    //console.log(e)
  }
  return (
    <div style={{ display: 'flex' }}>

      <StyledSelect
        onDeselect={handleDeselect}
        showArrow
        showSearch={false}
        mode="multiple"
        disabled={disabled}
        style={eachSelectStyle}
        placeholder="등급/단계"
        onChange={onChangeGradeType}>
        {options}
      </StyledSelect>

      <StyledSelect
        style={eachSelectStyle}
        showSearch
        placeholder="담당 사원"
        onChange={onChangeUsers}
        onSearch={onSearch} >
        <Option key={''}>전체</Option>)
        {userNames}
      </StyledSelect>

      <StyledSelect
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