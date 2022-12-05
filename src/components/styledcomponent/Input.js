import styled from 'styled-components';
import { Input } from 'antd';
import Standard from 'components/standard';

const StyledInput = styled(Input)`
   // width: ${Standard.size.width};
    height: ${Standard.size.height};
    fontSize: ${Standard.fontSizes.Header};
    // margin: ${Standard.root.margin};
    // padding: ${Standard.root.padding};
  `;

export default StyledInput;