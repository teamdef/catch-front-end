import styled from 'styled-components';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { Button } from 'components/common';
const match = ({ setOpenMatch }: any) => {
  const { solveAnswers } = useSelector((state: RootState) => state.solve);
  console.log(solveAnswers);
  return (
    <MatchEl>
      <h1>오답노트</h1>
      {solveAnswers.map((item: any, index: number) => {
        if (item != undefined) {
          console.log(item.title);
          return (
            <MatchCard key={index}>
              <h2>{index+1}. {item.title}</h2>
              <div>
                <span>내가 고른 답 : <b style={{color:'red'}}>{item.user_answer}</b></span>
                <span>정답 : <b style={{color:'#68BD05'}}>{item.correct_answer}</b></span>
              </div>
            </MatchCard>
          );
        }
      })}
      <Button width="30%" height="50px" bgColor="#ff4d57" fontColor="#fff" onClick={() => setOpenMatch(false)}>
        닫기
      </Button>
    </MatchEl>
  );
};

const MatchEl = styled.div`
  position: absolute;
  top: 0;
  display: block;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  h1 {
    padding: 5%;
    font-size: 1.5rem;
    background-color: #ff4d57;
    color: #fff;
    margin: 0;
    border-radius: 0 0 20px 20px;
    text-align: center;
  }
  button {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
  }
`;
const MatchCard = styled.div`
  position:relative;
  display:flex;
  margin: 10% 0;
  flex-direction: column;
  align-items: center;
  > div {
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    span {

    }
  }
`;

export default match;
