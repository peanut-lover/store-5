import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import { styled } from '@src/lib/CustomStyledComponent';
import React from 'react';

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <CloseButtonContainer onClick={onClick}>
      <FaTimes />
    </CloseButtonContainer>
  );
};

const CloseButtonContainer = styled('button')`
  position: absolute;
  top: -0.5em;
  right: -0.5em;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 1.8em;
  border-radius: 50%;
  background-color: #2ac1bc;
  color: white;
  border: none;
  cursor: pointer;
`;

export default CloseButton;
