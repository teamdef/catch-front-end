import { useRouter } from 'next/router';
import styled from 'styled-components';

const LoginText = () => {
  const router = useRouter();

  const goLogin = () => {
    router.push('/member/login');
  };

  return (
    <MainText>
      퀴즈를 만들고 싶다면 <br />
      <Button onClick={goLogin}>로그인</Button>해주세요!
    </MainText>
  );
};
export const MainText = styled.p`
  line-height: 160%;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-size: ${({ theme }) => theme.fontSize.body_1};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  b {
    color: ${({ theme }) => theme.colors.secondary_500};
  }
`;
const Button = styled.button`
  display: inline-block;
  color: ${({ theme }) => theme.colors.secondary_300};
  font-size: ${({ theme }) => theme.fontSize.body_1};
  font-weight: ${({ theme }) => theme.fontWeight.extra_bold};
`;
export default LoginText;
