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

  return (
    <Wrapper size={size}>
      <img src={isSrc} onError={onErrorHandler} alt="유저프로필이미지" />
    </Wrapper>
  );
};

const Wrapper = styled.div<Pick<Props, 'size'>>`
  width: ${({ size }) => size || '40px'};
  height: ${({ size }) => size || '40px'};
  flex: none;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
export default ProfileImage;
