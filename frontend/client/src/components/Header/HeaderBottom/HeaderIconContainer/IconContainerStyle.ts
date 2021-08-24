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
  position: absolute;
  top: 0;
  right: 0.75rem;
  color: white;
  background-color: ${(prop) => prop.theme.primary};
  width: 0.75rem;
  height: 0.75rem;
  text-align: center;
  font-size: 0.75rem;
  border-radius: 100%;
`;
