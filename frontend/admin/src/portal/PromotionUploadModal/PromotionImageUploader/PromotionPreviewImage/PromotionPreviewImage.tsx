import { styled } from '@src/lib/CustomStyledComponent';
import React from 'react';

interface Props {
  url: string;
}

const PromotionPreviewImage: React.FC<Props> = ({ url }) => {
  return <PreviewImage src={url} />;
};

const PreviewImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export default PromotionPreviewImage;
