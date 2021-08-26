import React from 'react';
import styled from 'styled-components';

interface Props {
  title?: string;
}
const SubNav: React.FC<Props> = ({ title = '', children }) => {
  return (
    <>
      {title && <NavLabel>{title}</NavLabel>}
      <NavItemList>{children}</NavItemList>
    </>
  );
};

const NavLabel = styled.h2<{ theme: { label: string } }>`
  padding: 0.5rem 0;
  color: ${(props) => props.theme.label};
`;

const NavItemList = styled.ul`
  margin-bottom: 20px;
`;
export default SubNav;
