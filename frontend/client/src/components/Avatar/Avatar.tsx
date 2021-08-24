import React from 'react';
import styled from 'styled-components';
import EmptyAvatarImg from '@src/assets/empty-kim.gif';

interface AvatarProps {
  imgUrl?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ imgUrl }) => {
  return <Image src={imgUrl ?? EmptyAvatarImg} />;
};

const Image = styled.img`
  object-fit: cover;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

export default Avatar;
