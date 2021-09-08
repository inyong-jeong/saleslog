import React, { useState } from 'react';
import { TreeSelect } from 'antd';

const { TreeNode } = TreeSelect;

const SalesLogFilter = () => {

  const [value, setValue] = useState()
  const onChange = () => {
    setValue(value);
  }
  function callback(key) {
    console.log(key);
  }

  return (
    <>
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
    </>
  )

}
export default SalesLogFilter;