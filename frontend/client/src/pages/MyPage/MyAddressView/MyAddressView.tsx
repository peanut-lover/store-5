import { AddressAPI } from '@src/apis/addressAPI';
import PrimaryButton from '@src/components/PrimaryButton/PrimaryButton';
import AddressCard from '@src/components/AddressCard/AddressCard';
import Topic from '@src/components/Topic/Topic';
import { AddressInfo } from '@src/types/Address';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddressCreateModal from '@src/components/AddressModals/AddressCreateModal/AddressCreateModal';
import AddressManageModal from '@src/components/AddressModals/AddressManageModal/AddressManageModal';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';
import emptyImgUrl from '@src/assets/empty-img.png';

const MyAddressView = () => {
  const [addresses, setAddresses] = useState<AddressInfo[]>([]);
  const [isOpenManageModal, setIsOpenManageModal] = useState(false);
  const pushToast = usePushToast();

  const toggleManageModal = () => {
    setIsOpenManageModal(!isOpenManageModal);
    fetchAddresses();
  };

  async function fetchAddresses() {
    try {
      const { result } = await AddressAPI.getAddresses();
      setAddresses(result);
    } catch (err) {
      console.error(err);
      pushToast({ text: '사용자 주소를 불러오는데 실패했습니다. 서버오류' });
    }
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  const defaultAddress = addresses.find((addressInfo) => addressInfo.isDefault) || addresses[0];

  return (
    <AddressInfoList>
      <Topic>배송지 정보</Topic>

      {addresses.length === 0 ? (
        <>
          <EmptyContainer>
            <EmptyImg src={emptyImgUrl} />
            <EmptyTitle>등록된 배송지가 없습니다.</EmptyTitle>
            <PrimaryButton onClick={toggleManageModal}>배송지 등록하기</PrimaryButton>
          </EmptyContainer>
          <AddressControlButtonContainer></AddressControlButtonContainer>
          {isOpenManageModal && <AddressCreateModal onClose={toggleManageModal} />}
        </>
      ) : (
        <>
          <AddressInfoListItem isPrimary>
            <AddressCard address={defaultAddress} />
          </AddressInfoListItem>
          <AddressControlButtonContainer>
            <PrimaryButton onClick={toggleManageModal}>배송지 수정하기</PrimaryButton>
          </AddressControlButtonContainer>
          {isOpenManageModal && <AddressManageModal onClose={toggleManageModal} />}
        </>
      )}
    </AddressInfoList>
  );
};

const AddressInfoList = styled.ul`
  display: flex;
  flex-direction: column;
  animation: fadeInEffect 0.5s 0s;
  @keyframes fadeInEffect {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const AddressControlButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  margin-bottom: 1rem;
  width: 32rem;
  border: 1px solid black;
`;

const EmptyImg = styled.img`
  height: 8rem;
`;

const EmptyTitle = styled.h2`
  margin: 0;
  padding: 0;
  color: #666;
  font-size: 1.25rem;
  font-weight: normal;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  margin-top: 4rem;
  margin-bottom: 4rem;
  margin-right: 8rem;
`;

export default MyAddressView;
