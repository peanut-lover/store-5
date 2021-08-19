import { styled } from '@src/lib/CustomStyledComponent';
import { theme } from '@src/theme/theme';
import { Promotion } from '@src/types/Promotion';
import React from 'react';

interface Props {
  promotion: Promotion;
}

const PromotionItem: React.FC<Props> = ({ promotion }) => {
  return (
    <PromotionContainer>
      <PromotionImage src={promotion.imgUrl} />
      <PromotionDeleteButton bgcolor={theme.greenColor}>X</PromotionDeleteButton>
    </PromotionContainer>
  );
};

const PromotionContainer = styled('div')`
  position: relative;
  padding: 25px;
  width: 50%;
`;

const PromotionImage = styled('img')`
  width: 100%;
  height: 60%;
`;

const PromotionDeleteButton = styled('button')<{ bgcolor: string }>`
  position: absolute;
  top: -0.5em;
  right: -0.5em;
  font-size: 1.8em;
  border-radius: 50%;
  background-color: ${(props) => props.bgcolor};
  color: white;
  border: none;
  cursor: pointer;
`;

export default PromotionItem;
