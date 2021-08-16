import CheckButtonWithLabel from '@src/components/CheckButtonWithLabel/CheckButtonWithLabel';
import Input from '@src/components/Input/Input';
import { AddressCore } from '@src/types/Address';
import React from 'react';

interface Props {
  address: AddressCore;
  disabled?: boolean;
  onChangeAddress?: (address: AddressCore) => void;
}

const AddressFormCore: React.FC<Props> = ({ address, onChangeAddress, disabled }) => {
  const { name, receiver, zipCode, address: mainAddress, subAddress, isDefault } = address;

  return (
    <>
      <Input
        value={name}
        disabled={disabled}
        onChange={(event) => {
          onChangeAddress?.({ ...address, name: event.target.value });
        }}
      />
      <Input
        value={receiver}
        disabled={disabled}
        onChange={(event) => {
          onChangeAddress?.({ ...address, receiver: event.target.value });
        }}
      />
      <Input
        value={zipCode}
        disabled={disabled}
        onChange={(event) => {
          onChangeAddress?.({ ...address, zipCode: event.target.value });
        }}
      />
      <Input
        value={mainAddress}
        disabled={disabled}
        onChange={(event) => {
          onChangeAddress?.({ ...address, address: event.target.value });
        }}
      />
      <Input
        value={subAddress}
        disabled={disabled}
        onChange={(event) => {
          onChangeAddress?.({ ...address, subAddress: event.target.value });
        }}
      />
      <CheckButtonWithLabel
        isChecked={isDefault}
        disabled={disabled}
        onClick={() => {
          onChangeAddress?.({ ...address, isDefault: !address.isDefault });
        }}
        label='기본 배송지로 설정'
      />
    </>
  );
};

export default AddressFormCore;
