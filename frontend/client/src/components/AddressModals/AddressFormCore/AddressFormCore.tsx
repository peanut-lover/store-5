import CheckButtonWithLabel from '@src/components/CheckButtonWithLabel/CheckButtonWithLabel';
import Input from '@src/components/Input/Input';
import { AddressCore } from '@src/types/Address';
import React from 'react';
import styled from 'styled-components';

interface Props {
  address: AddressCore;
  disabled?: boolean;
  onChangeAddress?: (address: AddressCore) => void;
}

const AddressFormCore: React.FC<Props> = ({ address, onChangeAddress, disabled }) => {
  const { name, receiver, zipCode, address: mainAddress, subAddress, isDefault } = address;

  return (
    <Wrapper>
      <Section>
        <Label>배송지 이름</Label>
        <Content>
          <Input
            placeholder='최대 30자 입력 가능합니다.'
            value={name}
            disabled={disabled}
            onChange={(event) => {
              onChangeAddress?.({ ...address, name: event.target.value });
            }}
          />
        </Content>
      </Section>

      <Section>
        <Label>받으실 분</Label>
        <Content>
          <Input
            placeholder='최대 30자 입력 가능합니다.'
            value={receiver}
            disabled={disabled}
            onChange={(event) => {
              onChangeAddress?.({ ...address, receiver: event.target.value });
            }}
          />
        </Content>
      </Section>

      <Section>
        <Label>배송지</Label>
        <Content>
          <FlexColumn>
            <Input
              placeholder='우편번호'
              value={zipCode}
              disabled={disabled}
              onChange={(event) => {
                onChangeAddress?.({ ...address, zipCode: event.target.value });
              }}
            />
            <Input
              placeholder='주소'
              value={mainAddress}
              disabled={disabled}
              onChange={(event) => {
                onChangeAddress?.({ ...address, address: event.target.value });
              }}
            />
            <Input
              placeholder='상세주소'
              value={subAddress}
              disabled={disabled}
              onChange={(event) => {
                onChangeAddress?.({ ...address, subAddress: event.target.value });
              }}
            />
          </FlexColumn>
        </Content>
      </Section>

      <Section>
        <CheckButtonWithLabel
          isChecked={isDefault}
          disabled={disabled}
          onClick={() => {
            onChangeAddress?.({ ...address, isDefault: !address.isDefault });
          }}
          label='기본 배송지로 설정'
        />
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

const Section = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Label = styled.span`
  flex: 1;
  margin-top: 0.375rem;
`;

const Content = styled.span`
  flex: 3;
`;

export default AddressFormCore;
