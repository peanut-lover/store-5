import Portal from '@src/portal/portal';
import React from 'react';
import styled from 'styled-components';

interface Props {}

const ToastProtalWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Portal>
      <Wrapper>{children}</Wrapper>
    </Portal>
  );
};

const Wrapper = styled.div`
  z-index: 9999999;
`;

export default ToastProtalWrapper;
