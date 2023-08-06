import styled from 'styled-components';

const Account = () => {
  return (
    <Wrapper>
      <Button>로그아웃</Button>
      <Button>회원탈퇴</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: block;
  border-top: 2px solid ${({ theme }) => theme.colors.blackColors.grey_100};
`;
const Button = styled.button`
  padding: 14px 0;
  display: block;
  color: ${({ theme }) => theme.colors.blackColors.grey_800};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
export default Account;
