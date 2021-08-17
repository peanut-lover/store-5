import { AddressInfo, AddressCore } from '@src/types/Address';
import React, { useState } from 'react';
import AddressForm from '../AddressForm/AddressForm';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';

interface Props {
  onClose?: () => void;
  onCreate?: (address: AddressInfo) => void;
}

const mock: AddressInfo = {
  id: 4,
  name: '회사',
  receiver: '신어진',
  zipCode: '12234',
  address: '대구 광역시 북구',
  subAddress: '302호',
  isDefault: false,
};

const AddressCreateModal: React.FC<Props> = ({ onClose, onCreate }) => {
  const [disabled, setDisabled] = useState(false);

  // TODO: api 대응 수정하기
  const handleSubmit = async (address: AddressCore) => {
    setDisabled(true);
    // await createAddress(address);
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1500);
    });
    // setDisabled(false);
    onCreate?.(mock);
    onClose?.();
  };

  return (
    <Modal title='배송지 등록' onClose={onClose} disabled={disabled}>
      <AddressForm onSubmit={handleSubmit} disabled={disabled} />
      {disabled && <Loading />}
    </Modal>
  );
};

export default AddressCreateModal;
