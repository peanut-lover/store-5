import React, { MouseEvent } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  list: string[];
  onHover: (e: MouseEvent<HTMLUListElement> | undefined) => void;
  hovered: string;
}

const MainCategoryList: React.FC<Props> = ({ list, onHover, hovered }) => {
  return (
    <MainCategoryContainer>
      <MainCategories onMouseOver={onHover}>
        {list.map((category, i) => (
          <MainCategory key={i} active={category === hovered} data-category={category}>
            <MainCategoryTitle>{category}</MainCategoryTitle>
          </MainCategory>
        ))}
      </MainCategories>
    </MainCategoryContainer>
  );
};

type MainCategoryProp = {
  active?: boolean;
};

const ActiveCategory = css`
  color: rgb(51, 51, 51);
  font-weight: bold;
  background: rgb(255, 255, 255);
  border-bottom: none;
  span {
    ::before {
      display: block;
      position: absolute;
      content: ' ';
      background: rgb(42, 193, 188);
      width: calc(100% + 4px);
      height: 10px;
      opacity: 0.4;
      left: -2px;
      bottom: -1px;
      z-index: -1;
    }
  }
`;
export const MainCategoryContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  width: 132px;
  height: auto;
  min-height: 396px;
  background: rgb(89, 80, 72);
`;
export const MainCategories = styled.ul`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  list-style: none;
  align-items: flex-start;
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
  min-height: 396px;
  background: rgb(89, 80, 72);
  font-weight: 500;
  font-size: 16px;
`;

export const MainCategory = styled.li<MainCategoryProp>`
  box-sizing: border-box;
  position: relative;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 56px;
  max-height: 56px;
  padding: 0px 24px;
  font-size: 16px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  background: rgb(89, 80, 72);
  border-bottom: 1px solid rgba(51, 51, 51, 0.25);
  ${(props) => (props.active ? ActiveCategory : '')};
`;

export const MainCategoryTitle = styled.span`
  position: relative;
  z-index: 1;
`;

export default MainCategoryList;
