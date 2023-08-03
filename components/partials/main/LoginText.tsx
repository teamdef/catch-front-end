import { useRouter } from 'next/router';
import styled from 'styled-components';

const LoginText = () => {
  const router = useRouter();

  const goLogin = () => {
    router.push('/member/login');
  };

  return (
    <Text>
      퀴즈를 만들고 싶다면 <br />
      <Button onClick={goLogin}>로그인</Button>해주세요!
    </Text>
  );
};
const Text = styled.p`
  line-height: 160%;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-size: ${({ theme }) => theme.fontSize.body_1};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const Button = styled.button`
  display: inline-block;
  padding: 0;
  color: ${({ theme }) => theme.colors.secondary_300};
  font-size: ${({ theme }) => theme.fontSize.body_1};
  font-weight: ${({ theme }) => theme.fontWeight.extra_bold};
`;
export default LoginText;
