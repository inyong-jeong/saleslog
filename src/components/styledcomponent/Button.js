import styled from 'styled-components';
import { Button } from 'antd';
import Standard from 'components/standard';


const StyledButton = styled(Button)`
  width: 100%;
  height: 48px;
  color: ${Standard.colors.white};
  font-size: 14px;
  background-color: #333333;
  border: 1px solid #333333;/
  padding: 1px;
  margin: 0px;
  `;

export default StyledButton;