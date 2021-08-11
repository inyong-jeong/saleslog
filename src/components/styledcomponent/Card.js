import styled from 'styled-components';
import { Card } from 'antd';
import Standard from 'components/standard';

const StyledCard = styled(Card)`
border: 1px solid black;
width: ${Standard.size.width};
`;

export default StyledCard;