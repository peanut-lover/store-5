import styled from 'styled-components';

export const IconContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4em;
  border-right: 1px solid lightgray;
  cursor: pointer;
`;

export const IconTitle = styled.span`
  font-size: 0.7rem;
  margin-top: 6px;
  color: gray;
`;

export const IconNumber = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -0.5rem;
  right: 0.5rem;
  color: white;
  background-color: ${(prop) => prop.theme.primary};
  width: 1rem;
  height: 1rem;
  font-size: 0.8rem;
  border-radius: 100%;
`;
