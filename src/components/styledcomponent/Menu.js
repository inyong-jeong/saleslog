import styled from 'styled-components';
import { Menu } from 'antd';

const StyledMenu = styled(Menu)`

.ant-menu-item-selected{
  background-color: #E0E0E0 !important; 

}
.ant-menu-item:hover {
  background-color: #F5F5F5 !important; 
}
.ant-menu-item-selected a{
  color: #000 !important; 
}

.ant-menu-item a{
  color: #666666 ; 
}
.ant-menu-item::after, .ant-menu-inline {
  border-right: 3px solid #000;
}
`;

export default StyledMenu;