import { AddressAPI } from '@src/apis/addressAPI';
import React, { useEffect, useState } from 'react';

const MyPage = () => {
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    async function updateAddresses() {
      const res = await AddressAPI.getAddresses();
      setAddresses(res.result);
    }
    updateAddresses();
  }, []);
  return (
    <div>
      {addresses.map((item: { address: string }, i) => (
        <li key={i}>{item.address}</li>
      ))}
    </div>
  );
};

export default MyPage;
