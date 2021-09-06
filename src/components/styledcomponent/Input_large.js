import styled from 'styled-components';
import { Input } from 'antd';
import Standard from 'components/standard';

const StyledInput = styled(Input)`
    width: ${Standard.size.width};
    height: ${Standard.size.height};
    margin: 10px;
    padding:8px;
  `;

export default StyledInput;