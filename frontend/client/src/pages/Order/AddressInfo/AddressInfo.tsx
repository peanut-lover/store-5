import { default as PrimaryButton } from '@src/components/Button/Button';
import CheckButtonWithLabel from '@src/components/CheckButtonWithLabel/CheckButtonWithLabel';
import Input from '@src/components/Input/Input';
import { Address } from '@src/types/Address';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import AddressCard from './AddressCard/AddressCard';
import AddressCreateModal from './AddressCreateModal/AddressCreateModal';
import AddressManageModal from './AddressManageModal/AddressManageModal';
import AddressSelectModal from './AddressSelectModal/AddressSelectModal';

interface Props {}

const AddressInfo: React.FC<Props> = ({}) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null); // 임시적인 처리입니다. TODO

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
          {isModalOpened && <AddressCreateModal onSelect={setSelectedAddress} onClose={toggleIsSelectModalOpened} />}
        </EmptyWrapper>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <AddressCard address={selectedAddress} />
      <Button onClick={toggleIsSelectModalOpened}>변경</Button>
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

const Button = styled.button`
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
