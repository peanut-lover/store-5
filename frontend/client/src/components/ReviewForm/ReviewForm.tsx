import ReviewFormContents from '@src/components/ReviewForm/ReviewFormContents/ReviewFormContents';
import ReviewFormFooter from '@src/components/ReviewForm/ReviewFormFooter/ReviewFormFooter';
import ReviewFormHeader from '@src/components/ReviewForm/ReviewFormHeader/ReviewFormHeader';
import ReviewFormImage from '@src/components/ReviewForm/ReviewFormImage/ReviewFormImage';
import ReviewFormRate from '@src/components/ReviewForm/ReviewFormRate/ReviewFormRate';
import useInput from '@src/hooks/useInput';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

interface Props {
  goodsId: number;
  thumbnail?: string;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  // TODO: Content 내용 Type화
  prevContents?: string;
}

const ReviewForm: React.FC<Props> = ({ thumbnail, goodsId, title, onClose, onSubmit, prevContents }) => {
  const [contents, handleChangeContents] = useInput('');
  const [files, setFiles] = useState<File[]>([]); // 이미지 file 저장
  const [rate, setRate] = useState<number>(5);

  const handleUpdateFiles = useCallback(
    (newFiles: File[]) => {
      setFiles((prev) => {
        return [...prev, ...newFiles];
      });
    },
    [setFiles]
  );

  const handleDeleteFile = useCallback(
    (index: number) => {
      setFiles((prev) => prev.filter((f, i) => i !== index));
    },
    [setFiles]
  );

  const handleChangeRate = useCallback(
    (rate: number) => {
      setRate(rate);
    },
    [setRate]
  );

  return (
    <ReviewFormContainer>
      <ReviewFormHeader onClose={onClose} />
      <ReviewFormRate rate={rate} thumbnail={thumbnail} title={title} onHandleRate={handleChangeRate} />
      <ReviewFormImage />
      <ReviewFormContents />
      <ReviewFormFooter />
    </ReviewFormContainer>
  );
};

const ReviewFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;

export default ReviewForm;
