import styled from 'styled-components';
import { Menu } from 'antd';
import Standard from 'components/standard';

const StyledMenu = styled(Menu)`
visibility: "hidden";
justifyContent: 'space-between';
position: 'sticky';
bottom: '10%';
fontSize: '2px';
height: '75px';
backgroundColor: 'white';
alignItems: 'center';
  `;

export default StyledMenu;