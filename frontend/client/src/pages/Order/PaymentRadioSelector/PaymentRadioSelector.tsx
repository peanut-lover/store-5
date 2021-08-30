import React, { useState, useEffect } from 'react';
import { getPayments } from '@src/apis/paymentAPI';
import CheckButtonWithLabel from '@src/components/CheckButtonWithLabel/CheckButtonWithLabel';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';
import { Payment } from '@src/types/Payment';

const SERVER_ERROR_MSG = '결제 수단 리스트를 가져오는데 실패했습니다.';

interface Props {
  selectedPaymentId: number | null;
  onSelectPayment: (paymentId: number) => void;
}

const PaymentRadioSelector: React.FC<Props> = ({ selectedPaymentId, onSelectPayment }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const pushToast = usePushToast();

  useEffect(() => {
    async function fetchPayments() {
      try {
        const { result } = await getPayments();
        setPayments(result);
        setIsFetched(true);
      } catch (err) {
        pushToast({ text: SERVER_ERROR_MSG });
        console.error(err);
      }
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
