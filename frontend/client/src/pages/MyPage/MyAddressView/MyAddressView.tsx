import { AddressAPI } from '@src/apis/addressAPI';
import PrimaryButton from '@src/components/PrimaryButton/PrimaryButton';
import AddressCard from '@src/components/AddressCard/AddressCard';
import Topic from '@src/components/Topic/Topic';
import { AddressInfo } from '@src/types/Address';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddressCreateModal from '@src/components/AddressModals/AddressCreateModal/AddressCreateModal';

const MyAddressView = () => {
  const [addresses, setAddresses] = useState<AddressInfo[]>([]);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleIsSelectModalOpened = () => {
    setIsModalOpened(!isModalOpened);
  };

  async function fetchAddresses() {
    const { result } = await AddressAPI.getAddresses();
    setAddresses(result);
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <AddressInfoList>
      <Topic>배송지 정보</Topic>
      <PrimaryButton onClick={toggleIsSelectModalOpened}>배송지 추가하기</PrimaryButton>
      {isModalOpened && <AddressCreateModal onCreate={() => {}} onClose={toggleIsSelectModalOpened} />}

      {addresses.map((address, idx) => (
        <AddressInfoListItem key={idx}>
          <AddressCard address={address} />
        </AddressInfoListItem>
      ))}
    </AddressInfoList>
  );
};

const AddressInfoList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const AddressInfoListItem = styled.li`
  display: flex;
  border: 1px solid black;
  margin-top: 1rem;
`;

export default MyAddressView;
