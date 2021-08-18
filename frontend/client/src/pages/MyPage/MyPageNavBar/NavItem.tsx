import styled from 'styled-components';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import HighlightedText from '@src/components/HighlightedText/HighlightedText';
import { Link } from '@src/lib/CustomRouter';
interface Props {
  name: string;
  to: string;
  isSelect?: boolean;
}
const NavItem: React.FC<Props> = ({ name, isSelect = false, to }) => {
  return (
    <Wrapper to={to}>
      {isSelect ? <HighlightedText fontSize={'0.5rem'}>{name}</HighlightedText> : name}
      <BiChevronRight size={20} />
    </Wrapper>
  );
};

const Wrapper = styled(Link)<{ theme: { line: string } }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  padding: 1rem 0.5rem;
  margin-bottom: 2px;
  border: 1px solid ${(props) => props.theme.line};
  cursor: pointer;
`;

export default NavItem;
