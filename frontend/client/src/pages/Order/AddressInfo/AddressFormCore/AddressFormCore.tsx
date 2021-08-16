import CheckButtonWithLabel from '@src/components/CheckButtonWithLabel/CheckButtonWithLabel';
import Input from '@src/components/Input/Input';
import { AddressCore } from '@src/types/Address';
import React, { useState } from 'react';

interface Props {
  address: AddressCore;
  onChangeAddress?: (address: AddressCore) => void;
}

const AddressFormCore: React.FC<Props> = ({ address, onChangeAddress }) => {
  const { name, receiver, zipCode, address: mainAddress, subAddress, isDefault } = address;

  return (
    <>
      <Input
        value={name}
        onChange={(event) => {
          onChangeAddress?.({ ...address, name: event.target.value });
        }}
      />
      <Input
        value={receiver}
        onChange={(event) => {
          onChangeAddress?.({ ...address, receiver: event.target.value });
        }}
      />
      <Input
        value={zipCode}
        onChange={(event) => {
          onChangeAddress?.({ ...address, zipCode: event.target.value });
        }}
      />
      <Input
        value={mainAddress}
        onChange={(event) => {
          onChangeAddress?.({ ...address, address: event.target.value });
        }}
      />
      <Input
        value={subAddress}
        onChange={(event) => {
          onChangeAddress?.({ ...address, subAddress: event.target.value });
        }}
      />
      <CheckButtonWithLabel
        isChecked={isDefault}
        onClick={() => {
          onChangeAddress?.({ ...address, isDefault: !address.isDefault });
        }}
        label='기본 배송지로 설정'
      />
    </>
  );
};

export default AddressFormCore;
