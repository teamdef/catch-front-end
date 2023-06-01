import styled from 'styled-components';

const QuizCard = () => {
  return (
    <Wrapper>
      <ImgWrapper>
        <img src="https://ynoblesse.com/wp-content/uploads/2021/06/199834299_526372721727354_5022350755607651344_n.jpg" />
      </ImgWrapper>
      <ContentWrapper>
        <div className="quiz-title">판다 덕후의 판다 퀴즈</div>
        <div className="row">
          <Profile>
            <div className="profile-img">
              <img
                src={
                  'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2513B53E55DB206927'
                }
              />
            </div>
            <div className="nickname">닉네임</div>
          </Profile>
          <QuizInfo>
            <div>5일 전</div>
            <div>참여 238</div>
          </QuizInfo>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 4px;
  border: solid 0.75px #b4a0ff;
  display: flex;
  letter-spacing: -5%;
`;

const ImgWrapper = styled.div`
  width: 120px;
  height: inherit;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }
`;

const ContentWrapper = styled.div`
  ${({ theme }) =>
    theme.mixin.flex({ direction: 'column', justify: 'space-between', align: 'start' })}; /* mixin 사용 */
  padding: 12px;
  flex: 1; /* 남은 공간을 채울 때 주로 사용*/
  .quiz-title {
    color: ${({ theme }) => theme.colors.blackColors.grey_800};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.body_2};
  }
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const Profile = styled.div`
  ${({ theme }) => theme.mixin.flex()}
  .nickname {
    color: ${({ theme }) => theme.colors.blackColors.grey_700};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.caption};
  }
  .profile-img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

const QuizInfo = styled.div`
  ${({ theme }) => theme.mixin.flex()}
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: 10.5px;
  display: flex;
  gap: 18px;
`;
export default QuizCard;
