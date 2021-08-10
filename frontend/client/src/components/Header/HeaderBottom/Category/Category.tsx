import React, { useState } from 'react';
import { useCallback } from 'react';
import { debounce, debounceClear } from 'src/utils/debounce';
import {
  Container,
  MainCategory,
  SubListContainer,
  MainListContainer,
  MainList,
  SubList,
  SubCategory,
  MainCategoryTitle,
  SubCategoryTitle,
  SubCategoryLink,
} from './CategoryStyle';

const MAIN_CATEGORY = ['문구', '리빙', '책', '배민그린', '을지로에디션'];

const SUB_CATEGORY = {
  문구: ['문구1', '문구2', '문구3', '문구4', '문구5', '문구6'],
  리빙: ['리빙1', '리빙2', '리빙3', '리빙4', '리빙5', '리빙6'],
  책: ['책1', '책2', '책3', '책4', '책5', '책6'],
  배민그린: ['배민그린1', '배민그린2', '배민그린3', '배민그린4', '배민그린5', '배민그린6'],
  을지로에디션: [
    '을지로에디션1',
    '을지로에디션2',
    '을지로에디션3',
    '을지로에디션4',
    '을지로에디션5',
    '을지로에디션6',
    '을지로에디션1',
    '을지로에디션2',
    '을지로에디션3',
    '을지로에디션4',
    '을지로에디션5',
    '을지로에디션6',
  ],
};

type MainCategory = '문구' | '리빙' | '책' | '배민그린' | '을지로에디션';

const Category = () => {
  const [hovered, setHovered] = useState<MainCategory>(MAIN_CATEGORY[0] as MainCategory);
  const onHover = useCallback((e) => {
    const category = e.target.dataset.category;
    if (!category) return;
    debounce(() => {
      setHovered(e.target.dataset.category);
    }, 100);
  }, []);
  return (
    <Container>
      <MainListContainer>
        <MainList onMouseOver={onHover}>
          {MAIN_CATEGORY.map((category, i) => (
            <MainCategory key={i} data-category={category}>
              <MainCategoryTitle>{category}</MainCategoryTitle>
            </MainCategory>
          ))}
        </MainList>
      </MainListContainer>
      <SubListContainer>
        <SubList onMouseEnter={debounceClear}>
          {SUB_CATEGORY[hovered].map((category, i) => (
            <SubCategory key={i}>
              <SubCategoryLink href='/category'>
                <SubCategoryTitle>{category}</SubCategoryTitle>
              </SubCategoryLink>
            </SubCategory>
          ))}
        </SubList>
      </SubListContainer>
    </Container>
  );
};

export default Category;
