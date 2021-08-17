import PrimaryButton from '@src/components/PrimaryButton/PrimaryButton';
import { AddressInfo } from '@src/types/Address';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import AddressCard from '@src/components/AddressCard/AddressCard';
import AddressCreateModal from '@src/components/AddressModals/AddressCreateModal/AddressCreateModal';
import AddressManageModal from '@src/components/AddressModals/AddressManageModal/AddressManageModal';

const AddressInfo: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<AddressInfo | null>(null); // 임시적인 처리입니다. TODO

  const [isModalOpened, setIsModalOpened] = useState(false);
  const toggleIsSelectModalOpened = () => {
    setIsModalOpened(!isModalOpened);
  };

  if (!selectedAddress) {
    return (
      <Wrapper>
        <EmptyWrapper>
          등록된 배송지가 없습니다.
          <PrimaryButton onClick={toggleIsSelectModalOpened}>등록하기</PrimaryButton>
          {isModalOpened && <AddressCreateModal onCreate={setSelectedAddress} onClose={toggleIsSelectModalOpened} />}
        </EmptyWrapper>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <AddressCard address={selectedAddress} />
      <ModifyButton onClick={toggleIsSelectModalOpened}>변경</ModifyButton>
      {isModalOpened && <AddressManageModal onSelect={setSelectedAddress} onClose={toggleIsSelectModalOpened} />}
      {/* TODO: 배송메모 input */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 1rem;
  position: relative;
`;

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
`;

const ModifyButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  border: 1px solid #ddd;
  color: black;
  background-color: white;
  margin: 0;
  padding: 0.5rem 1rem;
  font-size: 1.125rem;
  font-weight: bolder;
  transition: 0.2s linear;
  :hover {
    border: 1px solid black;
  }
`;

export default AddressInfo;
