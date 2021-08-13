import Button from '@src/components/Button/Button';
import { Address } from '@src/types/Address';
import { FiX } from 'react-icons/fi';
import React from 'react';
import styled from 'styled-components';
import AddressCard from '../AddressCard/AddressCard';
import { useRef } from 'react';
import Portal from '@src/portal/portal';

interface Props {
  addressList: Address[];
  onSelect: (addressId: number) => void;
  onCancel: () => void;
}

// TODO: 노데이터
const AddressSelectModal: React.FC<Props> = ({ addressList, onSelect, onCancel }) => {
  const dim = useRef(null);

  return (
    <Portal>
      <ModalDim
        ref={dim}
        onClick={(e) => {
          if (e.target === dim.current) onCancel();
        }}
      >
        <Wrapper>
          {/* 모달바 */}
          <ModalBar>
            <FlexCenter>배송지 선택</FlexCenter>
            <FlexRight>
              <IconButton onClick={onCancel}>
                <FiX size='1.5rem' />
              </IconButton>
            </FlexRight>
          </ModalBar>
          {/* 콘텐츠 */}
          <Content>
            {addressList.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onClick={() => {
                  onSelect(address.id);
                  onCancel();
                }}
                onDelete={() => {}}
                onEdit={() => {}}
              />
            ))}
            <Button onClick={() => {}}>신규 배송지 추가하기</Button>
          </Content>
        </Wrapper>
      </ModalDim>
    </Portal>
  );
};

const ModalDim = styled.div`
  position: fixed;
  z-index: 1000;
  text-align: center;
  background-color: #00000020;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Wrapper = styled.div`
  text-align: left;
  font-family: initial;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 360px;
  transform: translate(-50%, -50%);
  margin: auto;
  background-color: white;
  overflow: hidden;
`;

const ModalBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bolder;
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;

  ::before {
    content: '';
    flex: 1;
  }
`;

const FlexCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const FlexRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const IconButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-height: 360px;
  overflow-y: auto;
  background-color: #f5f5f5;
`;

export default AddressSelectModal;
