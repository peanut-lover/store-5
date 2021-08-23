import { styled } from '@src/lib/CustomStyledComponent';
import { theme } from '@src/theme/theme';
import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const CategoryPieChart = () => {
  const mock = [
    { name: '잡화', value: 400 },
    { name: '문구', value: 300 },
    { name: '생필품', value: 125 },
    { name: '에디션', value: 135 },
  ];
  const COLORS = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
  ];
  return (
    <PieChartContainer>
      <PieChartTitle color={theme.greenColor}>카테고리 비율</PieChartTitle>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={mock}
            cx='50%'
            cy='50%'
            isAnimationActive={true}
            animationDuration={600}
            labelLine={false}
            label={(entry) => entry.name}
            outerRadius={120}
            innerRadius={60}
            dataKey='value'
            cursor='pointer'
          >
            {mock.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </PieChartContainer>
  );
};

const PieChartContainer = styled('div')`
  padding: 16px;
  width: 50%;
  height: 100%;
  background-color: whitesmoke;
  border-radius: 16px;
  margin-right: 16px;
`;

const PieChartTitle = styled('span')<{ color: string }>`
  position: absolute;
  color: ${(props) => props.color};
  font-weight: 700;
`;

export default CategoryPieChart;
