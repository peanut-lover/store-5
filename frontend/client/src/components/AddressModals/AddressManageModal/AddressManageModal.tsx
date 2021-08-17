import React, { useEffect, useState } from 'react';
import { AddressAPI } from '@src/apis/addressAPI';
import { AddressInfo, AddressCore } from '@src/types/Address';
import AddressCreatePage from './AddressCreatePage/AddressCreatePage';
import AddressSelectPage from './AddressSelectPage/AddressSelectPage';
import AddressUpdatePage from './AddressUpdatePage/AddressUpdatePage';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';

interface Props {
  onClose?: () => void;
  onSelect?: (address: AddressInfo) => void;
}

interface AddressModalPage {
  title: string;
  component: any; // React.FC;
  address?: AddressInfo;
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
  const [addresses, setAddresses] = useState<AddressInfo[]>([]);

  const handleSelect = (address: AddressInfo) => {
    onSelect?.(address);
    onClose?.();
  };

  const handleCreate = async (address: AddressCore) => {
    setDisabled(true);
    try {
      await AddressAPI.createAddress(address);
      setDisabled(false);
      handleGoToSelectPage();
    } catch (err) {
      alert('서버 문제로 정보업데이트에 실패했습니다.');
      console.error(err);
    }
  };

  const handleUpdate = async (addressId: number, address: AddressCore) => {
    setDisabled(true);
    try {
      await AddressAPI.updateAddress(addressId, address);
      setDisabled(false);
      handleGoToSelectPage();
    } catch (err) {
      console.error(err);
      alert('서버에서 Address를 업데이트하는데 실패했습니다.');
      onClose?.();
    }
  };

  const handleDelete = async (addressId: number) => {
    setDisabled(true);
    try {
      await AddressAPI.deleteAddress(addressId);
      setDisabled(false);
      handleGoToSelectPage();
    } catch (err) {
      console.error(err);
      alert('서버에서 Address를 삭제하는데 실패했습니다.');
      onClose?.();
    }
  };

  const handleGoToSelectPage = async () => {
    setDisabled(true);
    try {
      const { result } = await AddressAPI.getAddresses();
      setAddresses(result);
      setPage({ title: '배송지 조회', component: AddressSelectPage });
      setDisabled(false);
    } catch (err) {
      console.error(err);
      alert('서버에서 Address를 가져오는데 실패했습니다.');
      onClose?.();
    }
  };

  const handleGoToCreatePage = async () => {
    setPage({ title: '배송지 추가', component: AddressCreatePage });
  };

  const handleGoToUpdatePage = async (addressId: number) => {
    setDisabled(true);
    try {
      const { result } = await AddressAPI.getAddressById(addressId);
      setDisabled(false);
      setPage({ title: '배송지 수정', component: AddressUpdatePage, address: result });
    } catch (err) {
      console.error(err);
      alert('서버에서 Address를 가져오는데 실패했습니다.');
      onClose?.();
    }
  };

  useEffect(() => {
    handleGoToSelectPage();
  }, []);

  const Page = page.component;
  const targetAddress = page.address;
  const defaultAddress = addresses.find((address) => address.isDefault);
  const anotherAddresses = addresses.filter((addresses) => !addresses.isDefault);
  const resortedAddress = defaultAddress ? [defaultAddress, ...anotherAddresses] : anotherAddresses;
  return (
    <Modal title={page.title} onClose={onClose} disabled={disabled}>
      <Page
        addressList={resortedAddress}
        address={targetAddress}
        disabled={disabled}
        onSelect={handleSelect}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onCancel={handleGoToSelectPage}
        onGoToCreate={handleGoToCreatePage}
        onGoToUpdate={handleGoToUpdatePage}
      />
      {disabled && <Loading />}
    </Modal>
  );
};

export default AddressManageModal;
