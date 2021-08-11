import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Category from '@src/components/Header/HeaderBottom/Category/Category';
import styled from 'styled-components';

const CategoryToggle = () => {
  const categoryRef = useRef<HTMLDivElement>(null);
  const [openCategory, setOpenCategory] = useState(false);

  const handleOpenCategory = useCallback(() => {
    setOpenCategory(true);
  }, [setOpenCategory]);
  const handleCloseCategory = useCallback(
    (e) => {
      const el = categoryRef.current as HTMLElement;
      if (el && !el.contains(e.target)) setOpenCategory(false);
    },
    [setOpenCategory]
  );

  useEffect(() => {
    document.addEventListener('click', handleCloseCategory);
    return () => {
      document.removeEventListener('click', handleCloseCategory);
    };
  }, []);

  return (
    <Toggle ref={categoryRef} onClick={handleOpenCategory}>
      <GiHamburgerMenu size='1.7em' />
      <Title>전체 카테고리</Title>
      {openCategory && <Category />}
    </Toggle>
  );
};

const Toggle = styled.div`
  display: flex;
  align-items: center;
  color: rgb(115, 103, 92);
  cursor: pointer;
`;

const Title = styled.h3`
  margin: 0;
  margin-left: 6px;
  line-height: 2em;
  font-size: 20px;
`;

export default CategoryToggle;
