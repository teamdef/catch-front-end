import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

interface MyQuizProps {
  myQuiz: MyQuizType;
}
const MyQuizCard = ({ myQuiz }: MyQuizProps) => {
  const router = useRouter();
  return (
    <Wrapper url={myQuiz.thumbnail}>
      <div id="quiz-title">{myQuiz.set_title}</div>
      <div id="quiz-info">
        참여 {myQuiz.solver_cnt} · 평균점수 {myQuiz.average}점
      </div>
      <div id="quiz-detail-btn-wrapper">
        <button
          id="quiz-detail-btn"
          onClick={() => {
            router.push(`/quiz/${myQuiz.id}/detail`);
          }}
        >
          자세히 보기
        </button>
      </div>
    </Wrapper>
  );
};
const CustomCard = styled.div`
  height: 250px; /* 카드 높이 250px 고정 */
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
  display: flex;
  position: relative;
  border: solid 1px #eee;
  padding: 1rem;
`;

const Wrapper = styled(CustomCard)<{ url: string | null }>`
  ${(props) =>
    props.url
      ? css`
          background: linear-gradient(
              to bottom,
              rgba(20, 20, 20, 0) 10%,
              rgba(20, 20, 20, 0.1) 25%,
              rgba(20, 20, 20, 0.25) 50%,
              rgba(20, 20, 20, 0.5) 75%,
              rgba(20, 20, 20, 0.75) 100%
            ),
            url(${props.url});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        `
      : css`
          background: url('/assets/img/catch_character4.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        `}

  flex-direction: column;
  justify-content: flex-end;
  color: ${(props) => (props.url ? '#fff' : '#595959')};
  padding: 1.5rem;
  #quiz-title {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 8px;
  }
  #quiz-info {
  }
  #quiz-detail-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    button {
      border-radius: 30px;
      border: none;
      padding: 0.5rem 1rem 0.5rem 1rem;
      color: #595959;
      color: ${(props) => (props.url ? '#595959' : '#fff')};
      background-color: ${(props) => (props.url ? 'none' : '#ff4d57')};
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
export default MyQuizCard;
