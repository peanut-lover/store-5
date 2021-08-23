import { styled } from '@src/lib/CustomStyledComponent';
import { theme } from '@src/theme/theme';
import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CategoryBarChart = () => {
  const data = [
    {
      name: 'Cate A',
      조회수: 590,
    },
    {
      name: 'Cate B',
      조회수: 868,
    },
    {
      name: 'Cate C',
      조회수: 1397,
    },
    {
      name: 'Cate D',
      조회수: 1480,
    },
    {
      name: 'Cate E',
      조회수: 1520,
    },
    {
      name: 'Cate F',
      조회수: 1400,
    },
  ];
  return (
    <CategoryBarContainer>
      <BarChartTitle color={theme.greenColor}>카테고리 조회 수</BarChartTitle>
      <ResponsiveContainer width='100%' height='95%'>
        <ComposedChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          }}
        >
          <CartesianGrid stroke='#f5f5f5' />
          <XAxis dataKey='name' scale='band' fontSize='0.7em' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='조회수' barSize={20} fill='#413ea0' />
          <Line type='monotone' dataKey='조회수' stroke='#ff7300' />
        </ComposedChart>
      </ResponsiveContainer>
    </CategoryBarContainer>
  );
};

const CategoryBarContainer = styled('div')`
  padding: 16px;
  width: 50%;
  height: 100%;
  background-color: whitesmoke;
  border-radius: 16px;
  margin-right: 16px;
`;

const BarChartTitle = styled('div')<{ color: string }>`
  margin-bottom: 16px;
  color: ${(props) => props.color};
  font-weight: 700;
`;
export default CategoryBarChart;
