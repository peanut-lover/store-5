import Portal from '@src/portal/portal';
import React from 'react';
import styled from 'styled-components';

interface Props {}

const ToastPortalWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Portal>
      <Wrapper>{children}</Wrapper>
    </Portal>
  );
};

const Wrapper = styled.div`
  z-index: 999999999999;
  position: fixed;
`;

export default ToastPortalWrapper;
