import styled from 'styled-components';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { MainButton } from 'styles/common';
const MatchNote = ({ setOpenMatch }: any) => {
  const { solveAnswers } = useSelector((state: RootState) => state.solve);
  return (
    <MatchEl>
      {solveAnswers.map((item: any, index: number) => {
        if (item != undefined) {
          return (
            <MatchCard key={index}>
              <h2>
                {index + 1} <span style={{ fontWeight: 'normal' }}>"{item.title}"</span>
              </h2>
              {item.correct_answer.includes('catchmeimages') ? (
                <MatchImg>
                  <div>
                    <span style={{ color: 'red' }}>내가 고른 답</span>
                    <img src={item.user_answer} />
                  </div>
                  <div>
                    <span style={{ color: '#68BD05' }}>정답</span>
                    <img src={item.correct_answer} />
                  </div>
                </MatchImg>
              ) : (
                <MatchTxt>
                  <span>
                    내가 고른 답 : <b style={{ color: 'red' }}>{item.user_answer}</b>
                  </span>
                  <span>
                    정답 : <b style={{ color: '#68BD05' }}>{item.correct_answer}</b>
                  </span>
                </MatchTxt>
              )}
            </MatchCard>
          );
        }
      })}
      <MainButton onClick={() => setOpenMatch(false)}>닫기</MainButton>
    </MatchEl>
  );
};

const MatchEl = styled.div`
  position: absolute;
  top: 0;
  display: block;
  width: 100%;
  min-height: 100vh;
  background-color: #fff6f7;
  button {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
  }
`;
const MatchCard = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 20%;
  flex-direction: column;
  align-items: center;
  > div {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  h2 {
    color: #fff;
    width: 100%;
    padding: 5px;
    margin: 0;
    font-size: 1.3rem;
    text-align: center;
    background-color: #ff4d57;
  }
`;

const MatchImg = styled.div`
  align-items: start;
  div {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-items: top;
    align-items: center;
  }
  align-items: flex-start;
  img {
    display: block;
    width: 50%;
  }
`;
const MatchTxt = styled.div`
  flex-direction: column;
  align-items: center;
`;
export default MatchNote;
