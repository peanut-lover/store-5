import PrimaryButton from '@src/components/PrimaryButton/PrimaryButton';
import { AddressInfo } from '@src/types/Address';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import AddressCard from '@src/components/AddressCard/AddressCard';
import AddressCreateModal from '@src/components/AddressModals/AddressCreateModal/AddressCreateModal';
import AddressManageModal from '@src/components/AddressModals/AddressManageModal/AddressManageModal';
import { useEffect } from 'react';
import { AddressAPI } from '@src/apis/addressAPI';

interface Prop {
  onChangeSelectedAddress: (selectedAddress: AddressInfo | null) => void;
}

const AddressInfo: React.FC<Prop> = ({ onChangeSelectedAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState<AddressInfo | null>(null);

  const [isAddressFetched, setIsAddressFetched] = useState(false);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const toggleIsSelectModalOpened = () => {
    setIsModalOpened(!isModalOpened);
  };

  const handleSelectedAddress = (selectedAddress: AddressInfo) => {
    setSelectedAddress(selectedAddress);
    onChangeSelectedAddress(selectedAddress);
  };

  useEffect(() => {
    async function fetchAddress() {
      try {
        const { result } = await AddressAPI.getAddresses();
        const targetAddress = result.find((addressInfo) => addressInfo.isDefault) || result[0];
        handleSelectedAddress(targetAddress);
        setIsAddressFetched(true);
      } catch (err) {
        alert('서버 문제로 정보업데이트에 실패했습니다.');
        console.error(err);
      }
    }

    fetchAddress();
  }, []);

  if (!isAddressFetched) {
    return null;
  }

  if (!selectedAddress) {
    return (
      <Wrapper>
        <EmptyWrapper>
          등록된 배송지가 없습니다.
          <PrimaryButton onClick={toggleIsSelectModalOpened}>등록하기</PrimaryButton>
          {isModalOpened && <AddressCreateModal onSelect={handleSelectedAddress} onClose={toggleIsSelectModalOpened} />}
        </EmptyWrapper>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <AddressCard address={selectedAddress} />
      <UpdateButton onClick={toggleIsSelectModalOpened}>변경</UpdateButton>
      {isModalOpened && <AddressManageModal onSelect={handleSelectedAddress} onClose={toggleIsSelectModalOpened} />}
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

const UpdateButton = styled.button`
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
