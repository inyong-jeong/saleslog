import React, { useState } from 'react';
import { Input, Tabs, Row, Col, Menu, TreeSelect } from 'antd';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { TreeNode } = TreeSelect;


function SalesLogList(props) {

  const [value, setValue] = useState()

  const onChange = () => {
    setValue(value);
  }
  function callback(key) {
    console.log(key);
  }
  const handleClick = (e) => {
    console.log(e);
  }
  return (
    <>
      <Row>
        <Col md={24} lg={24} xs={24}>
          <Input.Search placeholder='검색어를 입력해주세요'></Input.Search>
        </Col>
      </Row>
      <Row>
        <Col sm={24} xs={24} md={24} lg={12} >
          <Tabs style={{ width: 600 }} size='large' type='line' defaultActiveKey="1" onChange={callback}>
            <TabPane tab={<div style={{ width: '100%', textAlign: 'center' }}>영업일지</div>} key="1">
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="필터를 선택하세요"
                allowClear
                multiple
                treeDefaultExpandAll
                onChange={onChange}
              >
                <TreeNode value="대분류" title="대분류">
                  <TreeNode value="영업본부" title="영업본부" />
                  <TreeNode value="건설본부" title="건설본부" />
                </TreeNode>
                <TreeNode value="중분류" title="중분류">
                  <TreeNode value="영업부" title={<b style={{ color: '#08c' }}>관리부</b>} />
                  <TreeNode value="건설부" title="건설부" />
                </TreeNode>
                <TreeNode value="소분류" title="소분류">
                  <TreeNode value="영업1팀" title="영업1팀" />
                  <TreeNode value="건설1팀" title="건설1팀" />
                </TreeNode>
                <TreeNode value="세일즈맨" title="세일즈맨">
                  <TreeNode value="이순재" title="이순재" />
                  <TreeNode value="송강호" title="송강호" />
                </TreeNode>
                <TreeNode value="활동" title="활동">
                  <TreeNode value="니즈조사" title="니즈조사" />
                  <TreeNode value="동향/정보수집" title="동향/정보수집" />
                  <TreeNode value="제안" title="제안" />
                </TreeNode>
                <TreeNode value="채널" title="채널">
                  <TreeNode value="전화" title="전화" />
                  <TreeNode value="이메일" title="이메일" />
                  <TreeNode value="대면" title="대면" />
                  <TreeNode value="행사참여" title="행사참여" />
                  <TreeNode value="온라인 리서치" title="온라인 리서치" />
                  <TreeNode value="도서-전문정보" title="도서-전문정보" />
                  <TreeNode value="소셜커뮤니티" title="소셜커뮤니티" />
                  <TreeNode value="기타" title="기타" />
                </TreeNode>
                <TreeNode value="니즈" title="니즈">
                  <TreeNode value="전략" title="전략" />
                  <TreeNode value="운영" title="운영" />
                  <TreeNode value="개인" title="개인" />
                  <TreeNode value="상품" title="상품" />
                </TreeNode>
              </TreeSelect>
            </TabPane>
            <TabPane tab={<div style={{ width: '200px', textAlign: 'center' }}>리드일지</div>} key="2">
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="필터를 선택하세요"
                allowClear
                multiple
                treeDefaultExpandAll
                onChange={onChange}
              >
                <TreeNode value="대분류" title="대분류">
                  <TreeNode value="영업본부" title="영업본부" />
                  <TreeNode value="건설본부" title="건설본부" />
                </TreeNode>
                <TreeNode value="중분류" title="중분류">
                  <TreeNode value="영업부" title={<b style={{ color: '#08c' }}>관리부</b>} />
                  <TreeNode value="건설부" title="건설부" />
                </TreeNode>
                <TreeNode value="소분류" title="소분류">
                  <TreeNode value="영업1팀" title="영업1팀" />
                  <TreeNode value="건설1팀" title="건설1팀" />
                </TreeNode>
                <TreeNode value="세일즈맨" title="세일즈맨">
                  <TreeNode value="이순재" title="이순재" />
                  <TreeNode value="송강호" title="송강호" />
                </TreeNode>
                <TreeNode value="리드단계" title="리드단계">
                  <TreeNode value="조사" title="조사" />
                  <TreeNode value="접촉" title="접촉" />
                  <TreeNode value="제안" title="제안" />
                  <TreeNode value="검증" title="검증" />
                </TreeNode>
                <TreeNode value="활동" title="활동">
                  <TreeNode value="니즈조사" title="니즈조사" />
                  <TreeNode value="동향/정보수집" title="동향/정보수집" />
                  <TreeNode value="제안2" title="제안2" />
                </TreeNode>
                <TreeNode value="채널" title="채널">
                  <TreeNode value="전화" title="전화" />
                  <TreeNode value="이메일" title="이메일" />
                  <TreeNode value="대면" title="대면" />
                  <TreeNode value="행사참여" title="행사참여" />
                  <TreeNode value="온라인 리서치" title="온라인 리서치" />
                  <TreeNode value="도서-전문정보" title="도서-전문정보" />
                  <TreeNode value="소셜커뮤니티" title="소셜커뮤니티" />
                  <TreeNode value="기타" title="기타" />
                </TreeNode>
                <TreeNode value="니즈" title="니즈">
                  <TreeNode value="전략" title="전략" />
                  <TreeNode value="운영" title="운영" />
                  <TreeNode value="개인" title="개인" />
                  <TreeNode value="상품" title="상품" />
                </TreeNode>
              </TreeSelect>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      <Row>
      </Row>
    </>
  )
}


export default (SalesLogList);

{/* <Menu
          onClick={handleClick}
          style={{ width: 240 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <SubMenu key="filter1" title={<span><span>대분류</span></span>}>
            <Menu.Item key="1">영업본부</Menu.Item>
            <Menu.Item key="2">관리본부</Menu.Item>
          </SubMenu>
          <SubMenu key="filter2" title={<span><span>중분류</span></span>}>
            <Menu.Item key="11">영업부</Menu.Item>
            <Menu.Item key="12">관리부</Menu.Item>
          </SubMenu>
          <SubMenu key="filter3" title={<span><span>소분류</span></span>}>
            <Menu.Item key="11">영업1팀</Menu.Item>
            <Menu.Item key="12">관리1팀</Menu.Item>
          </SubMenu>
          <SubMenu key="filter4" title={<span><span>세일즈맨</span></span>}>
            <Menu.Item key="11">이순재</Menu.Item>
            <Menu.Item key="12">송강호</Menu.Item>
          </SubMenu>
          <SubMenu key="filter5" title={<span><span>활동</span></span>}>
            <Menu.Item key="11">니즈조사</Menu.Item>
            <Menu.Item key="12">동향/정보수집</Menu.Item>
            <Menu.Item key="12">제안</Menu.Item>

          </SubMenu>
          <SubMenu key="filter6" title={<span><span>채널</span></span>}>
            <Menu.Item key="11">전화</Menu.Item>
            <Menu.Item key="12">이메일</Menu.Item>
            <Menu.Item key="12">대면</Menu.Item>
            <Menu.Item key="12">행사참여</Menu.Item>
            <Menu.Item key="12">온라인 리서치</Menu.Item>
            <Menu.Item key="12">도서-전문정보</Menu.Item>
            <Menu.Item key="12">소셜커뮤니티</Menu.Item>
            <Menu.Item key="12">기타</Menu.Item>

          </SubMenu>
          <SubMenu key="filter7" title={<span><span>니즈</span></span>}>
            <Menu.Item key="11">전략</Menu.Item>
            <Menu.Item key="12">운영</Menu.Item>
            <Menu.Item key="12">개인</Menu.Item>
            <Menu.Item key="12">상품</Menu.Item>

          </SubMenu>
        </Menu> */}