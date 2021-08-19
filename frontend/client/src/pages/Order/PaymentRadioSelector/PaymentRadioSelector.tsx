import { getPayments } from '@src/apis/paymentAPI';
import CheckButtonWithLabel from '@src/components/CheckButtonWithLabel/CheckButtonWithLabel';
import { Payment } from '@src/types/Payment';
import React, { useState } from 'react';
import { useEffect } from 'react';

interface Props {
  selectedPaymentId: number | null;
  onSelectPayment: (paymentId: number) => void;
}

const PaymentRadioSelector: React.FC<Props> = ({ selectedPaymentId, onSelectPayment }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    async function fetchPayments() {
      const { result } = await getPayments();
      setPayments(result);
      setIsFetched(true);
    }
    fetchPayments();
  }, []);

  if (!isFetched) {
    return null;
  }

  return (
    <>
      {payments.map(({ id, name, type }) => (
        <CheckButtonWithLabel
          key={id}
          isChecked={selectedPaymentId === id}
          onClick={() => {
            onSelectPayment(id);
          }}
          label={name}
          isCircle
        />
      ))}
    </>
  );
};

export default PaymentRadioSelector;
