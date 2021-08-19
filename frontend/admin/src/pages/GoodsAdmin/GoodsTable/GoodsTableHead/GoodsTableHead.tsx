import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';

const GoodsTableHead = () => {
  return (
    <GoodsTableHeadContainer>
      <TableRow>
        <TableHeadData>썸네일</TableHeadData>
        <TableHeadData>상품명</TableHeadData>
        <TableHeadData>가격</TableHeadData>
        <TableHeadData>할인율</TableHeadData>
        <TableHeadData>재고</TableHeadData>
        <TableHeadData>판매량</TableHeadData>
        <TableHeadData>등록일</TableHeadData>
        <TableHeadData>최종 수정일</TableHeadData>
        <TableHeadData>상태</TableHeadData>
        <TableHeadData>카테고리</TableHeadData>
      </TableRow>
    </GoodsTableHeadContainer>
  );
};

const GoodsTableHeadContainer = styled('thead')``;

const TableRow = styled('tr')``;

const TableHeadData = styled('th')``;

export default GoodsTableHead;
