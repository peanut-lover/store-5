import React, { useState, useCallback, useEffect } from 'react';
import { debounce } from '@src/utils/debounce';
import MainCategoryList from '@src/components/Header/HeaderBottom/Category/MainCategoryList/MainCategoryList';
import SubCategoryList from '@src/components/Header/HeaderBottom/Category/SubCategoryList/SubCategoryList';
import styled from 'styled-components';
import { getAllCategory } from '@src/apis/categoryAPI';
import { Category } from '@src/types/Category';

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [hovered, setHovered] = useState<string>('');
  const handleSetDebounce = useCallback(
    (target: string, time: number) => {
      debounce(() => {
        setHovered(target);
      }, time);
    },
    [setHovered]
  );

  const handleHover = useCallback((e) => {
    const category = e.target.dataset.category;
    if (!category) return;
    handleSetDebounce(category, 100);
  }, []);

  const fetchCategory = async () => {
    const {
      result: { categories },
    } = await getAllCategory();
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const mainCategories = categories.map((category) => category.name);
  const subCategories = categories.find((category) => category.name === hovered)?.categories?.map((c) => c.name);

  return (
    <CategoryContainer>
      <MainCategoryList list={mainCategories} onHover={handleHover} hovered={hovered} />
      {subCategories && <SubCategoryList list={subCategories} />}
    </CategoryContainer>
  );
};

export const CategoryContainer = styled.div`
  display: flex;
  position: absolute;
  top: 100%;
  left: 15%;
  color: #fff;
  background-color: rgb(115, 103, 92);
  width: auto;
  min-height: 396px;
  min-width: 280px;
  max-width: 1080px;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px 0px;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: stretch;
  align-items: stretch;
  z-index: 5;
`;

export default Category;
