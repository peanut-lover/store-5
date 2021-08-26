import styled from 'styled-components';

interface Props {
  size?: number;
  color?: string;
  lineStyle?: string;
}

const Divider = styled.hr<Props>`
  width: 100%;
  border: none;
  border-bottom: ${(props) => `${props.size ?? 1}px ${props.lineStyle ?? 'solid'} ${props.color ?? '#ddd'}`};
`;

export default Divider;
