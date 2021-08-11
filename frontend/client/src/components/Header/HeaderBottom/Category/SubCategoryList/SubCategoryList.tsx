import { debounceClear } from '@src/utils/debounce';
import React from 'react';
import styled from 'styled-components';

interface Props {
  list: { [key: string]: string[] };
  hovered: string;
}
const SubCategoryList: React.FC<Props> = ({ list, hovered }) => {
  return (
    <SubCategoryContainer>
      <SubCategories onMouseEnter={debounceClear}>
        {list[hovered].map((category, i) => (
          <SubCategory key={i}>
            <SubCategoryLink href='/category'>
              <SubCategoryTitle>{category}</SubCategoryTitle>
            </SubCategoryLink>
          </SubCategory>
        ))}
      </SubCategories>
    </SubCategoryContainer>
  );
};

export const SubCategoryContainer = styled.div`
  width: auto;
  min-width: 160px;
  background: rgb(255, 255, 255);
  height: auto;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
`;
export const SubCategories = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  border-right: 1px solid rgb(238, 238, 238);
`;

export const SubCategory = styled.li`
  position: relative;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 44px;
  max-height: 44px;
  cursor: pointer;
  color: rgb(51, 51, 51);
  padding: 0px;
  font-size: 14px;
  background: rgb(255, 255, 255);
  font-weight: 500;
  border-top: none;
  border-bottom: none;
  :hover {
    span {
      font-weight: bold;
      ::before {
        display: block;
        position: absolute;
        content: ' ';
        background: rgb(221, 221, 221);
        width: calc(100% + 4px);
        height: 10px;
        left: -2px;
        bottom: -1px;
        z-index: -1;
      }
    }
  }
`;

export const SubCategoryLink = styled.a`
  color: inherit;
  border: 0px;
  padding: 0px;
  margin: 0px;
  text-decoration: none;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const SubCategoryTitle = styled.span`
  position: relative;
  margin: 0px 16px;
  z-index: 1;
`;

export default SubCategoryList;
