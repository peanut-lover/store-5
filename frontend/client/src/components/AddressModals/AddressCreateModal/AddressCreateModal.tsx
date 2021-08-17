import { AddressInfo, AddressCore } from '@src/types/Address';
import { AddressAPI } from '@src/apis/addressAPI';
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

  const handleSubmit = async (address: AddressCore) => {
    setDisabled(true);
    try {
      const { result } = await AddressAPI.createAddress(address);
      onCreate?.(result);
    } catch (err) {
      alert('서버 문제로 정보업데이트에 실패했습니다.');
      console.error(err);
    } finally {
      setDisabled(false);
      onClose?.();
    }
  };

  return (
    <Modal title='배송지 등록' onClose={onClose} disabled={disabled}>
      <AddressForm onSubmit={handleSubmit} disabled={disabled} />
      {disabled && <Loading />}
    </Modal>
  );
};

export default AddressCreateModal;
