import { AddressInfo, AddressCore } from '@src/types/Address';
import React from 'react';
import AddressForm from '../../AddressForm/AddressForm';

interface Props {
  address: AddressInfo;
  disabled?: boolean;
  onUpdate?: (addressId: number, address: AddressCore) => void;
  onCancel?: () => void;
}

const AddressUpdatePage: React.FC<Props> = ({ disabled, onUpdate, onCancel, address }) => {
  const handleUpdate = (changedAddress: AddressCore) => {
    onUpdate?.(address.id, changedAddress);
  };

  return <AddressForm initialAddress={address} onSubmit={handleUpdate} onCancel={onCancel} disabled={disabled} />;
};

export default AddressUpdatePage;
