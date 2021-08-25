import theme from '@src/theme/theme';
import React from 'react';
import styled from 'styled-components';

interface Props {
  activeSubmit: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isEdit: boolean;
}

const ReviewFormFooter: React.FC<Props> = ({ activeSubmit, onClose, onSubmit, isEdit }) => {
  return (
    <ReviewFormFooterContainer>
      <CloseButton onClick={onClose}>닫기</CloseButton>
      <SubmitButton active={activeSubmit} onClick={onSubmit} bgcolor={theme.primary}>
        {isEdit ? '작성' : '수정'}
      </SubmitButton>
    </ReviewFormFooterContainer>
  );
};

const ReviewFormFooterContainer = styled.div`
  display: flex;
  padding: 0 36px 12px 36px;
  width: 100%;
  height: 12%;
`;

const CloseButton = styled.button`
  width: 30%;
  height: 65%;
  margin-right: 20%;
  background-color: transparent;
  border-radius: 12px;
  font-size: 1.5em;
  border: 1px solid lightgray;
  cursor: pointer;
`;

interface SubmitProps {
  bgcolor: string;
  active: boolean;
}

const SubmitButton = styled.button<SubmitProps>`
  width: 50%;
  height: 65%;
  background-color: transparent;
  border-radius: 12px;
  font-size: 1.5em;
  border: 1px solid lightgray;
  pointer-events: ${(props) => (props.active ? 'pointer' : 'none')};
  cursor: ${(props) => (props.active ? 'pointer' : 'none')};
  background-color: ${(props) => (props.active ? props.bgcolor : 'transparent')};
  color: ${(props) => (props.active ? 'white' : 'lightgray')};
`;

export default ReviewFormFooter;
