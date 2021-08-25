import React from 'react';
import styled from 'styled-components';
import { FaPencilAlt } from '@react-icons/all-files/fa/FaPencilAlt';
import AwesomeButton from '../../AwesomeButton/AwesomeButton';
import useUserState from '@src/hooks/useUserState';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';
import theme from '@src/theme/theme';

interface Props {
  lengthOfReviews: number;
  onOpenReviewForm: () => void;
}

const ReviewContainerHeader: React.FC<Props> = ({ lengthOfReviews, onOpenReviewForm }) => {
  const [user] = useUserState();
  const pushToast = usePushToast();

  const pushAlertToast = () => {
    pushToast({ text: '로그인 후 작성 가능합니다!', color: theme.error });
  };

  return (
    <Wrapper>
      <Title>리뷰{lengthOfReviews > 0 && ` (${lengthOfReviews})`}</Title>
      <AwesomeButton onClick={user.isLoggedIn ? onOpenReviewForm : pushAlertToast}>
        <ButtonInner>
          <FaPencilAlt />
          리뷰 작성하기
          <FaPencilAlt />
        </ButtonInner>
      </AwesomeButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bolder;
`;

const ButtonInner = styled.div`
  display: flex;
  gap: 1rem;
`;

export default ReviewContainerHeader;
