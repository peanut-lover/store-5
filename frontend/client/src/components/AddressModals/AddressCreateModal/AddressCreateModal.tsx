import { AddressInfo, AddressCore } from '@src/types/Address';
import { AddressAPI } from '@src/apis/addressAPI';
import React, { useState } from 'react';
import AddressForm from '../AddressForm/AddressForm';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';

interface Props {
  onClose?: () => void;
  onSelect?: (address: AddressInfo) => void;
}

const AddressCreateModal: React.FC<Props> = ({ onClose, onSelect }) => {
  const [disabled, setDisabled] = useState(false);
  const pushToast = usePushToast();

  const handleSubmit = async (address: AddressCore) => {
    setDisabled(true);
    try {
      const { result } = await AddressAPI.createAddress(address);
      onSelect?.(result);
    } catch (err) {
      pushToast({ text: '정보 업데이트에 실패했습니다.' });

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
