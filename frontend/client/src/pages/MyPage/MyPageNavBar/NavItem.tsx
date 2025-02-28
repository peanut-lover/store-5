import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HighlightedText from '@src/components/HighlightedText/HighlightedText';
import { Link } from '@src/lib/CustomRouter';
import { useLocation } from '@src/lib/CustomRouter/CustomRouter';

import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight';

interface Props {
  name: string;
  to: string;
}
const NavItem: React.FC<Props> = ({ name, to }) => {
  const location = useLocation();
  const [isSelect, setIsSelect] = useState<boolean>(false);

  useEffect(() => {
    setIsSelect(to === location);
  }, [location]);

  return (
    <Wrapper to={to}>
      {isSelect ? <HighlightedText fontSize={'0.5rem'}>{name}</HighlightedText> : name}
      <FaChevronRight size={20} />
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  padding: 1rem 0.5rem;
  margin-bottom: 2px;
  cursor: pointer;
`;

export default NavItem;
