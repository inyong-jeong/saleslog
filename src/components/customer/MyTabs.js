import React, { useState } from 'react';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import { FormControl, NativeSelect } from '@material-ui/core';
import SelectFilter from './SelectFilter';
import { Tabs } from 'antd';
import CustomerItems from './CustomerItems';
import GetCustomer from './GetCustomers';
const { TabPane } = Tabs;

export default function MyTabs({
  value,
  isSearchClicked,
  sortType,
  grade,
  employee
}) {

  const onTabChange = (key) => {
    switch (key) {
      case '2': setTabCode('0010001')
        break
      case '3': setTabCode('0010002')
        break
      default: setTabCode('')
    }

  }

  const [tabCode, setTabCode] = useState('')

  const scoreType = ['A', 'B', 'C', 'D', 'E', 'F', 'BLACK']
  const stageType = ['발굴', '조사', '접촉', '검증']
  const emptyType = []

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={onTabChange}>
        <TabPane tab="전체" key="1" >
          <SelectFilter
            disabled={true}
            gradeType={emptyType}
          />
          {/* <CustomerItems tabCode={tabCode} value={value} isSearchClicked={isSearchClicked}
            sortType={sortType} grade={grade} employee={employee} /> */}
          <GetCustomer tabCode={tabCode} value={value} isSearchClicked={isSearchClicked}
            sortType={sortType} grade={grade} employee={employee} />
        </TabPane>
        <TabPane tab="영업활동" key="2">
          <SelectFilter gradeType={scoreType} />
          {/* <CustomerItems tabCode={tabCode} value={value} isSearchClicked={isSearchClicked}
            sortType={sortType} grade={grade} employee={employee}
          />
           */}
          <GetCustomer tabCode={tabCode} value={value} isSearchClicked={isSearchClicked}
            sortType={sortType} grade={grade} employee={employee} />
        </TabPane>
        <TabPane tab="리드관리" key="3">
          <SelectFilter gradeType={stageType} />
          {/* <CustomerItems tabCode={tabCode} value={value} isSearchClicked={isSearchClicked}
            sortType={sortType} grade={grade} employee={employee}
          /> */}
          <GetCustomer tabCode={tabCode} value={value} isSearchClicked={isSearchClicked}
            sortType={sortType} grade={grade} employee={employee} />
        </TabPane>
      </Tabs>

    </>

  );
}