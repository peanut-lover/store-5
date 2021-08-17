import { getDeliveryInfos } from '@src/apis/deliveryAPI';
import { styled } from '@src/lib/CustomStyledComponent';
import { UploaderLabel } from '@src/portal/ProductUploadModal/UploadContentLeft/style';
import { DeliveryInfo } from '@src/types/DeliveryInfo';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
interface Props {
  onHandleDeliveryInfo: (id: number) => void;
}

const ProductDeliveryUploader: React.FC<Props> = ({ onHandleDeliveryInfo }) => {
  const [deliveryInfos, setDeliveryInfos] = useState<DeliveryInfo[]>([]);

  const handleDeliveryInfo = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const id = deliveryInfos.find((info) => info.name === e.target.value)?.id;
      if (id) onHandleDeliveryInfo(id);
    },
    [onHandleDeliveryInfo]
  );

  useEffect(() => {
    const updateDeliveryInfos = async () => {
      const { result } = await getDeliveryInfos();
      setDeliveryInfos(result);
      if (result.length > 0) onHandleDeliveryInfo(result[0].id);
    };
    updateDeliveryInfos();
  }, []);
  return (
    <>
      <UploaderLabel>배송 정보</UploaderLabel>
      <DeliveryInfoSelect onChange={handleDeliveryInfo}>
        {deliveryInfos.map((info, i) => (
          <option key={i} value={info.name}>
            {info.name}
          </option>
        ))}
      </DeliveryInfoSelect>
    </>
  );
};

const DeliveryInfoSelect = styled('select')`
  width: 60%;
  margin-bottom: 24px;
`;
export default ProductDeliveryUploader;
