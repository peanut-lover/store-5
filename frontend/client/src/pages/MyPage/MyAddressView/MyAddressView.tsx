import { AddressAPI } from '@src/apis/addressAPI';
import Topic from '@src/components/Topic/Topic';
import React, { useEffect, useState } from 'react';

const MyAddressView = () => {
  const [addresses, setAddresses] = useState([]);
  async function fetchAddresses() {
    const res = await AddressAPI.getAddresses();
    setAddresses(res.result);
  }
  useEffect(() => {
    fetchAddresses();
  }, []);
  return (
    <div>
      <Topic>배송지 정보</Topic>
      {addresses.map((item: { address: string }, i) => (
        <li key={i}>{item.address}</li>
      ))}
    </div>
  );
};

export default MyAddressView;
