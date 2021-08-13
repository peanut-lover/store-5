import CheckButtonWithLabel from '@src/components/CheckButtonWithLabel/CheckButtonWithLabel';
import Input from '@src/components/Input/Input';
import { Address } from '@src/types/Address';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import AddressCard from './AddressCard/AddressCard';
import AddressSelectModal from './AddressSelectModal/AddressSelectModal';

interface Props {}

const mock: Address[] = [
  {
    id: 3,
    name: '집',
    receiver: '신어진',
    zipCode: '1234',
    address: '대구 광역시 북구',
    subAddress: '301호',
    isDefault: true,
  },
  {
    id: 4,
    name: '회사',
    receiver: '신어진',
    zipCode: '12234',
    address: '대구 광역시 북구',
    subAddress: '302호',
    isDefault: false,
  },
];

const AddressInfo: React.FC<Props> = ({}) => {
  const addressList = mock;
  const selectedAddress = addressList[0]; // 임시적인 처리입니다.

  const [isSelectModalOpened, setIsSelectModalOpened] = useState(false);
  const toggleIsSelectModalOpened = () => {
    setIsSelectModalOpened(!isSelectModalOpened);
  };

  return (
    <Wrapper>
      {/* TODO: 노데이터 */}
      <AddressCard address={selectedAddress} />
      {isSelectModalOpened && (
        <AddressSelectModal
          addressList={addressList}
          onSelect={toggleIsSelectModalOpened}
          onCancel={toggleIsSelectModalOpened}
        />
      )}
      <Button onClick={toggleIsSelectModalOpened}>변경</Button>
      {/* TODO: 배송메모 input */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 1rem;
  position: relative;
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
