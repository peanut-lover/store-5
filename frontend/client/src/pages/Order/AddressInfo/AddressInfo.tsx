import Button from '@src/components/Button/Button';
import CheckButtonWithLabel from '@src/components/CheckButtonWithLabel/CheckButtonWithLabel';
import Input from '@src/components/Input/Input';
import { Address } from '@src/types/Address';
import React from 'react';
import styled from 'styled-components';
import AddressCard from './AddressCard/AddressCard';
import AddressSelectModal from './AddressSelectModal/AddressSelectModal';

interface Props {}

const mock: Address[] = [
  {
    id: 3,
    name: '집',
    receiver: '신어진',
    zipCode: '1234',
    address: '대구 광역시 북구',
    subAddress: '3층',
    isDefault: true,
  },
  {
    id: 4,
    name: '회사',
    receiver: '신어진',
    zipCode: '12234',
    address: '대구 광역시 북구',
    subAddress: '5층',
    isDefault: false,
  },
  {
    id: 5,
    name: '회사',
    receiver: '신어진',
    zipCode: '12234',
    address: '대구 광역시 북구',
    subAddress: '5층',
    isDefault: false,
  },
];

const AddressInfo: React.FC<Props> = ({}) => {
  return <AddressSelectModal addressList={mock} />;
};

// const AddressInfo: React.FC<Props> = ({}) => {
//   return (
//     <Wrapper>
//       <Section>
//         <Label>받으실 분</Label>
//         <Content>
//           <Input placeholder='최대 30자 입력 가능합니다.' />
//         </Content>
//       </Section>
//       <Section>
//         <Label>연락처</Label>
//         <Content>
//           <Input placeholder='예시) 010-0000-0000' />
//         </Content>
//       </Section>
//       <Section>
//         <Label>배송지</Label>
//         <Content>
//           <FlexColumn>
//             <Input placeholder='우편번호' />
//             <Input placeholder='주소' />
//             <Input placeholder='상세주소' />
//           </FlexColumn>
//         </Content>
//       </Section>
//       <Section>
//         <Label>배송메모</Label>
//         <Content>
//           <Input placeholder='(선택) 배송메모를 입력하세요.' />
//         </Content>
//       </Section>
//       <CheckButtonWithLabel isChecked={false} onClick={() => {}} label={'기본 배송지로 저장'} />
//       <Button>저장하기</Button>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   margin: 1rem 0;
// `;

// const FlexColumn = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 0.25rem;
// `;

// const Section = styled.div`
//   display: flex;
// `;

// const Label = styled.span`
//   flex: 1;
//   margin-top: 0.375rem;
// `;

// const Content = styled.span`
//   flex: 7;
// `;

export default AddressInfo;
