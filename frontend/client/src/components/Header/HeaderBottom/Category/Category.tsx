import React, { useState, useCallback } from 'react';
import { debounce } from '@src/utils/debounce';
import MainCategoryList from '@src/components/Header/HeaderBottom/Category/MainCategoryList/MainCategoryList';
import SubCategoryList from '@src/components/Header/HeaderBottom/Category/SubCategoryList/SubCategoryList';
import styled from 'styled-components';

// TODO: API 연동 후 dummy Data 삭제
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

// TODO: 임시 데이터 타입 정의, DB에서 데이터 관리할 예정
type MainCategory = '문구' | '리빙' | '책' | '배민그린' | '을지로에디션';

const Category = () => {
  const [hovered, setHovered] = useState<MainCategory>(MAIN_CATEGORY[0] as MainCategory);
  const handleSetDebounce = useCallback(
    (target: MainCategory, time: number) => {
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

  return (
    <CategoryContainer>
      <MainCategoryList list={MAIN_CATEGORY} onHover={handleHover} hovered={hovered} />
      <SubCategoryList list={SUB_CATEGORY} hovered={hovered} />
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
