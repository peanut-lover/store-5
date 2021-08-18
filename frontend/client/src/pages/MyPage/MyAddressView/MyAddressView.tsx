import { AddressAPI } from '@src/apis/addressAPI';
import PrimaryButton from '@src/components/PrimaryButton/PrimaryButton';
import AddressCard from '@src/components/AddressCard/AddressCard';
import Topic from '@src/components/Topic/Topic';
import { AddressInfo } from '@src/types/Address';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddressCreateModal from '@src/components/AddressModals/AddressCreateModal/AddressCreateModal';
import AddressManageModal from '@src/components/AddressModals/AddressManageModal/AddressManageModal';

const MyAddressView = () => {
  const [addresses, setAddresses] = useState<AddressInfo[]>([]);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenManageModal, setIsOpenManageModal] = useState(false);

  const toggleCreateModal = () => {
    setIsOpenCreateModal(!isOpenCreateModal);
    fetchAddresses();
  };

  const toggleManageModal = () => {
    setIsOpenManageModal(!isOpenManageModal);
    fetchAddresses();
  };

  async function fetchAddresses() {
    const { result } = await AddressAPI.getAddresses();
    setAddresses(result);
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  const defaultAddress = addresses.find((address) => address.isDefault);
  const optionalAddress = addresses.filter((address) => !address.isDefault);

  return (
    <AddressInfoList>
      <Topic>배송지 정보</Topic>

      <AddressControlButtonContainer>
        <PrimaryButton onClick={toggleCreateModal}>배송지 추가하기</PrimaryButton>
        <PrimaryButton onClick={toggleManageModal}>배송지 수정하기</PrimaryButton>
      </AddressControlButtonContainer>

      {isOpenCreateModal && <AddressCreateModal onClose={toggleCreateModal} />}
      {isOpenManageModal && <AddressManageModal onClose={toggleManageModal} />}

      <AddressInfoListItem isPrimary>
        {defaultAddress ? <AddressCard address={defaultAddress} /> : '기본 주소가 없습니다.'}
      </AddressInfoListItem>
    </AddressInfoList>
  );
};

const AddressControlButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddressInfoList = styled.ul`
  display: flex;
  flex-direction: column;
`;

interface AddressInfoListItem {
  theme: {
    darkPrimary: string;
  };
  isPrimary?: boolean;
}

const AddressInfoListItem = styled.li<AddressInfoListItem>`
  display: flex;
  margin-top: 1rem;
`;

export default MyAddressView;
