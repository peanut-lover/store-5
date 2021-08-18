import { HeaderIconContainer, HeaderIconTitle } from '@src/components/Header/style';
import { MdDashboard } from 'react-icons/md';

import React from 'react';

const DashboardIcon = () => {
  return (
    <HeaderIconContainer>
      <MdDashboard size='2em' />
      <HeaderIconTitle>대시보드</HeaderIconTitle>
    </HeaderIconContainer>
  );
};

export default DashboardIcon;
