import styled from 'styled-components';
import { Tabs } from 'antd';
import Standard from 'components/standard';

const StyledTabs = styled(Tabs)`
  color: ${Standard.colors.blue};
  background-color: ${Standard.colors.blue};
  width: ${Standard.size.width}
  `;

export default StyledTabs;