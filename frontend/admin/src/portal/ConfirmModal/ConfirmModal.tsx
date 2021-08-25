import { styled } from '@src/lib/CustomStyledComponent';
import Portal from '@src/portal/portal';
import React from 'react';

interface Props {
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}
const ConfirmModal: React.FC<Props> = ({ title, onConfirm, onClose }) => {
  return (
    <Portal>
      <ConfirmModalContainer onClick={() => onClose()}>
        <ConfirmContent onClick={(e) => e.stopPropagation()}>
          <ConfirmTitleContainer>
            <ConfirmTitle>{title}</ConfirmTitle>
          </ConfirmTitleContainer>
          <ConfirmButtonContainer>
            <ConfirmButton onClick={onConfirm}>
              <span>확인</span>
            </ConfirmButton>
            <CloseButton onClick={onClose}>
              <span>취소</span>
            </CloseButton>
          </ConfirmButtonContainer>
        </ConfirmContent>
      </ConfirmModalContainer>
    </Portal>
  );
};

const ConfirmModalContainer = styled('div')`
  position: fixed;
  z-index: 1005;
  text-align: center;
  background-color: #00000020;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ConfirmContent = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 15%;
  width: 20%;
  margin: auto;
  background-color: white;
  border-radius: 8px;
`;

const ConfirmTitleContainer = styled('div')`
  padding-top: 3em;
  width: 100%;
  height: 70%;
  border-bottom: 1px solid lightgrey;
`;

const ConfirmTitle = styled('p')`
  font-weight: 700;
  margin-bottom: 10px;
`;

const ConfirmButtonContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 30%;
`;

const ConfirmButton = styled('button')`
  display: flex;
  height: 100%;
  flex-basis: 50%;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-right: 1px solid lightgrey;
  background-color: transparent;
  cursor: pointer;
`;

const CloseButton = styled('button')`
  display: flex;
  height: 100%;
  flex-basis: 50%;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  color: red;
`;
export default ConfirmModal;
