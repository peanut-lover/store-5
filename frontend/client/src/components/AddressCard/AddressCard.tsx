import HighlightedText from '@src/components/HighlightedText/HighlightedText';
import { AddressInfo } from '@src/types/Address';
import React from 'react';
import styled from 'styled-components';

interface Props {
  address: AddressInfo;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  disabled?: boolean;
}

const AddressCard: React.FC<Props> = ({ address: addressProp, onClick, onDelete, onEdit, disabled }) => {
  const { name, receiver, zipCode, address, subAddress, isDefault } = addressProp;

  return (
    <Wrapper
      clickable={!!onClick && !disabled}
      onClick={() => {
        !disabled && onClick?.();
      }}
      isPrimary={isDefault}
    >
      <InfoGroup>
        <SmallStrong>
          {isDefault && <HighlightedText>기본 주소</HighlightedText>} {receiver} ({name})
        </SmallStrong>
        <ZipCode>우편번호: {zipCode}</ZipCode>
        <MediumStrong>{`${address} ${subAddress}`}</MediumStrong>
      </InfoGroup>

      <ButtonGroup>
        {onEdit && (
          <TextButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            disabled={disabled}
          >
            수정
          </TextButton>
        )}
        {onEdit && onDelete && <Splitter />}
        {onDelete && (
          <TextButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            disabled={disabled}
          >
            삭제
          </TextButton>
        )}
      </ButtonGroup>
    </Wrapper>
  );
};

interface InfoGroupProps {
  theme: { primary: string };
  isPrimary?: boolean;
  clickable: boolean;
}

const Wrapper = styled.div<InfoGroupProps>`
  ${({ clickable }) => clickable && 'cursor: pointer;'}
  padding: 1rem;
  position: relative;
  background-color: white;
  transition: 0.2s linear;
  border: 2px solid ${(props) => (props.isPrimary ? props.theme.primary : 'white')};
  width: 100%;
  opacity: 0.8;
  :hover {
    ${({ clickable }) => clickable && 'opacity:1;'}
  }
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const SmallStrong = styled.span`
  padding: 0;
  margin: 0;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`;

const ZipCode = styled.strong`
  padding: 0;
  margin: 0;
  font-size: 1rem;
`;

const MediumStrong = styled.strong`
  padding: 0;
  margin: 0;
  font-size: 1.25rem;
  font-weight: bolder;
`;

const ButtonGroup = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  right: 1rem;
  top: 1rem;
`;

const TextButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
`;

const Splitter = styled.div`
  width: 1px;
  height: 0.75rem;
  background-color: #ddd;
`;

export default AddressCard;
