import Button from '@src/components/PrimaryButton/PrimaryButton';
import { AddressCore } from '@src/types/Address';
import React, { useState } from 'react';
import styled from 'styled-components';
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
    <Wrapper>
      <AddressFormCore address={address} onChangeAddress={setAddress} disabled={disabled} />
      <FlexRow>
        {onCancel && (
          <Button disabled={disabled} onClick={onCancel} fullWidth>
            취소
          </Button>
        )}
        <Button
          onClick={() => {
            onSubmit?.(address);
          }}
          disabled={disabled}
          fullWidth
        >
          완료
        </Button>
      </FlexRow>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
`;

export default AddressForm;
