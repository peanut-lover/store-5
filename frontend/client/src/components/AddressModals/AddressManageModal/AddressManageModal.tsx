import React, { useEffect, useState } from 'react';
import { AddressInfo, AddressCore } from '@src/types/Address';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';
import AddressCreatePage from './AddressCreatePage/AddressCreatePage';
import AddressSelectPage from './AddressSelectPage/AddressSelectPage';
import AddressUpdatePage from './AddressUpdatePage/AddressUpdatePage';

interface Props {
  onClose?: () => void;
  onSelect?: (address: AddressInfo) => void;
}

const mock: AddressInfo[] = [
  {
    id: 3,
    name: '집',
    receiver: '신어진',
    zipCode: '1234',
    address: '대구 광역시 북구',
    subAddress: '301호',
    isDefault: true,
  },
  {
    id: 4,
    name: '회사',
    receiver: '신어진',
    zipCode: '12234',
    address: '대구 광역시 북구',
    subAddress: '302호',
    isDefault: false,
  },
];

interface AddressModalPage {
  title: string;
  component: any; // React.FC;
}

const defaultPage: AddressModalPage = {
  title: '배송지 조회',
  component: () => {
    return <></>;
  },
};

const AddressManageModal: React.FC<Props> = ({ onClose, onSelect }) => {
  const [disabled, setDisabled] = useState(false);
  const [page, setPage] = useState<AddressModalPage>(defaultPage);

  const handleSelect = (address: AddressInfo) => {
    onSelect?.(address);
    onClose?.();
  };

  const handleCreate = async (address: AddressCore) => {
    setDisabled(true);
    // await
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1500);
    });
    setDisabled(false);
    handleGoToSelect();
  };

  const handleUpdate = async (addressId: number, address: AddressCore) => {
    setDisabled(true);
    // await
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1500);
    });
    setDisabled(false);
    handleGoToSelect();
  };

  const handleDelete = async (addressId: number) => {
    setDisabled(true);
    // await
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1500);
    });
    setDisabled(false);
    handleGoToSelect();
  };

  const handleGoToSelect = async () => {
    setDisabled(true);
    // await
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1500);
    });
    setPage({ title: '배송지 조회', component: AddressSelectPage });
    setDisabled(false);
  };

  const handleGoToCreate = async () => {
    setPage({ title: '배송지 추가', component: AddressCreatePage });
  };

  const handleGoToUpdate = async (addressId: number) => {
    setDisabled(true);
    // await
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1500);
    });
    setDisabled(false);
    setPage({ title: '배송지 수정', component: AddressUpdatePage });
  };

  useEffect(() => {
    handleGoToSelect();
  }, []);

  const Page = page.component;

  return (
    <Modal title={page.title} onClose={onClose} disabled={disabled}>
      <Page
        addressList={mock}
        address={mock[0]}
        disabled={disabled}
        onSelect={handleSelect}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onCancel={handleGoToSelect}
        onGoToCreate={handleGoToCreate}
        onGoToUpdate={handleGoToUpdate}
      />
      {disabled && <Loading />}
    </Modal>
  );
};

export default AddressManageModal;
