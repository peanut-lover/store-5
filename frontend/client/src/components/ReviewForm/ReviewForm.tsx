import ReviewAPI from '@src/apis/reviewAPI';
import ReviewFormContents from '@src/components/ReviewForm/ReviewFormContents/ReviewFormContents';
import ReviewFormFooter from '@src/components/ReviewForm/ReviewFormFooter/ReviewFormFooter';
import ReviewFormHeader from '@src/components/ReviewForm/ReviewFormHeader/ReviewFormHeader';
import ReviewFormImage from '@src/components/ReviewForm/ReviewFormImage/ReviewFormImage';
import ReviewFormRate from '@src/components/ReviewForm/ReviewFormRate/ReviewFormRate';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';
import theme from '@src/theme/theme';
import { Review, ReviewEdit } from '@src/types/Review';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const CREATE_ERROR = '리뷰 생성에 실패했습니다.';
const UPDATE_ERROR = '리뷰 수정에 실패했습니다.';

const MAX_RATE = 5;
const MIN_IMAGE_OFFSET = 0;

interface Props {
  goodsId: number;
  thumbnail?: string;
  title: string;
  onClose: () => void;
  prevContents?: Review;
}

const ReviewForm: React.FC<Props> = ({ thumbnail, goodsId, title, onClose, prevContents }) => {
  const [prevImageOffset, setPrevImageOffset] = useState(
    prevContents ? prevContents.reviewImgs.length : MIN_IMAGE_OFFSET
  );
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [contents, setContents] = useState<string>(prevContents ? prevContents.contents : '');
  const [files, setFiles] = useState<File[]>([]); // 이미지 file 저장
  const [rate, setRate] = useState<number>(prevContents ? prevContents.rate : MAX_RATE);
  const [activeSubmit, setActiveSubmit] = useState<boolean>(false);
  const pushToast = usePushToast();

  const handleCreateReview = useCallback(async (formData: FormData) => {
    try {
      await ReviewAPI.createReview(formData);
    } catch (err) {
      console.error(err);
      pushToast({ text: CREATE_ERROR, color: theme.error });
    }
  }, []);

  const handleUpdateReview = useCallback(async (reviewId: number, formData: FormData) => {
    try {
      await ReviewAPI.updateReview(reviewId, formData);
    } catch (err) {
      console.error(err);
      pushToast({ text: UPDATE_ERROR, color: theme.error });
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    const formData = new FormData();
    files.forEach((file: File) => formData.append('files', file));
    formData.append('goodsId', String(goodsId));
    formData.append('rate', String(rate));
    formData.append('contents', contents);
    deletedImages.length > 0 && deletedImages.forEach((url) => formData.append('deletedImages', url));
    if (prevContents) {
      await handleUpdateReview(prevContents.id, formData);
    } else {
      await handleCreateReview(formData);
    }
    onClose();
  }, [files, rate, contents, deletedImages]);

  const handleChangeContents = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  }, []);

  const handleUpdateFiles = useCallback(
    (newFiles: File[]) => {
      setFiles((prev) => {
        return [...prev, ...newFiles];
      });
    },
    [setFiles]
  );

  const handleDeleteFile = useCallback(
    (i: number) => {
      const index = i - prevImageOffset;
      setFiles((prev) => prev.filter((f, i) => i !== index));
    },
    [setFiles, prevImageOffset]
  );

  const handleChangeRate = useCallback(
    (rate: number) => {
      setRate(rate);
    },
    [setRate]
  );

  const handlePrevImage = useCallback((url: string) => {
    setDeletedImages((prev) => [...prev, url]);
    setPrevImageOffset((prev) => prev - 1);
  }, []);

  useEffect(() => {
    if (prevContents && prevContents.reviewImgs.length + files.length === deletedImages.length) {
      setActiveSubmit(false);
    } else if ((prevContents || files.length > 0) && rate > 0 && contents.length > 0) {
      setActiveSubmit(true);
    } else if (activeSubmit) setActiveSubmit(false);
  }, [files, rate, contents, deletedImages]);

  return (
    <ReviewFormContainer>
      <ReviewFormHeader onClose={onClose} />
      <ReviewFormRate rate={rate} thumbnail={thumbnail} title={title} onHandleRate={handleChangeRate} />
      <ReviewFormImage
        onHandlePrevImage={handlePrevImage}
        onUpdateFiles={handleUpdateFiles}
        onDeleteFile={handleDeleteFile}
        prevImages={prevContents?.reviewImgs}
      />
      <ReviewFormContents contents={contents} onHandleContents={handleChangeContents} />
      <ReviewFormFooter
        activeSubmit={activeSubmit}
        onClose={onClose}
        onSubmit={handleSubmit}
        isEdit={prevContents ? true : false}
      />
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
