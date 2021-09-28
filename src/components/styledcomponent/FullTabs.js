import styled from 'styled-components';
import { Tabs } from 'antd';

const FullTabs = styled(Tabs)`

.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: #333333 ; 
  font-weight: 500;

}

${'' /* .ant-tabs-nav {
width: 100% !important;
} */}

.ant-tabs-tab{
display: block; // centers text inside tabs
flex: 1;
text-align: center;

}
.ant-tabs-tab:hover{
  color: #818181;
}

.ant-tabs-nav > div:nth-of-type(1) {
display: unset ;
width: 100% ;
}
.ant-tabs-tab-active{
  border-bottom: 2px solid #333333 ;
  z-index: 2;
  color: #333333
  font-size: 14px;
}
.ant-tabs-ink-bar {
  position: absolute;
  background: #000000;
  pointer-events: none;
}

`;

export default FullTabs;
