import Button from '@src/components/PrimaryButton/PrimaryButton';
import ConfirmModal from '@src/components/ConfirmModal/ConfirmModal';
import { AddressInfo } from '@src/types/Address';
import React, { useState } from 'react';
import styled from 'styled-components';
import AddressCard from '@src/components/AddressCard/AddressCard';

interface Props {
  addressList: AddressInfo[];
  disabled?: boolean;
  onSelect?: (address: AddressInfo) => void;
  onDelete?: (addressId: number) => void;
  onGoToCreate?: () => void;
  onGoToUpdate?: (addressId: number) => void;
}

const AddressSelectPage: React.FC<Props> = ({
  addressList,
  disabled,
  onSelect,
  onDelete,
  onGoToCreate,
  onGoToUpdate,
}) => {
  const [deleteTargetId, setDeleteTargetId] = useState<null | number>(null);

  return (
    <Wrapper>
      <AddressInfoList>
        {addressList.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onClick={() => {
              onSelect?.(address);
            }}
            onDelete={() => {
              setDeleteTargetId(address.id);
            }}
            onEdit={() => {
              onGoToUpdate?.(address.id);
            }}
            disabled={disabled}
          />
        ))}
      </AddressInfoList>
      {deleteTargetId !== null && (
        <ConfirmModal
          onConfirm={() => {
            onDelete?.(deleteTargetId);
          }}
          onCancel={() => {
            setDeleteTargetId(null);
          }}
        >
          <pre>배송지를 삭제하시겠습니까?</pre>
        </ConfirmModal>
      )}
      <Button onClick={onGoToCreate} disabled={disabled}>
        신규 배송지 추가하기
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 600px;
  position: relative;
`;

const AddressInfoList = styled.div`
  max-height: 400px;
  overflow-y: scroll;
  margin-bottom: 20px;
`;

export default AddressSelectPage;
