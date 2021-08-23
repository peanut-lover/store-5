import React from 'react';
import styled from 'styled-components';

interface Props {
  labelText: string;
}

const InfoContent: React.FC<Props> = ({ labelText, children }) => {
  return (
    <InfoContentContainer>
      <span>{labelText}</span>
      <div>{children}</div>
    </InfoContentContainer>
  );
};

const InfoContentContainer = styled.div`
  display: flex;
  column-gap: 2rem;
  align-items: flex-start;
  margin-bottom: 1rem;
  line-height: 1.5em;
  span {
    color: #717171;
    width: 5rem;
    font-weight: 600;
  }
`;

export default InfoContent;
