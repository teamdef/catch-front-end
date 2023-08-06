import styled from 'styled-components';

const Account = () => {
  return (
    <Wrapper>
      <LogOutBtn>로그아웃</LogOutBtn>
      <LeaveServiceBtn>회원탈퇴</LeaveServiceBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const LogOutBtn = styled.button``;
const LeaveServiceBtn = styled.button``;
export default Account;
