import { usePushHistory } from '@src/lib/CustomRouter/CustomRouter';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { BsHeart, BsFillBucketFill, BsFillHeartFill } from 'react-icons/bs';
import { BestTag, GreenTag, NewTag, SaleTag } from '../Tag';
import { getPriceText } from '@src/utils/price';
import { deleteWish, postWish } from '@src/apis/wishAPI';
import theme from '@src/theme/theme';

export type GoodsItemSize = 'small' | 'middle' | 'big';

interface Props {
  id: number;
  thumbnailUrl?: string;
  title: string;
  price: number;
  isBest?: boolean;
  isGreen?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  isWish?: boolean;
  discountRate?: number;
  itemBoxSize?: GoodsItemSize;
  handleClickCart: (goodsId: number) => void;
}

const GoodsItem: React.FC<Props> = ({
  id,
  thumbnailUrl = '',
  title,
  price,
  isWish = false,
  isBest = false,
  isNew = false,
  isGreen = false,
  isSale = false,
  discountRate = 0,
  itemBoxSize = 'middle',
  handleClickCart,
}) => {
  const push = usePushHistory();
  const [isWished, setIsWished] = useState(isWish);
  const handleClickGoodsItem = (e: React.MouseEvent) => {
    push('/detail/' + id);
  };
  const [isHoverGoodsImage, setIsHoverGoodsImage] = useState<boolean>(false);

  const handleOnMouseEnter = useCallback((e) => {
    setIsHoverGoodsImage(true);
  }, []);

  const handleOnMouseLeave = useCallback((e) => {
    setIsHoverGoodsImage(false);
  }, []);

  const handleClickUtliButton = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handleClickCart && handleClickCart(id);
  }, []);

  const handleToWish = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        const result = isWished ? await deleteWish(id) : await postWish(id);
        if (result) setIsWished(!isWished);
      } catch (error) {
        console.log(error);
      }
    },
    [isWished]
  );
  return (
    <GoodsItemContainer onClick={handleClickGoodsItem} size={itemBoxSize}>
      <GoodsImageContainer onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} size={itemBoxSize}>
        <TagContainer>
          {isBest && <BestTag />}
          {isGreen && <GreenTag />}
          {isNew && <NewTag />}
          {isSale && <SaleTag />}
        </TagContainer>
        {thumbnailUrl ? <GoodsImage src={thumbnailUrl} /> : <GoodsEmptyImage />}

        {isHoverGoodsImage && <></>}
        <GoodsImageOverlay />
        <GoodsUtilBtnContainer>
          <GoodsUtilBtn onClick={handleToWish}>
            {isWished ? <BsFillHeartFill size={20} fill={theme.primary} /> : <BsHeart size={20} />}
          </GoodsUtilBtn>
          <GoodsUtilBtn onClick={handleClickUtliButton}>
            <BsFillBucketFill size={20} />
          </GoodsUtilBtn>
        </GoodsUtilBtnContainer>
      </GoodsImageContainer>

      {discountRate && discountRate > 0 ? <GoodsDiscountLabel> {discountRate} % </GoodsDiscountLabel> : ''}
      <GoodsTitle>{title}</GoodsTitle>
      <GoodsPriceLabel>{getPriceText(price)} 원</GoodsPriceLabel>
    </GoodsItemContainer>
  );
};

const ItemContainerWidthMap = {
  big: '300px',
  middle: '260px',
  small: '200px',
};

const ImageContainerHeightMap = {
  big: '350px',
  middle: '300px',
  small: '200px',
};

const TagContainer = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  left: 0;
  top: 0;
  margin: 0.5rem;
  width: 100%;
  pointer-events: none;
  z-index: 1;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

interface GoodsItemContainerProps {
  size: GoodsItemSize;
}

const GoodsItemContainer = styled.div<GoodsItemContainerProps>`
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: ${(props) => ItemContainerWidthMap[props.size]};
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

interface GoodsEmptyImageProps {
  theme: {
    label: string;
  };
}

const GoodsEmptyImage = styled.div<GoodsEmptyImageProps>`
  width: 100%;
  height: 350px;
  opacity: 0.8;
  background-color: ${(props) => props.theme.label};
  // TODO: add backgrond-img;
`;

interface GoodsImageContainerProps {
  size: GoodsItemSize;
}

const GoodsImageContainer = styled.div<GoodsImageContainerProps>`
  position: relative;
  width: 100%;
  height: ${(props) => ImageContainerHeightMap[props.size]};
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
`;

const GoodsImageOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  width: 100%;
  height: 350px;
  opacity: 0;

  ${GoodsImageContainer}:hover & {
    opacity: 1;
  }
  transition: opacity 300ms ease;
  background: linear-gradient(
    180deg,
    transparent 62%,
    rgba(0, 0, 0, 0.00345888) 63.94%,
    rgba(0, 0, 0, 0.014204) 65.89%,
    rgba(0, 0, 0, 0.0326639) 67.83%,
    rgba(0, 0, 0, 0.0589645) 69.78%,
    rgba(0, 0, 0, 0.0927099) 71.72%,
    rgba(0, 0, 0, 0.132754) 73.67%,
    rgba(0, 0, 0, 0.177076) 75.61%,
    rgba(0, 0, 0, 0.222924) 77.56%,
    rgba(0, 0, 0, 0.267246) 79.5%,
    rgba(0, 0, 0, 0.30729) 81.44%,
    rgba(0, 0, 0, 0.341035) 83.39%,
    rgba(0, 0, 0, 0.367336) 85.33%,
    rgba(0, 0, 0, 0.385796) 87.28%,
    rgba(0, 0, 0, 0.396541) 89.22%,
    rgba(0, 0, 0, 0.4) 91.17%
  );
`;

const GoodsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  filter: blur(1px);
  -webkit-filter: blur(1px);

  ${GoodsImageContainer}:hover & {
    opacity: 1;
    transform: scale(1.1);
    filter: blur(0px);
    -webkit-filter: blur(0px);
    animation-name: imgZoomEffect;
    animation-duration: 0.2s;
  }

  @keyframes imgZoomEffect {
    from {
      filter: blur(0.5px);
      -webkit-filter: blur(0.5px);
      transform: scale(1);
    }

    to {
      filter: blur(0px);
      -webkit-filter: blur(0px);
      transform: scale(1.1);
    }
  }
`;

const GoodsUtilBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -50px;
  left: 50%;
  height: 50px;
  transform: translate(-50%, 0px);
  transition: transform 0.5s;

  ${GoodsImageContainer}:hover & {
    transform: translate(-50%, -50px);
  }
`;

const GoodsUtilBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: white;
  margin-right: 5px;
  cursor: pointer;
`;

const GoodsTitle = styled.strong`
  margin-top: 10px;
  font-size: 16px;
`;

const GoodsPriceLabel = styled.span`
  margin-top: 5px;
  font-size: 16px;
`;

const GoodsDiscountLabel = styled.span`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 800;
  color: red; // TODO: change color as theme
`;

export default GoodsItem;
