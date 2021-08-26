import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';

const Dim: React.FC<{ onClick?: () => void }> = ({ onClick, children }) => {
  const dimRef = useRef(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      if (event.target === dimRef.current) onClick?.();
    },
    [onClick]
  );

  return (
    <Wrapper ref={dimRef} onMouseDown={handleClick}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #00000080;
`;

export default Dim;
