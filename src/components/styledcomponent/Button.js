import styled from 'styled-components';
import { Button } from 'antd';
import Standard from 'components/standard';


const StyledButton = styled(Button)`
  width: 100%;
  height: 48px;
  color: ${Standard.colors.white};
  font-size: 14px;
  background-color: #333333;
  border: 1px solid #333333;
  padding: 1px;
  margin: 0px;

  ${'' /* .ant-btn-primary {
    background: #000000;
    border-color: #000000;
}

.ant-btn-primary:hover {
    background: #666666;
    border-color: #666666;
} */}

  `;

export default StyledButton;