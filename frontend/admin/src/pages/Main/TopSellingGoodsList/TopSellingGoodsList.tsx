import { styled } from '@src/lib/CustomStyledComponent';
import TopSellingGoods from '@src/pages/Main/TopSellingGoodsList/TopSellingGoods/TopSellingGoods';
import { theme } from '@src/theme/theme';
import React from 'react';

const TopSellingGoodsList = () => {
  const mock = [
    {
      thumbnailUrl:
        'https://user-images.githubusercontent.com/20085849/128866958-900ad32a-cd32-4b97-be79-1dbbc9dcb02d.jpeg',
      title: 'dummy1',
      countOfSell: 1330,
    },
    {
      thumbnailUrl:
        'https://user-images.githubusercontent.com/20085849/128866958-900ad32a-cd32-4b97-be79-1dbbc9dcb02d.jpeg',
      title: 'dummy2',
      countOfSell: 25500,
    },
    {
      thumbnailUrl:
        'https://user-images.githubusercontent.com/20085849/128866958-900ad32a-cd32-4b97-be79-1dbbc9dcb02d.jpeg',
      title: 'dummy1',
      countOfSell: 33303300,
    },
  ];
  return (
    <TopSellingListContainer>
      <TopSellingTitle bgcolor={theme.greenColor}>Top Selling Goods</TopSellingTitle>
      {mock.map((item, i) => (
        <TopSellingGoods key={i} item={item} />
      ))}
    </TopSellingListContainer>
  );
};

const TopSellingListContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 16px;
`;

const TopSellingTitle = styled('span')<{ bgcolor: string }>`
  color: ${(props) => props.bgcolor};
  height: 1.5em;
  font-weight: 700;
  margin-bottom: 30px;
`;

export default TopSellingGoodsList;
