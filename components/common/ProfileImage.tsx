import styled from 'styled-components';

interface Props {
  src: string;
  size?: string;
}
const ProfileImage = ({ src, size }: Props) => {
  const onErrorHandler = (e: any) => {
    e.target.src = '/assets/img/icon/default_profile_56px.png';
  };
  const srcHandler = () => {
    if (!src) return '/assets/img/icon/default_profile_56px.png';
    return src;
  };

  return (
    <Wrapper size={size}>
      <img src={srcHandler()} onError={onErrorHandler} />
    </Wrapper>
  );
};

const Wrapper = styled.div<Pick<Props, 'size'>>`
  width: ${({ size }) => size ?? '56px'};
  height: ${({ size }) => size ?? '56px'};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
export default ProfileImage;
