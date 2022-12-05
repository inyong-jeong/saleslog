import styled from 'styled-components';
import { Radio } from 'antd';
import Standard from 'components/standard';


const StyledRadio = styled(Radio)`
  .ant-radio-input:focus + .ant-radio-inner,
  .ant-radio-wrapper:hover .ant-radio-inner,
  .ant-radio:hover .ant-radio-inner {
    border-color: ${Standard.colors.blue};
  }
  .ant-radio-checked .ant-radio-inner,
  .ant-radio-indeterminate .ant-radio-inner {
    background-color: ${Standard.colors.blue};
    border-color: ${Standard.colors.blue};
  }
  .ant-radio-checked:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    border: 1px solid ${Standard.colors.blue};
    content: '';
    -webkit-animation: antradioEffect 0.36s ease-in-out;
    animation: antradioEffect 0.36s ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    visibility: hidden;
  }
`;

export default StyledRadio;