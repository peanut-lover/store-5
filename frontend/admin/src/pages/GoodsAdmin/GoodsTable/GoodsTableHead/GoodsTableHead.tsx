import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { styled } from '@src/lib/CustomStyledComponent';

const GoodsTableHead = () => {
  const handleSortGoods = () => {
    // TODO: 정렬 관련 처리
  };
  return (
    // TODO: 컴포넌트화
    <GoodsTableHeadContainer>
      <TableRow>
        <TableHeadData>상품 ID</TableHeadData>
        <TableHeadData>썸네일</TableHeadData>
        <TableHeadData>
          <SortButton onClick={handleSortGoods}>
            <ButtonText>상품명</ButtonText>
            <FaAngleDown />
          </SortButton>
        </TableHeadData>
        <TableHeadData>
          <SortButton onClick={handleSortGoods}>
            <ButtonText>가격</ButtonText>
            <FaAngleDown />
          </SortButton>
        </TableHeadData>
        <TableHeadData>
          <SortButton onClick={handleSortGoods}>
            <ButtonText>할인율</ButtonText>
            <FaAngleDown />
          </SortButton>
        </TableHeadData>
        <TableHeadData>
          <SortButton onClick={handleSortGoods}>
            <ButtonText>재고</ButtonText>
            <FaAngleDown />
          </SortButton>
        </TableHeadData>
        <TableHeadData>
          <SortButton onClick={handleSortGoods}>
            <ButtonText>판매량</ButtonText>
            <FaAngleDown />
          </SortButton>
        </TableHeadData>
        <TableHeadData>
          <SortButton onClick={handleSortGoods}>
            <ButtonText>상품 등록일</ButtonText>
            <FaAngleDown />
          </SortButton>
        </TableHeadData>
        <TableHeadData>
          <SortButton onClick={handleSortGoods}>
            <ButtonText>최종 수정일</ButtonText>
            <FaAngleDown />
          </SortButton>
        </TableHeadData>
        <TableHeadData>상태</TableHeadData>
        <TableHeadData>카테고리</TableHeadData>
      </TableRow>
    </GoodsTableHeadContainer>
  );
};

const GoodsTableHeadContainer = styled('thead')`
  font-weight: 600;
  font-size: 14px;
  height: 40px;
`;

const TableRow = styled('tr')``;

const TableHeadData = styled('th')`
  padding: 4px;
  vertical-align: middle;
`;

const SortButton = styled('button')`
  border: 0;
  font-size: 14px;
  font-weight: 600;
  padding: 0.25rem;
  background-color: transparent;
  cursor: pointer;
`;

const ButtonText = styled('span')`
  display: inline-block;
  margin-right: 0.25rem;
`;

export default GoodsTableHead;
