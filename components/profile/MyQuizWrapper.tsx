import styled from 'styled-components';

const MyQuizNav = () => {
  return (
    <Wrapper>
      <Title>내가 만든 퀴즈</Title>
      <ButtonBox>
        <AnyQuizBtn>모두의 퀴즈</AnyQuizBtn>
        <CatchMeBtn>캐치미 퀴즈</CatchMeBtn>
      </ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 27px;
  margin-bottom: 56px;
`;
const Title = styled.h2`
  padding: 20px 0;
  color: ${({ theme }) => theme.colors.secondary_300};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  button {
    display: flex;
    align-items: center;
    width: 80%;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.blackColors.grey_800};
    padding: 12px 0;
    &::before {
      content: '';
      position: relative;
      display: block;
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
`;
const AnyQuizBtn = styled.button`
  &::before {
    background-image: url(/assets/img/rebranding/icon/anyquiz_icon.svg);
  }
`;
const CatchMeBtn = styled.button`
  &::before {
    background-image: url(/assets/img/rebranding/icon/catchme_icon.svg);
  }
`;
export default MyQuizNav;
