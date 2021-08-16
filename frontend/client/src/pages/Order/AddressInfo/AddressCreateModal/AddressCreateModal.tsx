import { Address, AddressCore } from '@src/types/Address';
import React, { useState } from 'react';
import AddressForm from '../AddressForm/AddressForm';
import Modal from '../Modal/Modal';

interface Props {
  onClose?: () => void;
  onSelect?: (address: Address) => void;
}

const mock: Address = {
  id: 4,
  name: '회사',
  receiver: '신어진',
  zipCode: '12234',
  address: '대구 광역시 북구',
  subAddress: '302호',
  isDefault: false,
};

const AddressCreateModal: React.FC<Props> = ({ onClose, onSelect }) => {
  const [disabled, setDisabled] = useState(false);

  // TODO: api 대응 수정하기
  const handleSubmit = (address: AddressCore) => {
    setDisabled(true);
    // await createAddress(address);
    // setDisabled(false);
    setTimeout(() => {
      onSelect?.(mock);
      onClose?.();
    }, 1500);
  };

  return (
    <Modal title='배송지 등록' onClose={onClose} disabled={disabled}>
      <AddressForm onSubmit={handleSubmit} disabled={disabled} />
    </Modal>
  );
};

export default AddressCreateModal;
