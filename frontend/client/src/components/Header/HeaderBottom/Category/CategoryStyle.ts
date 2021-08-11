import styled, { css } from 'styled-components';

type CategoryProp = {
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

export const Container = styled.div`
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
export const MainListContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  width: 132px;
  height: auto;
  min-height: 396px;
  background: rgb(89, 80, 72);
`;
export const MainList = styled.ul`
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

export const MainCategory = styled.li<CategoryProp>`
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

export const SubListContainer = styled.div`
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
export const SubList = styled.ul`
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
