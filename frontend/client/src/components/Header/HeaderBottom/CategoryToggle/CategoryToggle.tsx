import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import Category from '@src/components/Header/HeaderBottom/Category/Category';
import { Category as CategoryType } from '@src/types/Category';
import { getAllCategory } from '@src/apis/categoryAPI';

const CategoryToggle = () => {
  const categoryRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
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
    document.addEventListener('mouseover', handleCloseCategory);
    return () => {
      document.removeEventListener('mouseover', handleCloseCategory);
    };
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const {
        result: { categories },
      } = await getAllCategory();
      setCategories(categories);
    };
    fetchCategory();
  }, []);

  return (
    <CategoryToggleContainer ref={categoryRef} onMouseOver={handleOpenCategory}>
      <GiHamburgerMenu size='1.7em' />
      <CategoryToggleTitle>전체 카테고리</CategoryToggleTitle>
      {openCategory && <Category categories={categories} />}
    </CategoryToggleContainer>
  );
};

const CategoryToggleContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  color: rgb(115, 103, 92);
  cursor: pointer;
`;

const CategoryToggleTitle = styled.h3`
  margin: 0;
  margin-left: 6px;
  line-height: 2em;
  font-size: 20px;
`;

export default CategoryToggle;
