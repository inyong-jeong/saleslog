import styled from 'styled-components';
import { Tabs } from 'antd';

const FullTabs = styled(Tabs)`
.ant-tabs-nav {
width: 100% !important;
}

.ant-tabs-tab{
display: block; // centers text inside tabs
flex: 1;
text-align: center;
color: #333333;

}
.ant-tabs-tab:hover{
  color: #333333;
}

.ant-tabs-nav > div:nth-of-type(1) {
display: unset !important;
width: 100% !important;
}
.ant-tabs-tab-active{
  border-bottom: 2px solid #333333 !important;
  z-index: 2;
  color: #333333
  font-size: 14px;
}
`;

export default FullTabs;
