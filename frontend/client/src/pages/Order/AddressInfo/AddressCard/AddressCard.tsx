import { Address } from '@src/types/Address';
import React from 'react';
import styled from 'styled-components';

interface Props {
  address: Address;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const AddressCard: React.FC<Props> = ({ address: addressProp, onClick, onDelete, onEdit }) => {
  const { name, receiver, zipCode, address, subAddress } = addressProp;

  return (
    <Wrapper clickable={!!onClick}>
      <InfoGroup>
        <SmallStrong>
          {receiver} ({name})
        </SmallStrong>
        <SmallStrong>우편번호: {zipCode}</SmallStrong>
        <MediumStrong>{`${address} ${subAddress}`}</MediumStrong>
      </InfoGroup>

      <ButtonGroup>
        {onEdit && <TextButton>수정</TextButton>}
        {onEdit && onDelete && <Splitter />}
        {onDelete && <TextButton>삭제</TextButton>}
      </ButtonGroup>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ clickable: boolean }>`
  ${({ clickable }) => clickable && 'cursor: pointer;'}
  position: relative;
  padding: 1rem;
  background-color: white;
  transition: 0.2s linear;
  border: 1px solid white;

  :hover {
    ${({ clickable }) => clickable && 'border: 1px solid black;'}
  }
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const SmallStrong = styled.strong`
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: bolder;
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
