import styled from 'styled-components';
import { Dropdown } from 'antd';
import Standard from 'components/standard';

const StyledDropdown = styled(Dropdown)`
  border: 1px solid black;
  padding: 10px;
  color: ${Standard.colors.black};
  background-color: ${Standard.colors.white};
  
  `;

export default StyledDropdown;