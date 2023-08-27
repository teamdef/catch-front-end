import { SyntheticEvent } from 'react';
import styled from 'styled-components';

interface Props {
  src?: string;
  size?: string;
}
const ProfileImage = ({ src, size }: Props) => {
  const DEFAULT_IMG = '/assets/img/rebranding/icon/default_profile.svg';
  const isSrc = src || DEFAULT_IMG;

  const onErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DEFAULT_IMG;
  };

  return <ProfileImageBox size={size} src={isSrc} onError={onErrorHandler} alt="유저프로필이미지" />;
};

const ProfileImageBox = styled.img<Pick<Props, 'size'>>`
  width: ${({ size }) => size || '40px'};
  height: ${({ size }) => size || '40px'};
  object-fit: cover;
  border-radius: 50%;
`;
export default ProfileImage;
