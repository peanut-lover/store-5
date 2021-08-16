import React from 'react';
import styled from 'styled-components';
import Divider from '../Divider/Divider';

const Topic: React.FC = ({ children }) => {
  return (
    <div>
      <StrongText>{children}</StrongText>
      <Divider size={2} />
    </div>
  );
};

const StrongText = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 1.375rem;
  font-weight: bolder;
`;

export default Topic;
