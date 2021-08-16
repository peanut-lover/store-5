import Button from '@src/components/Button/Button';
import { AddressCore } from '@src/types/Address';
import React, { useState } from 'react';
import AddressFormCore from '../AddressFormCore/AddressFormCore';

interface Props {
  initialAddress?: AddressCore;
  disabled?: boolean;
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

const AddressForm: React.FC<Props> = ({ initialAddress, onSubmit, onCancel, disabled }) => {
  const [address, setAddress] = useState(initialAddress ?? defaultAddress);

  return (
    <>
      <AddressFormCore address={address} onChangeAddress={setAddress} disabled={disabled} />
      <Button
        onClick={() => {
          onSubmit?.(address);
        }}
        disabled={disabled}
      >
        완료
      </Button>
      {onCancel && (
        <Button disabled={disabled} onClick={onCancel}>
          취소
        </Button>
      )}
    </>
  );
};

export default AddressForm;
