import { AddressCore } from '@src/types/Address';
import React from 'react';
import AddressForm from '../../AddressForm/AddressForm';

interface Props {
  disabled?: boolean;
  onCreate?: (address: AddressCore) => void;
  onCancel?: () => void;
}

const AddressCreatePage: React.FC<Props> = ({ disabled, onCreate, onCancel }) => {
  return <AddressForm onSubmit={onCreate} onCancel={onCancel} disabled={disabled} />;
};

export default AddressCreatePage;
