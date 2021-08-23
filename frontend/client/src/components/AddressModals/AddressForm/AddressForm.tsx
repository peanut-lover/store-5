import Button from '@src/components/PrimaryButton/PrimaryButton';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';
import { AddressCore } from '@src/types/Address';
import React, { useState } from 'react';
import styled from 'styled-components';
import AddressFormCore, {
  MAX_ADDRESS_LENGTH,
  MAX_NAME_LENGTH,
  MAX_RECEIVER_LENGTH,
  MAX_SUB_ADDRESS_LENGTH,
  MAX_ZIP_CODE_LENGTH,
} from '../AddressFormCore/AddressFormCore';

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

const WARNING_COLOR = '#FF0000';

const NOTIFICATION_EMPTY_NAME = '배송지 이름을 입력해주세요';
const NOTIFICATION_EMPTY_RECEIVER = '받으실 분을 입력해주세요';
const NOTIFICATION_EMPTY_ZIP_CODE = '우편번호를 입력해주세요';
const NOTIFICATION_EMPTY_ADDRESS = '주소를 입력해주세요';
const NOTIFICATION_EMPTY_SUB_ADDRESS = '상세주소를 입력해주세요';

const NOTIFICATION_TOO_LONG_NAME = `배송지 이름은 ${MAX_NAME_LENGTH}글자까지 입력할 수 있습니다`;
const NOTIFICATION_TOO_LONG_RECEIVER = `받으실 분은 ${MAX_RECEIVER_LENGTH}글자까지 입력할 수 있습니다`;
const NOTIFICATION_TOO_LONG_ZIP_CODE = `우편번호는 ${MAX_ZIP_CODE_LENGTH}글자까지 입력할 수 있습니다`;
const NOTIFICATION_TOO_LONG_ADDRESS = `주소는 ${MAX_ADDRESS_LENGTH}글자까지 입력할 수 있습니다`;
const NOTIFICATION_TOO_LONG_SUB_ADDRESS = `상세주소는 ${MAX_SUB_ADDRESS_LENGTH}글자까지 입력할 수 있습니다`;

const AddressForm: React.FC<Props> = ({ initialAddress, onSubmit, onCancel, disabled }) => {
  const [address, setAddress] = useState(initialAddress ?? defaultAddress);
  const pushToast = usePushToast();

  const onClickSubmitButton = () => {
    const { name, receiver, zipCode, address: mainAddress, subAddress } = address;

    if (!name) return pushToast({ text: NOTIFICATION_EMPTY_NAME, color: WARNING_COLOR });
    if (name.length > MAX_NAME_LENGTH) return pushToast({ text: NOTIFICATION_TOO_LONG_NAME, color: WARNING_COLOR });
    if (!receiver) return pushToast({ text: NOTIFICATION_EMPTY_RECEIVER, color: WARNING_COLOR });
    if (receiver.length > MAX_RECEIVER_LENGTH)
      return pushToast({ text: NOTIFICATION_TOO_LONG_RECEIVER, color: WARNING_COLOR });
    if (!zipCode) return pushToast({ text: NOTIFICATION_EMPTY_ZIP_CODE, color: WARNING_COLOR });
    if (zipCode.length > MAX_ZIP_CODE_LENGTH)
      return pushToast({ text: NOTIFICATION_TOO_LONG_ZIP_CODE, color: WARNING_COLOR });
    if (!mainAddress) return pushToast({ text: NOTIFICATION_EMPTY_ADDRESS, color: WARNING_COLOR });
    if (mainAddress.length > MAX_ADDRESS_LENGTH)
      return pushToast({ text: NOTIFICATION_TOO_LONG_ADDRESS, color: WARNING_COLOR });
    if (!subAddress) return pushToast({ text: NOTIFICATION_EMPTY_SUB_ADDRESS, color: WARNING_COLOR });
    if (subAddress.length > MAX_SUB_ADDRESS_LENGTH)
      return pushToast({ text: NOTIFICATION_TOO_LONG_SUB_ADDRESS, color: WARNING_COLOR });

    onSubmit?.(address);
  };

  return (
    <Wrapper>
      <AddressFormCore address={address} onChangeAddress={setAddress} disabled={disabled} />
      <FlexRow>
        {onCancel && (
          <Button disabled={disabled} onClick={onCancel} fullWidth>
            취소
          </Button>
        )}
        <Button onClick={onClickSubmitButton} disabled={disabled} fullWidth>
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
  gap: 1rem;
`;

export default AddressForm;
