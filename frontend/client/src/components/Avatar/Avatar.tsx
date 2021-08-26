import React from 'react';
import styled from 'styled-components';
import EmptyAvatarImg from '@src/assets/empty-kim.gif';

interface AvatarProps {
  size?: 'big' | 'small';
  imgUrl?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ imgUrl, size }) => {
  return <Image size={size} src={imgUrl ?? EmptyAvatarImg} />;
};

const Image = styled.img<{ size?: 'big' | 'small' }>`
  object-fit: cover;
  width: ${(props) => (props.size === 'big' ? '8rem' : '2rem')};
  height: ${(props) => (props.size === 'big' ? '8rem' : '2rem')};
  border-radius: 50%;
`;

export default Avatar;
