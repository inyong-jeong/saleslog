import styled from 'styled-components';
import { Button } from 'antd';
import Standard from 'components/standard';


const StyledButton = styled(Button)`
  width: 343px;
  height: 48px;
  color: ${Standard.colors.white};
  font-size: 14px;
  background-color: ${Standard.colors.blue};
  border: 1px solid ${Standard.colors.blue};/
  padding: 1px;
  margin: 0px;
  `;

export default StyledButton;