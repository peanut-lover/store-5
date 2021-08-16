import Button from '@src/components/Button/Button';
import { AddressCore } from '@src/types/Address';
import React, { useState } from 'react';
import AddressFormCore from '../AddressFormCore/AddressFormCore';

interface Props {
  initialAddress?: AddressCore;
  onSubmit?: (address: AddressCore) => void;
  onCancel?: () => void;
}

const defaultAddress: AddressCore = {
  name: '',
  receiver: '',
  zipCode: '',
  address: '',
  subAddress: '',
  isDefault: false,
};

const AddressForm: React.FC<Props> = ({ initialAddress, onSubmit, onCancel }) => {
  const [address, setAddress] = useState(initialAddress ?? defaultAddress);

  return (
    <>
      <AddressFormCore address={address} onChangeAddress={setAddress} />
      <Button
        onClick={() => {
          onSubmit?.(address);
        }}
      >
        완료
      </Button>
      {onCancel && <Button onClick={onCancel}>취소</Button>}
    </>
  );
};

export default AddressForm;
